const apiKey = "Your API KEY"; // <-- Replace this with your OpenWeatherMap API key

function searchCity() {
  const cityName = document.getElementById("cityInput").value.trim();

  if (cityName === "") {
      alert("Please enter a city name!");
      return;
  }

  // Step 1: Get lat and lon from Geocoding API
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
          if (data.length === 0) {
              alert("City not found! Try again.");
              return;
          }
          const lat = data[0].lat;
          const lon = data[0].lon;

          // Step 2: Get weather data
          getWeather(lat, lon, cityName);
      })
      .catch(error => {
          console.error("Error fetching location:", error);
          alert("Error fetching location. Try again.");
      });
}

function getWeather(lat, lon, cityName) {
  fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
          console.log(data);

          document.getElementById("city").textContent = `Weather in ${cityName}`;
          document.getElementById("temp").textContent = `Temperature: ${data.current.temp} °C`;
          document.getElementById("description").textContent = `Condition: ${data.current.weather[0].description}`;
      })
      .catch(error => {
          console.error("Error fetching weather:", error);
          alert("Error fetching weather. Try again.");
      });
}