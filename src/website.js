import {getCurrentWeather} from "./getWeather";
import { format } from "date-fns";

export function searchLocation() {
    let currentUnit = "C";
    const form = document.getElementById("form");
    const searchIcon = document.querySelector(".search-icon");

    // if user clicks on search icon
    searchIcon.addEventListener("click", showWeather);

    // if user presses enter on the search
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        showWeather();
    });

    function unitToggle() {
        const celsius = document.querySelector(".C");
        const fahrenheit = document.querySelector(".F");

        celsius.addEventListener("click", () => {
            currentUnit = "C"
            showWeather();
        });
        fahrenheit.addEventListener("click", () => {
            currentUnit = "F"
            showWeather();
        });
    }
    unitToggle();

    function showWeather() {
        const location = document.getElementById("location-input").value.trim();
        const locNotFound = document.querySelector(".loc-not-found");

        if (!location) {
            console.warn("Please enter a location!");
            return;
        }

        getCurrentWeather(location, currentUnit)
            .then(weather => {
                if (weather) {
                    locNotFound.classList.add("not-visible");
                    console.log(weather);
                    weatherCardGenerator(weather);
                } else {
                    locNotFound.classList.remove("not-visible");
                    console.error("Given location not found!");
                }
            });
    }
}

function weatherCardGenerator(weather) {
    const images = require.context("./assets/animation-ready", false, /\.svg$/);
    const now = new Date();
    const formattedDate = format(now, "EEEE, yyyy-MM-dd HH:mm");

    const currentWeather = document.querySelector(".current-weather");
    currentWeather.classList.remove("not-visible");

    const currentCity = document.querySelector(".current-city");
    currentCity.textContent = weather.city;
    const currentCountry = document.querySelector(".current-country");
    currentCountry.textContent = weather.country;
    const currentDate = document.querySelector(".current-date");
    currentDate.textContent = formattedDate;

    const weatherImg = document.querySelector(".current-weather-img");
    weatherImg.src = getImagePath(weather.icon);
    const currentDescription = document.querySelector(".current-description");
    currentDescription.textContent = weather.condition;

    const currentTemp = document.querySelector(".current-temp");
    currentTemp.textContent = weather.temperature;
    const currentFeelsLike = document.querySelector(".current-feels-like");
    currentFeelsLike.innerHTML = `Feels Like <br> ${weather.feelsLike}`;
    const currentPrecipitation = document.querySelector(".current-precipitation");
    currentPrecipitation.textContent = weather.precipitation;
    const compassImg = document.querySelector(".wind-direction");
    compassImg.src = getImagePath("compass");
    compassImg.style.transform = `rotate(${weather.winddir}deg)`;
    const currentWindspeed = document.querySelector(".current-windspeed");
    currentWindspeed.textContent = weather.wind;

    function getImagePath(icon) {
        return images(`./${icon}.svg`);
    }
}


