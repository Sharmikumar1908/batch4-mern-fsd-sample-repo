const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");

const city = document.getElementById("city");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const error = document.getElementById("error");


const searchWeather = async () => {

    const cityName = cityInput.value;

    if (cityName === "") {
        error.textContent = "Please enter a city name";
        return;
    }

    try {

        error.textContent = "Loading...";

        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results) {
            throw new Error("City not found");
        }

        const {
            latitude,
            longitude,
            name,
            country
        } = locationData.results[0];


        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
        );

        const weatherData = await weatherResponse.json();

        const {
            temperature_2m,
            relative_humidity_2m,
            weather_code,
            wind_speed_10m
        } = weatherData.current;


        city.textContent = `${name}, ${country}`;
        temperature.textContent = `Temperature: ${temperature_2m} °C`;
        condition.textContent = `Weather Code: ${weather_code}`;
        humidity.textContent = `Humidity: ${relative_humidity_2m}%`;
        wind.textContent = `Wind Speed: ${wind_speed_10m} km/h`;

        error.textContent = "";

    } catch (err) {

        error.textContent = "City not found. Please try again.";

        city.textContent = "Weather Dashboard";
        temperature.textContent = "";
        condition.textContent = "";
        humidity.textContent = "";
        wind.textContent = "";
    }
};


searchButton.addEventListener("click", searchWeather);