import { initAuth } from './auth.js';
import { initCounter } from './counter.js';
import { initAdmin, updateAdminVisitCount, logVisitor } from './admin.js';
import { initCards } from './cards.js';

/*
 * @tweakable When to log visitor data.
 * 'onPageLoad': Logs the visit as soon as the page loads. The admin panel will show data sooner.
 * 'onLogin': Logs the visit only after a correct password is entered. This is more secure but may show "no data" initially.
 */
const visitorLogEvent = 'onPageLoad';


document.addEventListener('DOMContentLoaded', async () => {
    // Initialize the admin panel immediately so the trigger is active on the password screen.
    initAdmin(0); // Initialize with 0 visits.

    // Initialize the visitor counter and update the UI and admin panel with the real count.
    const totalVisits = await initCounter();
    updateAdminVisitCount(totalVisits);

    if (visitorLogEvent === 'onPageLoad') {
        // Log the visitor as soon as the page loads.
        logVisitor();
    }
    
    // This function will be called upon successful authentication
    const initializeApp = () => {
        // If logging is set to onLogin, log the new visit after successful login
        if (visitorLogEvent === 'onLogin') {
            logVisitor();
        }
        initCards();
    };

    // Initialize the authentication module, passing the app initializer as a callback
    initAuth(initializeApp);
});
