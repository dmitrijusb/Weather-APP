"use strict";

//API Key
const api = {
  key: "ff026d1b7cb10e07ccc12e9056fa45cc",
  base: "https://api.openweathermap.org/data/2.5/",
};

//Selectors
const searchBox = document.querySelector(".search-box");
const errorMessage = document.querySelector(".alert");
const weatherImage = document.getElementById("weather-image");
const weatherStatus = document.getElementById("weather-status");
const currentTemperature = document.getElementById("curr-temp");
const feelingTemperature = document.getElementById("feel-temp");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind");
const city = document.getElementById("city");
const country = document.getElementById("country");
const latitude = document.getElementById("lat");
const longitude = document.getElementById("long");

//Functions

function init() {
  //TODO: Function to display current weather of Vilnius on start
}

async function getData(input) {
  //TODO: Function to get the data
  try {
    const result = await fetch(
      `${api.base}/weather?q=${input}&appid=${api.key}&units=metric`
    );
    const data = await result.json();
    renderCountry(data);
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message === "data.weather is undefined"
    ) {
      renderError("Error occured, city does not exist");
    }
  }
}

function renderCountry(data) {
  //TODO: Function will render received data from the API

  const capitalisedDescription = data.weather[0].description
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  weatherImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherStatus.textContent = `${capitalisedDescription}`;
  currentTemperature.textContent = `${data.main.temp.toFixed(1)}`;
  feelingTemperature.textContent = `${data.main.feels_like.toFixed(1)}`;
  humidity.textContent = `${data.main.humidity}`;
  windSpeed.textContent = `${data.wind.speed}`;
  city.textContent = `${data.name}`;
  country.textContent = `${data.sys.country}`;
  latitude.textContent = `${data.coord.lat}`;
  longitude.textContent = `${data.coord.lon}`;
}

function renderError(text) {
  errorMessage.textContent = text;
  errorMessage.style.opacity = 1;
  errorMessage.style.height = "auto";

  setTimeout(() => {
    errorMessage.style.transition = "opacity 1s ease-out;";
    errorMessage.style.opacity = 0;
    errorMessage.style.height = "auto";
    errorMessage.style.overflow = "hidden";
  }, 7000);
}

//getData("Madrid");

console.log(searchBox.value);

searchBox.addEventListener("keydown", function (e) {
  if (searchBox.value && e.key === "Enter") getData(searchBox.value);
});
