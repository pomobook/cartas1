/*
 * This file handles the password protection for the page.
 */

/*
 * @tweakable The password to access the page.
 */
const pagePassword = "siemprejuntos";

let CORRECT_PASSWORD_HASH = '';

// DOM Elements for authentication
const passwordOverlay = document.getElementById('password-overlay');
const passwordForm = document.getElementById('password-form');
const passwordInput = document.getElementById('password-input');
const togglePasswordButton = document.getElementById('toggle-password');
const errorMessage = document.getElementById('error-message');
const container = document.querySelector('.container');

// Function to hash a string using SHA-256 for secure password checking
async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Function to handle the login attempt
async function handleLogin(e, onSuccess) {
    e.preventDefault();
    const enteredPassword = passwordInput.value;
    
    // Ensure the correct hash has been generated before checking
    if (!CORRECT_PASSWORD_HASH) {
        console.error("Password hash not ready yet.");
        return;
    }

    const enteredPasswordHash = await hashString(enteredPassword);

    if (enteredPasswordHash === CORRECT_PASSWORD_HASH) {
        // Correct password: hide overlay and run the success callback
        passwordOverlay.style.opacity = '0';
        setTimeout(() => {
            passwordOverlay.classList.add('hidden');
            container.classList.remove('hidden');
            document.body.style.overflow = 'auto';
            onSuccess(); // Run the callback to initialize the main app
        }, 500);
    } else {
        // Incorrect password: show error feedback
        passwordInput.classList.add('error');
        errorMessage.classList.remove('hidden');
        setTimeout(() => {
            passwordInput.classList.remove('error');
        }, 500);
        passwordInput.value = '';
    }
}

// Function to toggle password visibility
function togglePasswordVisibility() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePasswordButton.textContent = type === 'password' ? '👁️' : '🙈';
}

/**
 * Initializes the authentication flow.
 * @param {() => void} onSuccess - A callback function to run after successful authentication.
 */
export function initAuth(onSuccess) {
    // Hash the correct password on load
    hashString(pagePassword).then(hash => {
        CORRECT_PASSWORD_HASH = hash;
    });

    // Set up event listeners
    passwordForm.addEventListener('submit', (e) => handleLogin(e, onSuccess));
    togglePasswordButton.addEventListener('click', togglePasswordVisibility);
}
