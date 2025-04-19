import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home';
import Dashboard from './Dashboard';
import Map from './Map';

function App(){
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const WEATHER_API_KEY = "6ba708951b97b015a56ca7ec30d18cf5";

    useEffect(() => {
      fetch("https://ipinfo.io/json?token=d0666e8c70b5f8")
          .then((res) => res.json())
          .then((location) => {
              const city = location.city;
              if (city) {
                  fetch(
                      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
                  )
                      .then((res) => res.json())
                      .then((data) => {
                          if (data.cod === 200) {
                              setWeather(data);
                              setError("");
                          } else {
                              setError("Weather data not found.");
                              setWeather(null);
                          }
                      });
              } else {
                  setError("Could not determine location.");
              }
          })
          .catch(() => {
            setError("Error fetching weather.");
            setWeather(null);
          });
  }, []);

  useEffect(() => {
    if (!city) return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeather(data);
          setError("");
        } else {
          setError("Weather data not found.");
          setWeather(null);
        }
      })
      .catch(() => {
        setError("Error fetching weather.");
        setWeather(null);
      });
  }, [city]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home weather={weather} error={error}/>}></Route>
          <Route path="/dashboard" element={<Dashboard setCity={setCity} weather={weather} error={error}/>}></Route>
          <Route path="/map" element={<Map />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;