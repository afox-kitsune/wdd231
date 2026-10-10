import { loadPuzzles, filterPuzzles } from './puzzle-handler.js';

function setupMobileMenu() {
    const menuButton = document.getElementById('menu-button');
    const overlay = document.querySelector('.mobile-nav-overlay');

    if (menuButton && overlay) {
        menuButton.addEventListener('click', () => {
            overlay.classList.toggle('open');
            menuButton.classList.toggle('open');
        });

        overlay.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                menuButton.classList.remove('open');
                overlay.classList.remove('open');
            });
        });
    }
}

function setupFooterYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

function setupFilterListeners() {
    const shapeFilter = document.getElementById('shapeFilter');
    const countFilter = document.getElementById('countFilter');
    const typeFilter = document.getElementById('typeFilter');


    if (shapeFilter) shapeFilter.addEventListener('change', filterPuzzles);
    if (countFilter) countFilter.addEventListener('change', filterPuzzles);
    if (typeFilter) typeFilter.addEventListener('change', filterPuzzles);
}

document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupFooterYear();

    setupFilterListeners();

    window.filterPuzzles = filterPuzzles;

    loadPuzzles();
});