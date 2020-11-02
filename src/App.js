/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
const api = {
  key: "6654f8cea88d659f746234255cd4fb63",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}forecast?q=${query}&units=metric&cnt=3&APPID=${api.key}`)
      // fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result)
          console.log(weather)
        });
    }
     
  }
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  
  console.log(weather)
  return (
   
    <div className={(typeof weather.list!= "undefined") ? ((weather.list[0].main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="search"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.list != "undefined") ? (
        <div className="container">
            <div className="location">{weather.city.name}, {weather.city.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
            <div className="temp">
              {Math.round(weather.list[0].main.temp)}°c
            </div>
            <div className="weather">{weather.list[0].weather[0].main}</div>
            <div className="wind">Win speed: {Math.round(weather.list[0].wind.speed*3.6)} Km/h</div>
            <img src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`} alt='' />
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
