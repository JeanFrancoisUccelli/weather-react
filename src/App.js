/* eslint-disable no-template-curly-in-string */
import React, { useState } from "react";
import moment from "moment";

const api = {
  key: "6654f8cea88d659f746234255cd4fb63",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("coudoux");
  const [weather, setWeather] = useState({});
  const [list, setList] = useState({});
  const [todayWeather, setTodayWeather] = useState({});
  const favorites = [];

  const search = (evt) => {
    if (evt.key === "Enter") {
      // fetch(`${api.base}forecast?q=${query}&units=metric&cnt=3&APPID=${api.key}`)
      fetch(
        `${api.base}forecast?q=${query}&units=metric&lang=us&cnt=7&APPID=${api.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          setList(result.list);
        });
      fetch(
        `${api.base}weather?q=${query}&units=metric&lang=us&APPID=${api.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setTodayWeather(result);
        });
    }
  };
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()].slice(0, 4);
    let date = d.getDate();
    let month = months[d.getMonth()].slice(0, 3);
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const addFavorites = () => {
    favorites.push("kiwi");
    console.log(favorites);
  };

  return (
    <div
      className={
        typeof weather.list !== "undefined"
          ? weather.list[0].main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="search"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <div className="bouton">
          <button onClick={() => addFavorites()}> Ajouter aux favoris</button>
        </div>

        <div className="mainContainer">
          <div className="title">
            {moment().format("LL")} in {todayWeather.name}
          </div>
          <div className="todayForecast">
            {typeof todayWeather.main != "undefined" ? (
              <>
                <div className="weather">
                  {todayWeather.weather[0].description}
                </div>
                <div className="weather">
                  {Math.round(todayWeather.main.temp)}°c
                </div>
                <div className="icon">
                  <img
                    src={`http://openweathermap.org/img/wn/${todayWeather.weather[0].icon}@2x.png`}
                    alt=""
                  />
                </div>
                <div className="temp">
                  <div className="weather">
                    Temp min: {todayWeather.main.temp_min}
                  </div>
                  <div className="weather">
                    Temp max: {todayWeather.main.temp_max}
                  </div>
                  <div className="wind">
                    {Math.round(todayWeather.wind.speed * 3.6)} Km/h
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>

          <div className="forewardForcast">
            {list.length > 0
              ? list.map((x) => {
                  return (
                    <div className="container" key={x.dt}>
                      <div className="location">
                        {weather.city.name}, {weather.city.country}
                      </div>
                      <div className="date">{x.dt_txt}</div>
                      <div className="temp">
                        {Math.round(list[0].main.temp)}°c
                      </div>
                      <div className="weather">{x.weather[0].description}</div>
                      <div className="wind">
                        {Math.round(x.wind.speed * 3.6)} Km/h
                      </div>
                      <div className="icon">
                        <img
                          src={`http://openweathermap.org/img/wn/${x.weather[0].icon}@2x.png`}
                          alt=""
                        />
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
