const url = '//api.openweathermap.org/data/2.5/weather?lat=33.42564&lon=-111.8332671&units=imperial&appid=a3d5c690e80c82e4d9081411508ef284'
const forecasturl = '//api.openweathermap.org/data/2.5/forecast?lat=33.424564&lon=-111.8332671&units=imperial&appid=dbaf0c6e7f36fcf8c3dec7dd079ea6c1';

const temperature = document.getElementById('current-temp');
const icon = document.getElementById('weather-icon');
const forecast = document.getElementById('forecast');

async function apiFetch(chosenurl) {
    try {
        const response = await fetch(chosenurl);
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
    const iconurl = `images/weather-icon.svg`;
    let desc = data.weather[0].description;
    let high = data.main.temp_max;
    let low = data.main.temp_min;
    let hum = data.main.humidity;
    let sunny = data.sys.sunrise;
    let sundown = data.sys.sunset;
    icon.setAttribute('loading', 'lazy');
    icon.setAttribute('src', iconurl);
    icon.setAttribute('alt', "weather-icon");

    let smiles = sunny * 1000;
    let frowns = sundown * 1000;

    let timestart = new Date(smiles);
    let timeup = new Date(frowns);

    const options = { hour: 'numeric', minute: 'numeric', hour12: true }
    sunrise = timestart.toLocaleTimeString('en-US', options)
    sunset = timeup.toLocaleTimeString('en-US', options);

    temperature.innerHTML =
        `${data.main.temp}&deg;F
        <p>${desc}</p>
    <p>high: ${high}°</p>
    <p>low: ${low}°</p>
    <p>humidity: ${hum}%</p>
    <p>sunrise: ${sunrise}</p>
    <p>sunset: ${sunset}</p>`;
}

async function displayForecastResults(data, selectedElement) {

    console.log(data)



    selectedElement.innerHTML =
        `<p>Today: ${data.list[4].main.temp}&deg;F</p>
        <p>Wednesday: ${data.list[8].main.temp}&deg;F</p>
        <p>Friday: ${data.list[12].main.temp}&deg;F</p>`;
}

apiFetch(url).then(data => displayResults(data));
apiFetch(forecasturl).then(data => displayForecastResults(data, forecast));