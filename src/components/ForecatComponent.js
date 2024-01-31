import React, { useState, useEffect } from "react";
import axios from "axios";

const ForecastComponent = ({ celcius, city }) => {
  const [error, seterror] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  const convertTemperature = (temperature) => {
    if (celcius) {
      return temperature;
    } else {
      return (temperature * 9) / 5 + 32;
    }
  };
  useEffect(() => {
    const getForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=435e10a121d9b7aaaab11f5c19b67ab9`
        );
        setForecastData(response.data.list);
        seterror(null);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
        seterror("please and valid city name");
      }
    };

    getForecast();
  }, [city]);

  return (
    <div className="forecast-day-container">
      <h2>5-Day Forecast for {city}</h2>

      {error ? (
        <div></div>
      ) : (
        <div className="day-container">
          {forecastData
            .filter((_, index) => index % 8 === 0) // Select every fifth item (index % 8 === 0)
            .map((forecastItem) => (
              <div key={forecastItem.dt} className="forecast-item">
                <p>
                  Date: {new Date(forecastItem.dt * 1000).toLocaleDateString()}
                </p>
                <p>
                  Avg Temp:{" "}
                  {convertTemperature(
                    Math.round(forecastItem.main.temp.toFixed(1))
                  )}
                  ° {celcius ? "C" : "F"}
                </p>
                <p>Description: {forecastItem.weather[0].description}</p>
                <img
                  className="forecast-img"
                  src={`http://openweathermap.org/img/w/${forecastItem.weather[0].icon}.png`}
                  alt={forecastItem.weather[0].description}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ForecastComponent;
