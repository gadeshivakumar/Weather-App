const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
}

const uris={
  
  "01n":"https://images.pexels.com/photos/754419/pexels-photo-754419.jpeg?auto=compress&cs=tinysrgb&w=600",
  "02n":"https://images.pexels.com/photos/414659/pexels-photo-414659.jpeg?auto=compress&cs=tinysrgb&w=600",
  "03n":"https://images.pexels.com/photos/4823233/pexels-photo-4823233.jpeg?auto=compress&cs=tinysrgb&w=600",
  "04n":"https://images.pexels.com/photos/27198160/pexels-photo-27198160/free-photo-of-a-person-is-standing-on-a-beach-with-a-surfboard.jpeg?auto=compress&cs=tinysrgb&w=600",
  "09n":"https://images.pexels.com/photos/18621653/pexels-photo-18621653/free-photo-of-wet-pane-in-rain.jpeg?auto=compress&cs=tinysrgb&w=400",
  "10n":"https://images.pexels.com/photos/459451/pexels-photo-459451.jpeg?auto=compress&cs=tinysrgb&w=400",
  "11n":"https://images.pexels.com/photos/1294229/pexels-photo-1294229.jpeg?auto=compress&cs=tinysrgb&w=400",
  "13n":"https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg?auto=compress&cs=tinysrgb&w=400",
  "50n":"https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=400",
  "50d":"https://images.pexels.com/photos/163323/fog-dawn-landscape-morgenstimmung-163323.jpeg?auto=compress&cs=tinysrgb&w=400",

}
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {

  
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  document.querySelectorAll("body")[0].style.backgroundImage = `url('${uris[weather.weather[0].icon]}')`;

}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}