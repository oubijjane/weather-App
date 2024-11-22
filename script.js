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
    const condition = await data.days[0].conditions;
    const minTemp = await data.days[0].tempmin;
    const maxTemp = await data.days[0].tempmax;
    const humidity = await data.days[0].humidity;
    const windSpeed = await data.days[0].windspeed;
    const windDirection = await data.days[0].winddir;
    const endTime = Date.now();
    const timeTaken = endTime - startTime;
    finishLoading();
    cityWeather = weather(
      location,
      temp,
      condition,
      minTemp,
      maxTemp,
      humidity,
      windSpeed,
      windDirection
    );
    console.log(`total time ${timeTaken}ms`);
    console.log(cityWeather.info());
  } catch (e) {
    console.log("error: " + e);
  }
}

function weather(
  location,
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

  const info = () =>
    `address: ${location}, temp: ${temp}c°, condition: ${condition}, Min: ${minTemp}c°, Max: ${maxTemp}c°,` +
    `humidity: ${humidity}% wind speed: ${windSpeed}kph, wind direction: ${windDirection}°  `;

  return {
    getLocation,
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
    e.preventDefault();
    console.log("hello");
    getData(cityInput.value);
  });
}
function Startlaoding() {
  const btn = document.querySelector(".search");
  btn.disabled = true;

  btn.textContent = "loading";
}
function finishLoading() {
  const btn = document.querySelector(".search");
  btn.disabled = false;
  btn.textContent = "search";
}

eventBtn();
