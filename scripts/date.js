const currentYearElement = document.querySelector('#currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}


const lastModifiedElement = document.querySelector('#lastModified');
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;
}
