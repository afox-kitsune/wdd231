const localurl = 'data/members.json';
const cards = document.querySelector('.cards');

const displayMembers = (members) => {

    if (!cards) {
        console.error("Error: Container element with class '.cards' was not found in the HTML.");
        return;
    }

    cards.innerHTML = '';

    members.forEach((member) => {
        console.log("Rendering member object:", member);

        const card = document.createElement('section');
        const businessName = document.createElement('h2');
        const membershipLevel = document.createElement('p');
        const address = document.createElement('p');
        const infoWrapper = document.createElement('div');
        const contacts = document.createElement('div');
        const phone = document.createElement('p');
        const corpURL = document.createElement('p');
        const portrait = document.createElement('img');

        businessName.textContent = member.name || member.companyName || "Unknown Company";

        const currentLevel = member.membershipLevel || member.level || "General";
        membershipLevel.textContent = `Level: ${currentLevel}`;
        membershipLevel.setAttribute('class', 'membership-level');

        address.textContent = `Address: ${member.address || member.streetAddress || "Mesa, AZ"}`;
        address.setAttribute('class', 'address');

        phone.textContent = `Phone: ${member.phone || member.phoneNumber || "N/A"}`;
        phone.setAttribute('class', 'phone');

        const webAddress = member.websiteURL || member.website || member.url || "#";
        corpURL.textContent = `Website: ${webAddress}`;
        corpURL.setAttribute('class', 'URL');

        const imagePath = member.imageurl || member.image || member.logo || "images/logo.svg";
        portrait.setAttribute('src', imagePath);
        portrait.setAttribute('alt', `Logo of ${member.name || 'Member'}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '64px');
        portrait.setAttribute('height', '64px');

        card.setAttribute('class', 'business spotlight');
        infoWrapper.setAttribute('class', 'info-wrapper');
        contacts.setAttribute('class', 'contacts');

        card.appendChild(businessName);
        card.appendChild(membershipLevel);

        infoWrapper.appendChild(portrait);
        contacts.appendChild(address);
        contacts.appendChild(phone);
        contacts.appendChild(corpURL);
        infoWrapper.appendChild(contacts);

        card.appendChild(infoWrapper);
        cards.appendChild(card);
    });
}

async function getmemberData() {
    try {
        console.log(`Initiating data fetch target: ${localurl}`);
        const response = await fetch(localurl);

        if (!response.ok) {
            throw new Error(`HTTP network error! Status returned: ${response.status}`);
        }

        const data = await response.json();
        console.log("Raw JSON dataset pulled successfully:", data);

        const memberList = data.members || data;
        if (!Array.isArray(memberList)) {
            throw new Error("JSON structure error: Expected array data list format.");
        }

        const spotlightCandidates = memberList.filter(member => {
            const level = String(member.memberLevel || member.membershipLevel || member.level).toLowerCase();
            return level === 'gold' || level === 'silver' || level === '2' || level === '3';
        });

        console.log("Filtered Spotlight Candidates found:", spotlightCandidates);

        if (spotlightCandidates.length === 0) {
            console.warn("Notice: No matching Gold/Silver tier records tracked.");
            cards.innerHTML = '<p>No active spotlights available at this time.</p>';
            return;
        }

        const shuffled = spotlightCandidates.sort(() => 0.5 - Math.random());

        const randomCount = Math.floor(Math.random() * 2) + 2;
        const selectedSpotlights = shuffled.slice(0, randomCount);

        console.log(`Displaying ${selectedSpotlights.length} randomly selected card members.`);
        displayMembers(selectedSpotlights);

    } catch (error) {
        console.error('Critical Fetch Engine Interruption:', error);
        if (cards) {
            cards.innerHTML = `<p style="color: red;">Failed to load spotlight details. Error profile logged to console tracking diagnostics.</p>`;
        }
    }
}

getmemberData();