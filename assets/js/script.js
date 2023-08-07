// API key for OpenWeatherMap
const apiKey = '4dd7b57e5eed893af88cf65760ecfbe4'; // Replace this with your actual API key

// Function to fetch weather data from the API
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('City not found.');
    }
    return await response.json();
  } catch (error) {
    alert('Error fetching weather data. Please try again.');
    return null;
  }
}

// Function to display current weather inf
function displayCurrentWeather(cityName, date, icon, temperature, humidity, windSpeed) {
    // Clear the previous weather info
    $('#weatherInfo').empty();
  
    // Create and append the elements to display the current weather info
    const weatherInfoDiv = $('<div>').addClass('weather-info');
    const cityHeader = $('<h2>').text(cityName + ' (' + date + ')');
    const weatherIcon = $('<img>').attr('src', icon);
    const temperatureP = $('<p>').text('Temperature: ' + temperature + ' °F');
    const humidityP = $('<p>').text('Humidity: ' + humidity + '%');
    const windSpeedP = $('<p>').text('Wind Speed: ' + windSpeed + ' MPH');
  
    weatherInfoDiv.append(cityHeader, weatherIcon, temperatureP, humidityP, windSpeedP);
    $('#weatherInfo').append(weatherInfoDiv);
  }