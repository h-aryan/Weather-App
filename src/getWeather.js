import getWeatherFromAPI from "./fetch.js";

// returns current weather conditions
async function getCurrentWeather(city, unit) {
    try {
        let weather = await getWeatherFromAPI(city);
        if (!weather) throw new Error("Weather data is empty");

        let formattedWeather = formatWeather(weather)
        return {
            temperature: formattedWeather.getTemperature(unit),
            feelsLike: formattedWeather.getFeelsLike(unit),
            humidity: formattedWeather.getHumidity(),
            wind: formattedWeather.getWind(unit),
            winddir: formattedWeather.getWinddir(),
            precipitation: formattedWeather.getPrecipitation(unit),
            condition: formattedWeather.getCondition(),
            country: formattedWeather.getCountry(),
            city: formattedWeather.getCity(),
            icon: formattedWeather.getIcon(),
        };
    } catch (error) {
        console.error(`Error retrieving weather for ${city}:`, error);
    }
}

export { getCurrentWeather };

function formatWeather(weather) {
    return {
        getPrecipitation(unit) {
            if (unit === "C") {
                const precipitation = weather.currentConditions.precipitation || 0;
                return `${precipitation.toFixed(1)} mm`;
            } else {
                const precipitation = weather.currentConditions.precipitation || 0;
                return `${(precipitation * 0.0393701).toFixed(2)} in`;
            }
        },
        getTemperature(unit) {
            if (unit === "C") {
                const celsius = (weather.currentConditions.temp - 32) * 5/9;
                return `${celsius.toFixed(1)}°C`;
            } else {
                return `${weather.currentConditions.temp}°F`;;
            }
        },
        getFeelsLike(unit) {
            if (unit === "C") {
                const celsius = (weather.currentConditions.feelslike - 32) * 5/9;
                return `${celsius.toFixed(1)}°C`;
            } else {
                return `${weather.currentConditions.feelslike}°F`;;
            }
        },
        getHumidity() {
            return weather.currentConditions.humidity;
        },
        getWind(unit) {
            if (unit === "C") {
                return `${weather.currentConditions.windspeed} km/h`;
            } else {
                return `${(weather.currentConditions.windspeed * 0.621371).toFixed(1)} mph`;
            }
        },
        getWinddir() {
            return `${weather.currentConditions.winddir}`;
        },
        getCondition() {
            return weather.currentConditions.conditions;
        },
        getCountry() {
            return weather.resolvedAddress.split(",").slice(1).join(",");
        },
        getCity() {
            return weather.resolvedAddress.split(",")[0];
        },
        getIcon() {
            return weather.currentConditions.icon;
        }
    };
}