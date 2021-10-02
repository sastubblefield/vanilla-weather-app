function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(`#forecast`);
  let days = ["MON", "TUE", "WED", "THU"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `<div class="row">
          <div class="col-2">
            <div class="weather-forecast-day">MON</div>
            <image
              src="http://openweathermap.org/img/wn/01d.png"
              width="36"
            ></image>
            <span class="weather-forecast-day-max">70</span>
            <span class="weather-forecast-day-min">68</span>
          </div>
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "73bb802b6842545f8bc067782928d7ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector(`#temperature`);
  let locationElement = document.querySelector(`#location`);
  let humidityElement = document.querySelector(`#humidity`);
  let windElement = document.querySelector(`#wind`);
  let descriptionElement = document.querySelector(`#description`);
  let dateElement = document.querySelector(`#date`);
  let iconElement = document.querySelector(`#icon`);

  fahreneheitTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(fahreneheitTemperature);
  locationElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].main;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "73bb802b6842545f8bc067782928d7ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector(`#location-entered`);
  search(cityElement.value);
}

function showcelciusDegrees(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(`#temperature`);
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  let celciusTemperature = ((fahreneheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

function showfahrenheitDegrees(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector(`#temperature`);
  temperatureElement.innerHTML = Math.round(fahreneheitTemperature);
}

let fahreneheitTemperature = null;

let form = document.querySelector(`#search-location`);
form.addEventListener("submit", handleSubmit);

let celciusLink = document.querySelector(`#celcius-link`);
celciusLink.addEventListener("click", showcelciusDegrees);

let fahrenheitLink = document.querySelector(`#fahrenheit-link`);
fahrenheitLink.addEventListener("click", showfahrenheitDegrees);

search("San Diego");
