const url = '//api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=a3d5c690e80c82e4d9081411508ef284'


const temperature = document.getElementById('current-temp');
const icon = document.getElementById('weather-icon');
const captionDesc = document.querySelector('figcaption');

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else {
            throw Error(await response.text());
        }

    }
    catch (error) {
        console.log(error);
    }
}

async function displayResults(data) {

    console.log(data)
    temperature.innerHTML = `${data.main.temp}&deg;F`;
    const iconurl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
    let desc = data.weather[0].description;
    icon.setAttribute('loading', 'lazy');
    icon.setAttribute('src', iconurl);
    captionDesc.textContent = `${desc}`;
}

apiFetch().then(data => displayResults(data));