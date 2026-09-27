import revelations from "../data/ioi.mjs";
const cards = document.querySelector('.discover-grid');

const displayMembers = (revealings) => {
    revealings.forEach((reveal) => {
        const card = document.createElement('section');
        const Item = document.createElement('h2');
        const figureEight = document.createElement('figure')
        const imageName = document.createElement('img');
        const address = document.createElement('address');
        const desc = document.createElement('p');
        const learn = document.createElement('button');

        Item.textContent = `${reveal.name}`;
        address.textContent = `${reveal.address}`;
        desc.textContent = `${reveal.description}`;
        imageName.setAttribute('src', reveal.imageName);
        imageName.setAttribute('alt', `${reveal.imageName}`);
        imageName.setAttribute('loading', 'lazy');
        imageName.setAttribute('width', '300');
        imageName.setAttribute('height', '200');

        learn.textContent = "Learn more"
        figureEight.appendChild(imageName);
        card.appendChild(learn);
        card.appendChild(figureEight);
        card.appendChild(Item);
        card.appendChild(address);
        card.appendChild(desc);


        cards.appendChild(card);
    });
}

function getmemberData() {

    try {
        displayMembers(revelations.revealings);
    } catch (error) {
        console.log(error);
    }
}

getmemberData();