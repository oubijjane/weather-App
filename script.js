/* https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=8LFCZ2WZPLTSWFHLPXM5PHWG6 */

async function getData(location) {
  let cityWeather = "";
  Startlaoding();
  const startTime = Date.now();
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=8LFCZ2WZPLTSWFHLPXM5PHWG6&unitGroup=metric`,
      { mode: "cors" }
    );
    const data = await response.json();

    const temp = await data.days[0].temp;
    const date = await data.days[0].datetime;
    const condition = await data.days[0].conditions;
    const minTemp = await data.days[0].tempmin;
    const maxTemp = await data.days[0].tempmax;
    const humidity = await data.days[0].humidity;
    const windSpeed = await data.days[0].windspeed;
    const windDirection = await data.days[0].winddir;
    const endTime = Date.now();
    const timeTaken = endTime - startTime;
    cityWeather = weather(
      location,
      date,
      temp,
      condition,
      minTemp,
      maxTemp,
      humidity,
      windSpeed,
      windDirection
    );
    displayData(cityWeather);
    finishLoading();

    console.log(`total time ${timeTaken}ms`);
    console.log(cityWeather.info());
  } catch (e) {
    console.log("error: " + e);
    finishLoading();
  }
}

function weather(
  location,
  date,
  temp,
  condition,
  minTemp,
  maxTemp,
  humidity,
  windSpeed,
  windDirection
) {
  const getLocation = () => location;

  const getTemp = () => temp;

  const getCondition = () => condition;

  const getMinTemp = () => minTemp;

  const getMaxTemp = () => maxTemp;

  const getHumidity = () => humidity;

  const getWindSpeed = () => windSpeed;

  const getWindDirection = () => windDirection;
  const getDate = () => date;

  const info = () =>
    `address: ${location}, date: ${date}, temp: ${temp}c°, condition: ${condition}, Min: ${minTemp}c°, Max: ${maxTemp}c°,` +
    `humidity: ${humidity}% wind speed: ${windSpeed}kph, wind direction: ${windDirection}°  `;

  return {
    getLocation,
    getDate,
    getTemp,
    getCondition,
    getMinTemp,
    getMaxTemp,
    getHumidity,
    getWindSpeed,
    getWindDirection,
    info,
  };
}

function farenheitToCelcius(temp) {
  const getTemp = () => Math.ceil(((temp - 32) * 5) / 9);

  return { getTemp };
}

function eventBtn() {
  const btn = document.querySelector(".search");
  const cityInput = document.querySelector("#city");
  btn.addEventListener("click", (e) => {
    const div = document.querySelector(".container");
    const cards = document.querySelector(".cards");
    div.replaceChildren();
    cards.replaceChildren();
    getData(cityInput.value);
    getAllData(cityInput.value);
  });
}
function Startlaoding(timout) {
  const btn = document.querySelector(".search");
  btn.disabled = true;
}
function finishLoading() {
  const btn = document.querySelector(".search");
  btn.disabled = false;
  btn.textContent = "search";
}
function displayData(cityWeather) {
  const div = document.querySelector(".container");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const p4 = document.createElement("p");
  const p5 = document.createElement("p");
  const p6 = document.createElement("p");
  const p7 = document.createElement("p");
  const p8 = document.createElement("p");
  const p9 = document.createElement("p");

  p1.textContent = "location: " + cityWeather.getLocation();
  p2.textContent = "Temp: " + cityWeather.getTemp();
  p3.textContent = "condition: " + cityWeather.getCondition();
  p4.textContent = "min temp: " + cityWeather.getMinTemp();
  p5.textContent = "max temp: " + cityWeather.getMaxTemp();
  p6.textContent = "Humidity: " + cityWeather.getHumidity();
  p7.textContent = "wind speed: " + cityWeather.getWindSpeed();
  p8.textContent = "wind direction: " + cityWeather.getWindDirection();
  p9.textContent = "date: " + cityWeather.getDate();

  div.append(p1, p9, p2, p3, p4, p5, p6, p7, p8);
}
function card(cityWeather) {
  const div = document.querySelector(".cards");
  const card = document.createElement("div");
  card.className = "card";
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const p4 = document.createElement("p");
  p1.textContent = "condition: " + cityWeather.getCondition();
  p2.textContent = "date: " + cityWeather.getDate();
  p3.textContent = "min temp: " + cityWeather.getMinTemp();
  p4.textContent = "max temp: " + cityWeather.getMaxTemp();

  card.append(p1, p2, p3, p4);

  div.appendChild(card);
}

async function getAllData(location) {
  let cityWeather = "";
  Startlaoding();
  const startTime = Date.now();
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=8LFCZ2WZPLTSWFHLPXM5PHWG6&unitGroup=metric`,
      { mode: "cors" }
    );
    const data = await response.json();

    const days = await data.days;
    const endTime = Date.now();
    const timeTaken = endTime - startTime;
    days.forEach((day) => {
      cityWeather = weather(
        location,
        day.datetime,
        day.temp,
        day.conditions,
        day.tempmin,
        day.tempmax,
        day.humidity,
        day.windspeed,
        day.winddir
      );
      card(cityWeather);
    });
    finishLoading();

    console.log(`total time ${timeTaken}ms`);
    console.log(cityWeather.info());
  } catch (e) {
    console.log("error: " + e);
    finishLoading();
  }
}
eventBtn();
