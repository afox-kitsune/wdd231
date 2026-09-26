const openDetails = document.querySelectorAll('.openDetails');
const testDetails = document.getElementById('npModal');
const closeModal = document.querySelectorAll('.closeModal');

openDetails.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        document.getElementById(modalId).showModal();
    });
});

closeModal.forEach(button => {
    button.addEventListener('click', () => {
        button.parentElement.close();
    });
});