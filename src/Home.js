import React, { useState, useEffect } from "react";
import axios from "axios";
import ForecastComponent from "./components/ForecatComponent";
import GeoLocationWeather from "./components/GeoLocationWeather";

const Home = () => {
  const [city, setCity] = useState("");
  const [error, seterror] = useState("");
  const [celcius, setcelcius] = useState("celcius");
  const [weatherData, setWeatherData] = useState({
    temp: "",
    name: "",
    humidity: "",
    windSpeed: "",
    tempMin: "",
    tempMax: "",
    pressure: "",
    country: "",
    image: "",
  });

  const handleSearch = () => {
    if (city !== "") {
      setCity(city);
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=435e10a121d9b7aaaab11f5c19b67ab9&units=metric`;
      axios
        .get(API_URL)
        .then((res) => {
          const image = getImageForWeather(res.data.weather[0].main);
          setWeatherData({
            temp: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            windSpeed: res.data.wind.speed,
            tempMin: res.data.main.temp_min,
            tempMax: res.data.main.temp_max,
            pressure: res.data.main.pressure,
            country: res.data.sys.country,
            image: image,
            desc: res.data.weather[0].main,
          });
          seterror("");
          console.log(res);
        })
        .catch((err) => {
          seterror("please enter a valid city name");
          console.error("Error fetching weather data:", err);
        });
    }
  };

  const getImageForWeather = (weatherMain) => {
    const weatherImages = {
      Thunderstorm: "cloudy.png",
      Rain: "raincloudy.png",
      Snow: "snow.png",
      Drizzle: "drizzle.png",
      Smoke: "fog.png",
      Haze: "haze.png",
      Fog: "fog.png",
      Clear: "clear.png",
      Cloudy: "cloudy.png",
      Dust: "clear.png",
      Clouds: "clouds.png",
    };
    return `images/${weatherImages[weatherMain] || "clear.png"}`;
  };

  useEffect(() => {
    // You can add any cleanup or additional logic here if needed
  }, [city, weatherData]);
  const handletoggle = () => {
    setcelcius(!celcius);
  };
  const convertTemperature = (temperature) => {
    if (celcius) {
      return temperature;
    } else {
      return (temperature * 9) / 5 + 32;
    }
  };

  return (
    <div className="container">
      <GeoLocationWeather
        weatherData={weatherData}
        setWeatherData={setWeatherData}
      />
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter a city name"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <button onClick={handleSearch}>
            <img src="images/search.png" alt="search" />
          </button>
        </div>

        <button className="toggle" onClick={handletoggle}>
          {celcius ? "In Fahrenheit Units" : "In Celsius Units"}
        </button>
        <p className="error">{error}</p>
        {weatherData.name ? (
          <>
            <div className="weather-info">
              <div className="weather-details">
                <div className="details">
                  <p>
                    <span className="bold">Min temp</span> :{" "}
                    {convertTemperature(Math.round(weatherData.tempMin))}°{" "}
                    {celcius ? "C" : "F"}
                  </p>
                  <p>
                    <span className="bold">Max temp</span> :{" "}
                    {convertTemperature(Math.round(weatherData.tempMax))}°{" "}
                    {celcius ? "C" : "F"}
                  </p>
                  <p>
                    <span className="bold">Pressure </span> :{" "}
                    {weatherData.pressure}hPa
                  </p>
                  <p className="details-item">
                    <img src="images/wind.png" alt="" className="small-image" />
                    : {weatherData.windSpeed} m/sec
                  </p>
                  <p className="bold">Windspeed</p>
                  <p className="details-item">
                    <img
                      src="images/humidity.png"
                      alt=""
                      className="small-image"
                    />
                    : {weatherData.humidity}%
                  </p>
                  <p className="bold">Humidity</p>
                </div>
              </div>
              <div className="wininfo">
                <img src={weatherData.image} alt="" />
                <div className="details">
                  <h2>
                    {" "}
                    {convertTemperature(Math.round(weatherData.temp))}°{" "}
                    {celcius ? "C" : "F"}
                  </h2>
                  <h1>
                    {weatherData.name} {weatherData.country}
                  </h1>
                  <p>{weatherData.desc}</p>
                </div>
              </div>
            </div>
            <div className="day-forecast">
              <div className="day">
                <ForecastComponent celcius={celcius} city={weatherData.name} />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
