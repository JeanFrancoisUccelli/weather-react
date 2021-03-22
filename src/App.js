/* eslint-disable no-template-curly-in-string */
import React, { useState } from "react";

const api = {
  key: "6654f8cea88d659f746234255cd4fb63",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [list, setList] = useState({});
  const [todayWeather, setTodayWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      // fetch(`${api.base}forecast?q=${query}&units=metric&cnt=3&APPID=${api.key}`)
      fetch(
        `${api.base}forecast?q=${query}&units=metric&lang=us&cnt=7&APPID=${api.key}`
      )
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            alert("Enter a valid city name");
            window.location.reload();
          }
        })
        .then((result) => {
          setWeather(result);
          setList(result.list);
        })
        .catch(function (error) {
          console.log(
            "Il y a eu un problème avec l'opération fetch: " + error.message
          );
        });
      fetch(
        `${api.base}weather?q=${query}&units=metric&lang=us&APPID=${api.key}`
      ).then((res) => res.json())
       .then((res)=>setTodayWeather(res));
    }
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
            placeholder="Enter your city name ..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <div className="mainContainer">
          {typeof todayWeather.main != "undefined" ? (
            <>
              <div className="mainTitle">Today weather</div>
              <div className="todayForecast">
                <div className="title">{todayWeather.name}</div>
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

                <div className="weather">
                  Temp min: {todayWeather.main.temp_min}
                </div>
                <div className="weather">
                  Temp max: {todayWeather.main.temp_max}
                </div>
                <div className="wind">
                  Wind: {Math.round(todayWeather.wind.speed * 3.6)} Km/h
                </div>
              </div>
            </>
          ) : (
            ""
          )}

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
                        Wind : {Math.round(x.wind.speed * 3.6)} Km/h
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
