const menuButton = document.getElementById('menubutton');
const navMenu = document.getElementById('navigationMenu');

if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        menuButton.classList.toggle('open');
    });
}