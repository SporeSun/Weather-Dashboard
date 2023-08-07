// API key for OpenWeatherMap
const apiKey = '4dd7b57e5eed893af88cf65760ecfbe4'; // Replace this with your actual API key

// Function to fetch weather data from the API
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  
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

// Create and append the elements to display the 5-day forecast
function displayForecast(forecastData) {
    // Clear the previous forecast
    $('#forecast').empty();
        
    // Create and append the elements to display the 5-day forecast
    forecastData.list.slice(1, 6).forEach((forecast) => {
        const date = forecast.dt_txt.split(' ')[0];
        const icon = 'https://openweathermap.org/img/w/' + forecast.weather[0].icon + '.png';
        const temperature = forecast.main.temp;
        const humidity = forecast.main.humidity;
        const windSpeed = forecast.wind.speed;
    
        const forecastItem = $('<div>').addClass('col-md-3 forecast-item');
        const dateP = $('<p>').text('Date: ' + date);
        const weatherIcon = $('<img>').attr('src', icon);
        const temperatureP = $('<p>').text('Temperature: ' + temperature + ' °F');
        const humidityP = $('<p>').text('Humidity: ' + humidity + '%');
        const windSpeedP = $('<p>').text('Wind Speed: ' + windSpeed + ' MPH');
    
        forecastItem.append(dateP, weatherIcon, temperatureP, humidityP, windSpeedP);
        $('#forecast').append(forecastItem);
    });
    }

  // Create and append the elements to display the 5-day forecast


// Function to handle form submission
async function handleSubmit(event) {
    event.preventDefault();
    
    const cityInput = $('#cityInput').val().trim();
    if (cityInput === '') return;
    
    const weatherData = await getWeatherData(cityInput);
    if (weatherData) {
      // Store the city in local storage to maintain search history
      const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
      if (!searchHistory.includes(cityInput)) {
        searchHistory.push(cityInput);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        displaySearchHistory(searchHistory);
      }
  
      // Display the current weather info and forecast
      const currentWeather = weatherData.list[0];
      const cityName = weatherData.city.name;
      const date = currentWeather.dt_txt.split(' ')[0];
      const icon = 'https://openweathermap.org/img/w/' + currentWeather.weather[0].icon + '.png';
      const temperature = currentWeather.main.temp;
      const humidity = currentWeather.main.humidity;
      const windSpeed = currentWeather.wind.speed;
  
      displayCurrentWeather(cityName, date, icon, temperature, humidity, windSpeed);
      displayForecast(weatherData);
    }
}

  // Function to handle click on search history items
  function handleHistoryItemClick(event) {
    const city = $(this).text();
    $('#cityInput').val(city);
    $('#cityForm').submit();
  }
  
  // Function to display search history
  function displaySearchHistory(history) {
    // Clear the previous search history
    $('#searchHistory').empty();
  
    // Create and append the elements to display the search history
    const historyDiv = $('<div>').addClass('history');
    history.forEach((city) => {
      const historyItem = $('<div>').addClass('history-item').text(city);
      historyDiv.append(historyItem);
    });
  
    $('#searchHistory').append(historyDiv);
  }

// Event listeners
$('#cityForm').on('submit', handleSubmit);
$('#searchHistory').on('click', '.history-item', handleHistoryItemClick);

// Load search history from local storage and display it
const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
displaySearchHistory(searchHistory);