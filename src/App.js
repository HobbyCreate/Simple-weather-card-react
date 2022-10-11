import React, {useState} from 'react';
import keys from './APIKeys';
import './App.css';

// assign the API key
const Key = {
  keys: keys.API_KEY,
  base: keys.BASE_API
}

function App() {

  // get Date
  const dataBuild = (d) => {
    let date = String(new window.Date());
    let days = date.slice(4,15);
    return days;
  }

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  // Get date in AM / PM
  const date = String(new window.Date());
  const time = date.slice(16,18);

  // Fetch weather data 
  const search = (e) => {
    if(e.key === "Enter"){
      fetch(`${Key.base}weather?q=${query}&appid=${Key.keys}&units=metric`)
        .then((res) => res.json())
          .then((result) => {
            setQuery("");
            setWeather(result);
            console.log(result);
    });
  }
}
  
  return (
    // check current date to define the background of weather card
    <div className= {
      typeof weather.main != "undefined" ? 
      time > 18 || time < 6 ? 
      "App night" : "App day" 
      : "App"
      }>

      <main>
        <div className="search-container">
          <input type="text" 
            placeholder="search" 
            className="searchBar" 
            onChange = {(e) => setQuery(e.target.value)}
            value = {query} 
            onKeyPress = {search}
          />
        </div>
        {  typeof weather.main != "undefined" ? (
          <div>

            <div className="location-container">
              <div className="location">
                <p>{weather.sys.country}, {weather.name}</p>
              </div>
              <div className="date">
                <p>{dataBuild()}</p>
              </div>
            </div>

            <div className="weather-container">
              <div className="temperature">
                <p>{Math.floor(weather.main.temp)}°C</p>
              </div>
              <div className="weather">
                <p>{weather.weather[0].main}</p>
              </div>
            </div>
            <div className="temp-wind-container">
              <div className="max">
                <h2>{Math.floor(weather.main.temp_max)} °C</h2>
                <p>max temp</p>
              </div>
              <div className="min">
                <h2>{Math.floor(weather.main.temp_min)} °C</h2>
                <p>min temp</p>
              </div>
              <div className="wind-speed">
                <h2>{Math.floor(weather.wind.speed)} km/h</h2>
                <p>wind speed</p>
              </div>
            </div>
        
          </div>
          ) 
          : ("") } 
      </main>
    </div>
  );
}

export default App;
