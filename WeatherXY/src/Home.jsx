import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./App.css";

function Home({ weather, error, isOpen, setIsOpen }) {
    const [otherWeather, setOtherWeather] = useState([]);
    const otherCities = [
        "New York",
        "Tokyo",
        "Paris",
        "Delhi",
        "Cairo",
        "Sydney",
        "America",
    ];
    const WEATHER_API_KEY = "6ba708951b97b015a56ca7ec30d18cf5";

    useEffect(() => {
        Promise.all(
            otherCities.map((city) =>
                fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
                ).then((res) => res.json())
            )
        ).then((data) => {
            const validWeather = data.filter((item) => item.cod === 200);
            setOtherWeather(validWeather);
        });
    }, []);

    return (
        <>
            <div className="weather-app">
                <div className="weather-app-top">
                    <a href="#"><h2>
                        Weather<div className="xy">XY</div>
                    </h2></a>
                    <span
                        className="material-symbols-outlined"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        menu
                    </span>
                </div>
                {isOpen && (
                    <div className="sidebar">
                        <span
                            className="material-symbols-outlined close-icon"
                            onClick={() => setIsOpen(false)}
                        >
                            close
                        </span>

                        <Link to="/" onClick={() => setIsOpen(false)}>
                            <button>Home</button>
                        </Link>
                        <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                            <button>Dashboard</button>
                        </Link>
                        <Link to="/map" onClick={() => setIsOpen(false)}>
                            <button>Map</button>
                        </Link>
                    </div>
                )}
                <div className="weather-show-div">
                    <div className="weather-show-div-top">
                        <h2>Local Weather</h2>
                        <span className="material-symbols-outlined">
                            refresh
                        </span>
                    </div>
                    <hr />
                    <div className="weather-div">
                        <div>
                            {error && <p className="error-msg">{error}</p>}
                            {!weather && !error && (
                                <p className="error-msg">Loading weather...</p>
                            )}
                            {weather && (
                                <>
                                    <h2>Weather in {weather.name}</h2>
                                    <div className="weather-details">
                                        <p>
                                            <strong>Condition:</strong>{" "}
                                            {weather.weather[0].description}
                                        </p>
                                        <p>
                                            <strong>Temperature:</strong> 🌡
                                            {weather.main.temp} °C
                                        </p>
                                        <p>
                                            <strong>Humidity:</strong> 💧
                                            {weather.main.humidity}%
                                        </p>
                                        <p>
                                            <strong>Pressure:</strong>{" "}
                                            {weather.main.pressure} hPa
                                        </p>
                                        <p>
                                            <strong>Wind Speed:</strong> 💨
                                            {weather.wind.speed} m/s
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <h1 className="others-title">Others Places Weather:-</h1>
                {/*<div className="others-weather-show-div">
                    <div className="other-weather-cards">
                        {otherWeather.map((cityWeather) => (
                            <div
                                className="weather-card"
                                key={cityWeather.id}
                            >
                                <h2>Weather in {cityWeather.name}</h2>
                                <p>
                                    <strong>Condition:</strong>{" "}
                                    {cityWeather.weather[0].main}
                                </p>
                                <p>
                                    <strong>Temp:</strong> 🌡{" "}
                                    {cityWeather.main.temp} °C
                                </p>
                                <p>
                                    <strong>Humidity:</strong> 💧{" "}
                                    {cityWeather.main.humidity}%
                                </p>
                            </div>
                        ))}
                    </div>
                </div>*/}

                <div className="weather-show-div">
                    <div className="weather-show-div-top">
                        <h2>Suggestions</h2>
                        <span className="material-symbols-outlined">
                            refresh
                        </span>
                    </div>
                    <hr />
                    <div className="weather-div">
                        <div>
                            {error && <p className="error-msg">{error}</p>}
                            {!weather && !error && (
                                <p className="error-msg">Loading weather...</p>
                            )}
                            {otherWeather.map((cityWeather) => (
                            <div
                                className="weather-card"
                                key={cityWeather.id}
                            >
                                <h2>Weather in {cityWeather.name}</h2>
                                <div className="weather-details">
                                <p>
                                    <strong>Condition:</strong>{" "}
                                    {cityWeather.weather[0].main}
                                </p>
                                <p>
                                    <strong>Temp:</strong> 🌡{" "}
                                    {cityWeather.main.temp} °C
                                </p>
                                <p>
                                    <strong>Humidity:</strong> 💧{" "}
                                    {cityWeather.main.humidity}%
                                </p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                <Outlet />
            </div>
        </>
    );
}

export default Home;
