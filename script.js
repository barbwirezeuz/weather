// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const apiKey = '3edf7f1fb581b1c274ea459d267833a6';

// Array of top cities
const cities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Lagos', 'Agbara, Nigeria', 'Badagry',
'Tokyo', 'Delhi', 'Shanghai', 'Mumbai', 'Beijing', 'Istanbul', 'Lahore', 'Dhaka', 'Osaka', 'Karachi',
'Lagos', 'Cairo', 'Kinshasa', 'Johannesburg', 'Nairobi', 'Casablanca', 'Accra', 'Abidjan', 'Kano',
 'Luanda', 'Mexico City', 'Los Angeles', 'Toronto', 'Chicago', 'Houston', 'Havana', 'Miami', 'Phoenix', 'Montreal'];

// Function to fetch weather data for a city
async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to get the weather icon URL
function getWeatherIconUrl(iconCode) {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
}

// Function to render city weather cards
async function renderWeather() {
    const cityWeatherElement = document.getElementById('cityWeather');

    for (const city of cities) {
        const weatherData = await getWeather(city);

        if (weatherData) {
            const cityCard = document.createElement('div');
            cityCard.classList.add('city-card');
            cityCard.innerHTML = `
                <h2>${city}</h2>
                <p>Temperature: ${weatherData.main.temp}°C</p>
                <p>Weather: ${weatherData.weather[0].description}</p>
                <img src="${getWeatherIconUrl(weatherData.weather[0].icon)}" alt="Weather Icon">
            `;
            cityWeatherElement.appendChild(cityCard);
        }
    }
}



// ... (previous code)

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function to search for weather of a specific city
async function searchWeather() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();

    if (cityName !== '') {
        const weatherData = await getWeather(cityName);

        if (weatherData) {
            const searchResultElement = document.getElementById('searchResult');

            const cityCard = document.createElement('div');
            cityCard.classList.add('city-card');
            cityCard.innerHTML = `
                <h2>${capitalizeFirstLetter(cityName)}</h2>
                <p>Temperature: ${weatherData.main.temp}°C</p>
                <p>Weather: ${weatherData.weather[0].description}</p>
                <img src="${getWeatherIconUrl(weatherData.weather[0].icon)}" alt="Weather Icon">
            `;
            searchResultElement.innerHTML = ''; // Clear previous search result
            searchResultElement.appendChild(cityCard);
        } else {
            alert('Weather data not available for the entered city. Please try again.');
        }
    } else {
        alert('Please enter a city name.');
    }
    // Clear the input field after searching
    cityInput.value = '';
}

// ... (rest of the code)



// Call the renderWeather function on page load
window.onload = renderWeather;
