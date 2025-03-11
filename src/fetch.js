const API_KEY = "SYRZ7YCFF93B8SKQ87KZHEYRU";

// gets weather from visual crossing's API
export default async function getWeatherFromAPI(city) {
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=us&include=events%2Chours%2Cdays%2Ccurrent&key=${encodeURIComponent(API_KEY)}&contentType=json`;

    try{
        let response = await fetch(url, {mode: 'cors'});
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw error;  // Rethrow the error so the caller can handle it
    }
}