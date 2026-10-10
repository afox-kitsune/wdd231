const signupForm = document.querySelector("#signup-form");
const usernameInput = document.querySelector("#member-username");
const fullNameInput = document.querySelector("#member-name");
const emailInput = document.querySelector("#member-email");
const locationInput = document.querySelector("#member-location");
const passwordInput = document.querySelector("#member-password");

const contributeForm = document.querySelector("#contribute-form");
const contribTitleInput = document.querySelector("#contribute-title");
const contribPiecesInput = document.querySelector("#contribute-pieces");
const contribTypeSelect = document.querySelector("#contribute-type");
const contribLevelSelect = document.querySelector("#contribute-level");
const contribShapeSelect = document.querySelector("#contribute-shape");

const requestForm = document.querySelector("#request-form");
const requestChallengeSelect = document.querySelector("#request-selection");
const shippingAddressInput = document.querySelector("#shipping-address");
const shippingMethodSelect = document.querySelector("#shipping-method");

const costDisplay = document.querySelector("#calculatedCost");
const requestsLogContainer = document.querySelector("#requests-log-container");

const shippingMethodRates = {
    "standard": 10.00,
    "expedited": 15.00,
    "overnight": 25.00
};


function handleSignupSubmit(event) {
    event.preventDefault();

    const newMember = {
        username: usernameInput.value.trim(),
        fullName: fullNameInput.value.trim(),
        email: emailInput.value.trim(),
        location: locationInput.value.trim(),
        signUpDate: new Date().toLocaleDateString()
    };

    try {
        localStorage.setItem("activeMemberProfile", JSON.stringify(newMember));
        alert(`It is official everything has clicked into place. Welcome, ${newMember.username}!`);
        if (signupForm) signupForm.reset();
    } catch (error) {
        console.error("Your profile is not fitting right", error);
    }
}


function handleContributeSubmit(event) {
    event.preventDefault();

    const newContribution = {
        id: Date.now(),
        theme: contribTitleInput.value.trim(),
        pieces: parseInt(contribPiecesInput.value, 10) || 0,
        type: contribTypeSelect.value,
        level: contribLevelSelect.value,
        shape: contribShapeSelect.value,
        dateSubmitted: new Date().toLocaleDateString()
    };

    try {
        const localContributions = localStorage.getItem("puzzleContributions");
        const contributionsArray = localContributions ? JSON.parse(localContributions) : [];

        contributionsArray.push(newContribution);
        localStorage.setItem("puzzleContributions", JSON.stringify(contributionsArray));

        alert("Thank you! For your puzzle contribution we will connect it with the next solver.");
        if (contributeForm) contributeForm.reset();
    } catch (error) {
        console.error("Your contribution is not fitting right:", error);
    }
}


async function updateShippingEstimate() {
    try {
        if (!shippingMethodSelect || !costDisplay) return;

        const shippingMethod = shippingMethodSelect.value;

        if (!shippingMethod) {
            costDisplay.textContent = "\$0.00";
            return;
        }


        await new Promise(resolve => setTimeout(resolve, 150));


        const computedTotal = (shippingMethodRates[shippingMethod.toLowerCase()] || 0).toFixed(2);
        costDisplay.textContent = `$${computedTotal}`;
    } catch (error) {
        console.error("Error calculating shipping cost:", error);
        if (costDisplay) costDisplay.textContent = "Calculation Error";
    }
}


function renderSavedRequestsList() {
    if (!requestsLogContainer) return;

    const localRequests = localStorage.getItem("userPuzzleRequests");
    const requestsArray = localRequests ? JSON.parse(localRequests) : [];

    requestsLogContainer.innerHTML = '';

    if (requestsArray.length === 0) {
        requestsLogContainer.innerHTML = '<p class="no-requests">No puzzle requests found.</p>';
        return;
    }

    requestsArray.forEach((request, index) => {
        const card = document.createElement('div');
        card.className = 'request-log-card';

        card.innerHTML = `
            <div class="card-header">
                <h3>Puzzle Request #${index + 1}</h3>
                <button class="delete-request-btn" data-id="${request.id}">Remove</button>
            </div>
            <div class="card-body">
                <p><strong>Level:</strong> ${request.desiredChallengeLevel || 'N/A'}</p>
                <p><strong>Address:</strong> ${request.address || 'N/A'}</p>
                <p><strong>Shipping Method:</strong> ${request.method || 'N/A'}</p>
            </div>
        `;

        requestsLogContainer.appendChild(card);
    });
}


function handleRequestSubmit(event) {
    event.preventDefault();

    const newRequest = {
        id: Date.now(),
        desiredChallengeLevel: requestChallengeSelect ? requestChallengeSelect.value : '',
        address: shippingAddressInput ? shippingAddressInput.value.trim() : '',
        method: shippingMethodSelect ? shippingMethodSelect.value : '',
        estimatedCost: costDisplay ? costDisplay.textContent : '\$0.00',
        dateRequested: new Date().toLocaleDateString()
    };

    try {
        const localRequests = localStorage.getItem("userPuzzleRequests");
        const requestsArray = localRequests ? JSON.parse(localRequests) : [];

        requestsArray.push(newRequest);
        localStorage.setItem("userPuzzleRequests", JSON.stringify(requestsArray));

        alert("Congrats! Your puzzle request has been submitted and recorded.");

        if (requestForm) requestForm.reset();

        if (costDisplay) costDisplay.textContent = "\$10.00";

        renderSavedRequestsList();
    } catch (error) {
        console.error("Your puzzle request is not fitting right:", error);
    }
}


if (shippingMethodSelect) {
    shippingMethodSelect.addEventListener("change", updateShippingEstimate);
}
if (requestForm) {
    requestForm.addEventListener("reset", () => {
        if (costDisplay) {
            costDisplay.textContent = "$0.00";
        }
    });
}

if (requestsLogContainer) {
    requestsLogContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-request-btn")) {
            const targetId = parseInt(event.target.getAttribute("data-id"), 10);

            try {
                const localRequests = localStorage.getItem("userPuzzleRequests");
                let requestsArray = localRequests ? JSON.parse(localRequests) : [];

                requestsArray = requestsArray.filter(req => req.id !== targetId);

                localStorage.setItem("userPuzzleRequests", JSON.stringify(requestsArray));
                renderSavedRequestsList();
            } catch (error) {
                console.error("Failed to remove this piece", error);
            }
        }
    });
}


if (signupForm) signupForm.addEventListener("submit", handleSignupSubmit);
if (contributeForm) contributeForm.addEventListener("submit", handleContributeSubmit);
if (requestForm) requestForm.addEventListener("submit", handleRequestSubmit);


document.addEventListener("DOMContentLoaded", () => {
    renderSavedRequestsList();
    updateShippingEstimate();
});