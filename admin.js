/*
 * This file contains all logic for the admin panel,
 * including PIN protection and displaying visitor statistics.
 */

/* @tweakable The PIN to access the admin panel */
const adminPin = "1163";

/* @tweakable Configuration for the real-time visitor data storage using kvdb.io.
 * `bucketId` should be a unique ID for your project.
 * Change this to start with a fresh data set.
 * You can create a new bucket at https://kvdb.io/
 */
const datastoreConfig = {
    enabled: true,
    bucketId: "r8tL9zP5qK3fG1jH4sE2dW" // A randomly generated unique ID for this project
};

// DOM Elements for the Admin Panel - to be initialized once the DOM is ready.
let adminOverlay, adminTrigger, adminPinSection, adminDataSection,
    adminPinForm, adminPinInput, adminErrorMessage, adminCloseButton,
    adminCancelButton, visitorList, statsCount;

let totalVisits = 0;
let isLoggingVisitor = false; // Flag to prevent duplicate logging

// Initializes all DOM element variables.
function initAdminDOMElements() {
    adminOverlay = document.getElementById('admin-overlay');
    adminTrigger = document.getElementById('admin-panel-trigger');
    adminPinSection = document.getElementById('admin-pin-section');
    adminDataSection = document.getElementById('admin-data-section');
    adminPinForm = document.getElementById('admin-pin-form');
    adminPinInput = document.getElementById('admin-pin-input');
    adminErrorMessage = document.getElementById('admin-error-message');
    adminCloseButton = document.getElementById('admin-close-button');
    adminCancelButton = document.getElementById('admin-cancel-button');
    visitorList = document.getElementById('visitor-list');
    statsCount = document.getElementById('stats-count');
}

/**
 * Parses the User Agent string to get a simplified device type.
 * @returns {string} The simplified device type.
 */
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "Tablet";
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "Mobile";
    }
    if (/(Macintosh|MacIntel|MacPPC|Mac_PowerPC)/.test(ua)) {
        return "Mac";
    }
    if (/(Windows|Win32|Win64|WOW64)/.test(ua)) {
        return "PC (Windows)";
    }
    if (/(Linux)/.test(ua)) {
        return "PC (Linux)";
    }
    return "Unknown";
}

/**
 * Logs a new visitor's information to the data store.
 */
export async function logVisitor() {
    if (!datastoreConfig.enabled || isLoggingVisitor) return;
    isLoggingVisitor = true;

    try {
        // 1. Get visitor location from their IP
        const geoResponse = await fetch('https://ip-api.com/json/?fields=status,message,country,city');
        if (!geoResponse.ok) throw new Error('Failed to fetch geolocation');
        const geoData = await geoResponse.json();

        if (geoData.status !== 'success') {
            console.warn('Geolocation failed:', geoData.message);
            // Fallback data if geo-lookup fails
            geoData.city = "Unknown";
            geoData.country = "Location";
        }

        // 2. Get device type
        const device = getDeviceType();

        // 3. Get all existing visitor records
        const storeUrl = `https://kvdb.io/${datastoreConfig.bucketId}/visitors`;
        let allVisits = [];
        try {
            const getResponse = await fetch(storeUrl);
            if (getResponse.ok) {
                allVisits = await getResponse.json();
                if (!Array.isArray(allVisits)) allVisits = []; // Ensure it's an array
            }
        } catch (e) {
            console.warn("Could not retrieve existing visitor data. Starting fresh.", e);
        }

        // 4. Add the new visitor record
        const newVisitor = {
            city: geoData.city,
            country: geoData.country,
            device: device,
            timestamp: new Date().toISOString()
        };
        allVisits.push(newVisitor);

        // 5. Save the updated list back to the store
        await fetch(storeUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(allVisits)
        });

    } catch (error) {
        console.error("Error logging visitor:", error);
    } finally {
        isLoggingVisitor = false;
    }
}

// Fetches and aggregates real visitor data from the data store.
async function getAggregatedVisitorData() {
    if (!datastoreConfig.enabled) {
        return {};
    }
    const storeUrl = `https://kvdb.io/${datastoreConfig.bucketId}/visitors`;
    try {
        const response = await fetch(storeUrl);
        if (!response.ok) {
            return {};
        }
        const visits = await response.json();
        if (!Array.isArray(visits)) return {};

        // Aggregate data: { "City, Country": { count: X, devices: { "Device1": Y, ... } } }
        return visits.reduce((acc, visit) => {
            const locationKey = `${visit.city || 'N/A'}, ${visit.country || 'N/A'}`;
            if (!acc[locationKey]) {
                acc[locationKey] = { total: 0, devices: {} };
            }
            acc[locationKey].total++;
            acc[locationKey].devices[visit.device] = (acc[locationKey].devices[visit.device] || 0) + 1;
            return acc;
        }, {});

    } catch (error) {
        console.error("Failed to fetch visitor data:", error);
        return {};
    }
}

// Populates the admin panel with the simulated visitor data
async function displayVisitorData() {
    visitorList.innerHTML = '<div class="visitor-item">Cargando datos de visitas...</div>';
    statsCount.textContent = totalVisits;

    const aggregatedData = await getAggregatedVisitorData();
    const locations = Object.keys(aggregatedData);

    visitorList.innerHTML = ''; // Clear loading message

    if (locations.length === 0) {
        visitorList.innerHTML = `<div class="visitor-item">No hay datos de visitas reales todavía.</div>`;
        return;
    }

    // Sort locations by visit count, descending
    locations.sort((a, b) => aggregatedData[b].total - aggregatedData[a].total);

    locations.forEach(locationKey => {
        const data = aggregatedData[locationKey];
        const item = document.createElement('div');
        item.className = 'visitor-group';

        const devicesHtml = Object.entries(data.devices)
            .sort(([, countA], [, countB]) => countB - countA) // Sort devices by count
            .map(([device, count]) => `<div class="device-entry">
                <span class="device-name">${device}</span>
                <span class="device-count">${count}</span>
            </div>`)
            .join('');

        item.innerHTML = `
            <div class="location-summary">
                <span class="location">${locationKey}</span>
                <span class="location-count">${data.total} ${data.total > 1 ? 'visitas' : 'visita'}</span>
            </div>
            <div class="device-details">${devicesHtml}</div>
        `;
        visitorList.appendChild(item);
    });
}

// Handles the PIN submission
async function handlePinSubmit(e) {
    e.preventDefault();
    if (adminPinInput.value === adminPin) {
        adminPinSection.classList.add('hidden');
        adminDataSection.classList.remove('hidden');
        // Generate and display data right when the PIN is confirmed
        await displayVisitorData();
    } else {
        adminErrorMessage.classList.remove('hidden');
        adminPinInput.value = '';
        setTimeout(() => adminErrorMessage.classList.add('hidden'), 2000);
    }
}

function openAdminPanel() {
    if (!adminOverlay || !adminPinInput) return;
    adminOverlay.classList.remove('hidden');
    adminOverlay.style.display = 'flex';
    adminPinInput.focus();
}

function closeAdminPanel() {
    if (!adminOverlay || !adminPinSection || !adminDataSection || !adminPinInput || !adminErrorMessage) return;
    adminOverlay.classList.add('hidden');
    // Reset state after a short delay to allow for fade-out animation
    setTimeout(() => {
        adminPinSection.classList.remove('hidden');
        adminDataSection.classList.add('hidden');
        adminPinInput.value = '';
        adminErrorMessage.classList.add('hidden');
    }, 300); // Should match CSS transition duration
}

/**
 * Updates the total visit count used by the admin panel.
 * @param {number} newCount - The new total number of visits.
 */
export function updateAdminVisitCount(newCount) {
    totalVisits = newCount;
}

/**
 * Initializes the admin panel functionality.
 * @param {number} visits - The initial number of page visits.
 */
export function initAdmin(visits) {
    // Ensure this runs after the DOM is fully loaded.
    initAdminDOMElements();

    // Check if critical elements exist before adding listeners.
    if (!adminTrigger || !adminPinForm || !adminCancelButton || !adminCloseButton || !adminOverlay) {
        console.error("Admin panel DOM elements could not be found. Aborting admin initialization.");
        return;
    }

    totalVisits = visits;

    adminTrigger.addEventListener('click', openAdminPanel);
    adminPinForm.addEventListener('submit', handlePinSubmit);
    
    // Listeners for closing the panel
    adminCancelButton.addEventListener('click', closeAdminPanel);
    adminCloseButton.addEventListener('click', closeAdminPanel);
    adminOverlay.addEventListener('click', (e) => {
        if (e.target === adminOverlay) {
            closeAdminPanel();
        }
    });
}
