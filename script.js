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
    const precipprob = await data.days[0].precipprob;
    const endTime = Date.now();
    const timeTaken = endTime - startTime;
    const hourlyWeather = await data.days[0].hours;
    cityWeather = weather(
      location,
      date,
      temp,
      condition,
      minTemp,
      maxTemp,
      humidity,
      windSpeed,
      windDirection,
      precipprob
    );
    setBackground(cityWeather.getCondition().toLowerCase());
    displayData(cityWeather);
    getHourlyweather(hourlyWeather);

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
  windDirection,
  precipprob
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

  const getPrecipprob = () => precipprob;

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
    getPrecipprob,
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
  btn.addEventListener("click", async (e) => {
    cleanBody();
    await getData(cityInput.value);
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
  const body = document.querySelector("body");
  const div = document.createElement("div");
  const div1 = document.createElement("div");
  div1.className = "dayWeather";
  div.className = "container";

  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const p4 = document.createElement("p");
  const p5 = document.createElement("p");
  const p6 = document.createElement("p");
  const p7 = document.createElement("p");
  const p8 = document.createElement("p");
  const p9 = document.createElement("p");
  const p10 = document.createElement("p");
  const img = document.createElement("img");

  p1.textContent = "location: " + cityWeather.getLocation();
  p2.textContent = "Temp: " + cityWeather.getTemp() + "c°";
  p3.textContent = "condition: " + cityWeather.getCondition();
  p4.textContent = "min temp: " + cityWeather.getMinTemp() + "c°";
  p5.textContent = "max temp: " + cityWeather.getMaxTemp() + "c°";
  p6.textContent = "Humidity: " + cityWeather.getHumidity() + "%";
  p7.textContent = "wind speed: " + cityWeather.getWindSpeed() + "kph";
  p8.textContent = "wind direction: " + cityWeather.getWindDirection() + "°";
  p9.textContent = "date: " + cityWeather.getDate();
  p9.textContent = "Precipprob: " + cityWeather.getPrecipprob() + "%";
  img.src = "imgs/" + cityWeather.getCondition() + ".png";

  div1.append(img, p1, p9, p2, p3, p4, p5, p6, p7, p8, p10);
  div.appendChild(div1);
  body.appendChild(div);
}
function card(cityWeather) {
  const div = document.querySelector(".cards");
  const card = document.createElement("div");
  card.className = "card";
  const img = document.createElement("img");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const div1 = document.createElement("div");
  const drop = document.createElement("img");
  const p4 = document.createElement("p");

  img.src = "imgs/" + cityWeather.getCondition() + ".png";
  p2.textContent = cityWeather.getDate();
  p3.textContent =
    cityWeather.getMaxTemp() + "° " + "/" + cityWeather.getMinTemp() + "° ";
  p4.textContent = cityWeather.getPrecipprob() + "%";
  drop.src = "imgs/drop.png";
  drop.className = "small";
  div1.append(drop, p4);
  div1.className = "pros";

  card.append(img, p2, p3, div1);

  div.appendChild(card);
}

async function getAllData(location) {
  let cityWeather = "";
  Startlaoding();
  const startTime = Date.now();
  createCardesDiv();
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
        day.winddir,
        day.precipprob
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

function setBackground(weather) {
  const img = document.querySelector(".img-back");
  let background = "";
  if (weather === "clear") {
    background = "imgs/background/clear background.png";
  } else if (weather.includes("snow")) {
    background = "imgs/background/snow background.png";
  } else if (weather.includes("rain")) {
    background = "imgs/background/rain background.png";
  } else if (weather.includes("overcast")) {
    background = "imgs/background/overcast background.png";
  } else {
    background = "imgs/background/clear background.png";
  }

  img.src = background;
}
function cleanBody() {
  const div1 = document.querySelector(".container");
  const div2 = document.querySelector(".cards");
  if (div1 !== null) {
    div1.remove();
  }
  if (div2 !== null) {
    div2.remove();
  }
}
function getHourlyweather(cityWeather) {
  const div = document.querySelector(".container");
  const div1 = document.createElement("div");
  div1.className = "hourlyWeather";
  div.appendChild(div1);
  cityWeather.forEach((hour) => {
    displayHourlyData(hour);
  });
}
function createCardesDiv() {
  const body = document.querySelector("body");
  const div = document.createElement("div");
  div.className = "cards";
  body.appendChild(div);
}
eventBtn();
function getWeatherForCurrentLOcation() {
  Startlaoding();
  navigator.geolocation.getCurrentPosition(async (position) => {
    await getData(position.coords.latitude + "," + position.coords.longitude);
    getAllData(position.coords.latitude + "," + position.coords.longitude);
    finishLoading();
  });
}
function displayHourlyData(data) {
  const div = document.querySelector(".hourlyWeather");
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");

  div1.className = "hours";

  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const img = document.createElement("img");

  p3.textContent = data.temp + "c°";

  p1.textContent = data.datetime.slice(0, 5);
  p2.textContent = data.precipprob + "%";
  img.src = "imgs/drop.png";
  img.className = "small";
  div2.append(img, p2);

  div1.append(p1, p3, div2);
  div.appendChild(div1);
}
getWeatherForCurrentLOcation();
