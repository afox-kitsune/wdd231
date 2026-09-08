const currentYearElement = document.querySelector('#currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Populate last modified date/time string dynamically
const lastModifiedElement = document.querySelector('#lastModified');
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;
}