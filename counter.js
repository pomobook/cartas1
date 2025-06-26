/*
 * This file handles the visitor counter logic using counterapi.dev.
 */

/* @tweakable Configuration for the global visitor counter.
 * `namespace` and `key` create a unique URL for your counter.
 * Change these if you want to reset the counter or use it on another project.
 */
const counterConfig = {
    enabled: true,
    namespace: "un-mensaje-para-mi-amor",
    key: "page-visits"
};

// DOM elements for the counter
const visitorCounterElement = document.getElementById('visitor-counter');
const counterValueElement = document.getElementById('counter-value');

/**
 * Fetches the visitor count from the API, updates the UI, and returns the count.
 * @returns {Promise<number>} The total number of visits.
 */
async function updateVisitorCount() {
    if (!counterConfig.enabled || !visitorCounterElement || !counterValueElement) {
        if (visitorCounterElement) visitorCounterElement.classList.add('hidden');
        return 0;
    }

    const { namespace, key } = counterConfig;
    const apiUrl = `https://api.counterapi.dev/v1/${namespace}/${key}/up`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Counter API response not OK: ${response.status}`);
        }
        const data = await response.json();
        const totalVisits = data.count;
        counterValueElement.textContent = totalVisits.toLocaleString('es-ES');
        visitorCounterElement.classList.remove('hidden');
        return totalVisits;
    } catch (error) {
        console.error("Failed to update visitor count:", error);
        // Hide the counter if there's an error to not show a broken feature
        visitorCounterElement.classList.add('hidden');
        return 0; // Return 0 if the fetch fails
    }
}

/**
 * Initializes the visitor counter.
 * @returns {Promise<number>} A promise that resolves with the total number of visits.
 */
export function initCounter() {
    return updateVisitorCount();
}
