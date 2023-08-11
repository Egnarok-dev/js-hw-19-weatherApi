
  

  const refs = {
    searchForm: document.querySelector('.js-search-form'),
    cardContainer: document.querySelector('.weather-card'),
  };
  
  refs.searchForm.addEventListener("submit", onSearchWeather);
  preventDefaultCard();
  
  function preventDefaultCard() {
    const defaultCity = "Lviv"; // Заміни на "Wellington", якщо ти хочеш використовувати цей місто за замовчуванням
    const defaultApiKey = "64a5316a4133477e8ae3e200979ac7e7"; // Заміни на свій API ключ
    const defaultApiUrl = `https://api.weatherbit.io/v2.0/current?city=${defaultCity}&key=${defaultApiKey}`;
  
    fetch(defaultApiUrl)
      .then((response) => response.json())
      .then(render);
  }
  
  function onSearchWeather(event) {
    event.preventDefault();
    const city = document.querySelector('#city-input').value;
    const apiKey = "64a5316a4133477e8ae3e200979ac7e7"; // Заміни на свій API ключ
    const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`;
  
    fetch(url)
      .then((response) => response.json())
      .then(render);
  }
  
  function render(data) {
    const card = renderWeatherCard(data);
    refs.cardContainer.innerHTML = card;
  }
  
  function renderWeatherCard(data) {
    const current = data.data[0];
    const city = current.city_name;
    const weatherDescription = current.weather.description;
    const temperature = current.temp;
    const windSpeed = current.wind_spd;
    const humidity = current.rh;
  
    return `<div class="cardContainer">
      <div class="card">
        <p class="city">${city}</p>
        <p class="weather">${weatherDescription}</p>
        <p class="temp">${temperature}°C</p>
        <div class="minmaxContainer">
          <div class="min">
            <p class="minHeading">Wind</p>
            <p class="minTemp">${windSpeed} Km/h</p>
          </div>
          <div class="max">
            <p class="maxHeading">Humidity</p>
            <p class="maxTemp">${humidity} %</p>
          </div>
        </div>
      </div>
    </div>`;
  }