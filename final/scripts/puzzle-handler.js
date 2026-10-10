
import { puzzleData } from './puzzles.js';

let puzzles = [];

export async function loadPuzzles() {
    try {
        puzzles = puzzleData;

        setupFilters();
        displayPuzzles(puzzles);
    } catch (error) {
        console.error("Could not load puzzle collection:", error);
        const grid = document.getElementById('puzzleGrid');
        if (grid) {
            grid.innerHTML = `<p class="no-results" style="color: #013328;">Error loading puzzle collection.</p>`;
        }
    }
}


function setupFilters() {
    const shapes = new Set();
    const counts = new Set();
    const types = new Set();

    puzzles.forEach(p => {
        shapes.add(p.shape);
        counts.add(p.count);
        types.add(p.type);
    });

    populateSelect('shapeFilter', Array.from(shapes).sort());
    populateSelect('countFilter', Array.from(counts).map(Number).sort((a, b) => a - b));
    populateSelect('typeFilter', Array.from(types).sort());
}

function populateSelect(id, items) {
    const select = document.getElementById(id);
    if (!select) return;


    select.innerHTML = `<option value="all">All ${id.replace('Filter', 's')}</option>`;

    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        select.appendChild(option);
    });
}


export function displayPuzzles(items) {
    const grid = document.getElementById('puzzleGrid');
    if (!grid) return;

    grid.innerHTML = '';

    if (items.length === 0) {
        grid.innerHTML = '<p class="no-results">No matching puzzles found.</p>';
        return;
    }

    items.forEach(puzzle => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <!-- Styled image container layout wrapper matching pet reference structure -->
            <div class="card-image-wrapper">
                <img src="${puzzle.imageUrl}" alt="${puzzle.theme} puzzle blueprint" class="card-img" loading="lazy">
            </div>
            <div class="card-content">
                <h3 class="card-title">${puzzle.theme}</h3>
                <div class="badge-container">
                    <span class="badge badge-type">${puzzle.type}</span>
                    <span class="badge badge-shape">${puzzle.shape}</span>
                    <span class="badge badge-level">${puzzle.level}</span>
                </div>
                <div class="details">
                    <p><strong>Pieces:</strong> ${puzzle.count}</p>
                    <p><strong>Logged By:</strong> ${puzzle.member}</p>
                    <p><strong>Location:</strong> ${puzzle.location}</p>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}


export function filterPuzzles() {
    const shapeEl = document.getElementById('shapeFilter');
    const countEl = document.getElementById('countFilter');
    const typeEl = document.getElementById('typeFilter');

    if (!shapeEl || !countEl || !typeEl) return;

    const activeShape = shapeEl.value;
    const activeCount = countEl.value;
    const activeType = typeEl.value;

    const filtered = puzzles.filter(puzzle => {
        const matchShape = activeShape === 'all' || puzzle.shape === activeShape;
        const matchCount = activeCount === 'all' || puzzle.count === String(activeCount);
        const matchType = activeType === 'all' || puzzle.type === activeType;
        return matchShape && matchCount && matchType;
    });

    displayPuzzles(filtered);
}