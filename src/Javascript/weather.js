const weather = () => {
  const apiKey = "2b2113dde0bb14492cbc13550d8b7c6e";

  const city = document.querySelector("[data-input-city]");

  /* when loading the page, automatically focus on the input. */
  window.onload = () => {
    city.focus();
    document.body.style.background = "images/weather-bg.jpg";
  };

  const error = document.querySelector("[data-error]");

  const searchBtn = document.querySelector("[data-search-btn");

  city.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      const cityValue = document.querySelector("[data-input-city").value;

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=${apiKey}`;
      if (cityValue === "") return;
      fetchData(url, cityValue);
    }
  });

  searchBtn.addEventListener("click", () => {
    const cityValue = document.querySelector("[data-input-city").value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=${apiKey}`;
    if (cityValue === "") return;
    fetchData(url, cityValue);
  });

  async function fetchData(url, city) {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    if (data.cod === "404") {
      error.style.display = "block";
      return;
    }

    const weatherWrapper = document.querySelector("[ data-weather-wrapper]");
    weatherWrapper.style.display = "flex";

    const cityTitle = document.querySelector("[data-city-title]");
    const weatherImg = document.querySelector("[data-weather-img]");

    cityTitle.textContent = city.toUpperCase();

    switch (data.weather[0].main) {
      case "Clouds":
        weatherImg.src = "images/cloud.png";
        break;
      case "Clear":
        weatherImg.src = "images/clear.png";
        break;
      case "Snow":
        weatherImg.src = "images/snow.png";
        break;
      case "Haze":
        weatherImg.src = "images/mist.png";
        break;
      case "Rain":
        weatherImg.src = "images/rain.png";
        break;
      default:
        weatherImg.src = "";
    }

    const weatherTemp = document.querySelector("[data-weather-temp]");
    const weatherFeltLike = document.querySelector("[data-weather-feltLike]");
    const weatherStatus = document.querySelector("[data-weather-status]");

    weatherTemp.textContent = `${parseInt(data.main.temp)}°C`;
    weatherFeltLike.textContent = `(feel like ${parseInt(
      data.main.feels_like
    )}°C)`;
    weatherStatus.textContent = data.weather[0].description;

    /* Humidity & WindSpeed */
    const dataWrapper = document.querySelector("[data-wrapper]");

    dataWrapper.style.display = "grid";

    /* Pressure & Max Temp */
    const pressure = document.querySelector("[data-pressure]");
    const maxTemp = document.querySelector("[data-max-temp]");

    pressure.textContent = `${parseInt(data.main.pressure)} hPa`;

    maxTemp.textContent = `${parseInt(data.main.temp_max)}°C`;

    /* Humidity & Wind Speed */
    const humidity = document.querySelector("[data-humidity]");
    const windSpeed = document.querySelector("[data-wind-speed]");

    humidity.textContent = `${parseInt(data.main.humidity)}%`;
    windSpeed.textContent = `${parseInt(data.wind.speed)}Km/h`;
  }
};

export default weather;
