const btn = document.querySelector("#btn");
const text = document.querySelector("#text");
const container = document.querySelector("#container");
btn.addEventListener("click", () => {
  let cityName = text.value.trim();
  console.log(cityName);
  let URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=56f6c0b622936f804e34e01881f8b01f`;

  async function getData() {
    try {
      const data = await fetch(URL);
      const result = await data.json();

      // check if city exists
      if (result.cod !== 200) {
        container.innerHTML = `<p style="color: red">❌ ${result.message}</p>`;
        return;
      }

      let temp = Math.floor(result.main.temp - 273);
      let humidity = result.main.humidity;
      let wind = Math.floor(result.wind.speed * 3.6);

      container.innerHTML += `
        <h1>${cityName}</h1>
        <p>Temperature : ${temp} °C</p>
        <p>Humidity : ${humidity} %</p>
        <p>Wind : ${wind} km/h</p>`;
    } catch (error) {
      console.error(error);
      container.innerHTML = `<p style="color:red;">⚠️ Something went wrong. Please try again.</p>`;
    }
  }

  getData();
});
