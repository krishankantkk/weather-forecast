import React, { useState, useEffect } from "react";
import axios from "axios";

const GeoLocationWeather = ({ weatherData, setWeatherData }) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const getWeatherData = async (latitude, longitude) => {
    const API_KEY = "435e10a121d9b7aaaab11f5c19b67ab9";
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    try {
      const res = await axios.get(API_URL);
      console.log(res);
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
      console.log(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
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
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          getWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return <div></div>;
};

export default GeoLocationWeather;
