let currentCity = "";
let units = "metric";

let city = document.querySelector(".weather-city");
let datetime = document.querySelector(".weather-datetime");
let weatherForecast = document.querySelector(".weather-forecast");
let weatherTemperature = document.querySelector(".weather-temperature");
let weatherIcon = document.querySelector(".weather-icon img");
let weatherMinmax = document.querySelector(".weather-minmax");
let weatherRealfeel = document.querySelector(".weather-realfeel");
let weatherHumidity = document.querySelector(".weather-humidity");
let weatherWind = document.querySelector(".weather-wind");
let weatherPressure = document.querySelector(".weather-pressure");
let weatherSearch = document.querySelector(".weather-search");

weatherSearch.addEventListener("submit", (e) => {
  let search = document.querySelector(".weather-search-form");
  e.preventDefault();
  currentCity = search.value;
  getWeather();
  search.value = "";
});

document.querySelector(".unit-celsius").addEventListener("click", () => {
  if (units !== "metric") {
    units = "metric";
    getWeather();
  }
});

document.querySelector(".unit-fahrenheit").addEventListener("click", () => {
  if (units !== "imperial") {
    units = "imperial";
    getWeather();
  }
});

function convertCountryCode(country) {
  let regionName = new Intl.DisplayNames(["en"], { type: "region" });
  return regionName.of(country);
}

function convertTimestamp(timestamp, timezone) {
  const convertTimeZone = timezone / 3600;
  const date = new Date(timestamp * 1000);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: `Etc/GMT${convertTimeZone >= 0 ? "-" : "+"}${Math.abs(convertTimeZone)}`,
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

function getWeather() {
  const API_KEY = "1d9f78e30b2044005ce9938e00c57fb2";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=${units}`
  )
    .then((res) => res.json())
    .then((data) => {
      city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
      datetime.innerHTML = convertTimestamp(data.dt, data.timezone);
      weatherForecast.innerHTML = `<p>${data.weather[0].main}</p>`;
      weatherTemperature.innerHTML = `${data.main.temp.toFixed()}&deg;`;
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
      weatherMinmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&deg;</p>
      <p>Max: ${data.main.temp_max.toFixed()}&deg;</p>`;
      weatherRealfeel.innerHTML = `${data.main.feels_like.toFixed()}&deg;`;
      weatherHumidity.innerHTML = `${data.main.humidity.toFixed()}%`;
      weatherWind.innerHTML = `${data.wind.speed}${units === "imperial" ? "mph" : "m/s"}`;
      weatherPressure.innerHTML = `${data.main.pressure} hPa`;
    });
}

document.body.onload = getWeather;
