const lastVisitTime = localStorage.getItem('lastVisit');

if (lastVisitTime) {

    const toDate = new Date().getTime();

    const difference = toDate - lastVisitTime;

    const dayDiff = difference / (1000 * 3600 * 24);

    const days = Math.floor(dayDiff);


    if (days >= 1) {
        if (days === 1) {
            document.getElementById('last-visit').textContent = "You last visited 1 day ago.";
        } else {
            document.getElementById('last-visit').textContent = `You last visited ${days} days ago.`;
        }
    } else {
        document.getElementById('last-visit').textContent = "Back so soon! Awesome!";
    }
} else {
    document.getElementById('last-visit').textContent = "Welcome! Let us know if you have any questions.";

}

localStorage.setItem('lastVisit', new Date().getTime());