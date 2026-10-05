import { loadPuzzles, filterPuzzles } from './puzzle-handler.js';

// 1. Mobile Menu Drawer Toggle Logic
function setupMobileMenu() {
    const menuButton = document.getElementById('menu-button');
    const overlay = document.querySelector('.mobile-nav-overlay');

    if (menuButton && overlay) {
        menuButton.addEventListener('click', () => {
            overlay.classList.toggle('open');
            // ⚡ UPDATED: Changed from 'active' to 'open' to match your class rules
            menuButton.classList.toggle('open');
        });

        // ⚡ NEW: Automatically closes the slide-out menu panel once a link is tapped
        overlay.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                menuButton.classList.remove('open');
                overlay.classList.remove('open');
            });
        });
    }
}

// 2. Dynamic Footer Year Updater
function setupFooterYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// 3. Central Application Initialization Loop
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupFooterYear();

    // Mount global wrapper function for inline filter element `onchange` handlers
    window.filterPuzzles = filterPuzzles;

    // Fire off async network request for data tracking
    loadPuzzles();
});