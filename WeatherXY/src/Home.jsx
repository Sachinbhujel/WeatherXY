import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./App.css";

function Home({ weather, error }) {
    console.log(weather);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="weather-app">
                <div className="weather-app-top">
                <h2>Weather<span className="xy">XY</span></h2>
                    {/*<img
                            src="https://icons.veryicon.com/png/o/miscellaneous/business-bicolor-icon/weather-109.png"
                            alt="Weather Illustration"
                            onClick={() => setIsOpen(true)}
                            className="default-img"
                        />*/}
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

                        <Link to="/">
                            <button>Home</button>
                        </Link>
                        <Link to="/dashboard">
                            <button>Dashboard</button>
                        </Link>
                        <Link to="/map">
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
                <Outlet />
            </div>
        </>
    );
}

export default Home;
