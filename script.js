const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = document.getElementById("city").value;
  console.log(city);
  const cityName = document.getElementById("cityName");
  const time = document.getElementById("cityTime");
  const temperature = document.getElementById("temperature");
  const presentCondition = document.getElementById("presentCondition");
  const windSpeed = document.getElementById("windSpeed");
  const humidity = document.getElementById("humidity");
  const imageIcon = document.getElementById("image");
  const windIcon = document.getElementById("windIcon");
  const humidityIcon = document.getElementById("humidityIcon");

  console.log("hellow");
  let response;
  try {
    const apiKey = "232aa98470112c650618eea27098cf5b"; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    // Use the fetch API for making the request
    response = await fetch(apiUrl);

    // Check if the response is successful (status code in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON data from the response
    response = await response.json();
    console.log(response);
  } catch (error) {
    console.log("Error:", error);
  }

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    document.querySelector(".error").style.display = "none";
    cityName.innerText = city;

    //getting current time
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const currentTime = `${hours}:${minutes}`;
    time.innerText = currentTime;

    //calculating temperature in degree Celsius
    let tempvar = response.main.temp;
    tempvar = Number(tempvar);
    tempvar = tempvar - 273.15;
    tempvar = Math.round(tempvar);
    temperature.innerText = `${tempvar}°C`;

    presentCondition.innerText = response.weather[0].main;

    let windSpeedinMps = Number(response.wind.speed);
    let windSpeedinKph = windSpeedinMps * 3.6;
    windSpeedinKph = Math.floor(windSpeedinKph);
    windSpeed.innerText = `${windSpeedinKph}Km/h`;
    windIcon.style.display = "inline";

    humidity.innerText = `${response.main.humidity}%`;
    humidityIcon.style.display = "inline";

    const icon = response.weather[0].icon;
    imageIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" width="100px"> `;
    document.querySelector(".weather").style.display = "block";
  }
});
