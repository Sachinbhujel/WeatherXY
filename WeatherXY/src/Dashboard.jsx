import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Dashboard({ setCity, weather, error, isOpen, setIsOpen, lightTheme, setLightTheme }) {
    const [input, setInput] = useState("");

    const handleSearch = () => {
        if (input.trim()) {
            setCity(input);
        }
        console.log("dd");
    };

    return (
        <>
            <div className="weather-app">
            <div className="weather-app-top">
                    <div className="weather-app-top-title">
                        <span
                            class="material-symbols-outlined"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            menu
                        </span>
                        <a href="#">
                            <h2>
                                Weather<div className="xy">XY</div>
                            </h2>
                        </a>
                    </div>
                    <div className="theme-div">
                        {lightTheme ? (
                            <span
                                class="material-symbols-outlined"
                                onClick={() => setLightTheme(false)}
                            >
                                dark_mode
                            </span>
                        ) : (
                            <span
                                class="material-symbols-outlined"
                                onClick={() => setLightTheme(true)}
                            >
                                light_mode
                            </span>
                        )}
                    </div>
                </div>

                <div className="dashboard-search-div">
                <div className="weather-search-div">
                    <input
                        type="text"
                        value={input}
                        placeholder="Enter city name......"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
                </div>

                {isOpen && (
                                <div className="sidebar">
                                    <span
                                        className="material-symbols-outlined close-icon"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        close
                                    </span>
                
                                    <div className="buttons-div">
                                        <Link
                                            to="/"
                                            onClick={() => setIsOpen(false)}
                                            className="link-button"
                                        >
                                            <span class="material-symbols-outlined">house</span>
                                            <button>Home</button>
                                        </Link>
                                        <Link
                                            to="/dashboard"
                                            onClick={() => setIsOpen(false)}
                                            className="link-button"
                                        >
                                            <span class="material-symbols-outlined">
                                                monitoring
                                            </span>
                                            <button>Dashboard</button>
                                        </Link>
                                        <Link
                                            to="/map"
                                            onClick={() => setIsOpen(false)}
                                            className="link-button"
                                        >
                                            <span class="material-symbols-outlined">map</span>
                                            <button>Map</button>
                                        </Link>
                                    </div>
                                </div>
                            )}

<div className="weather-container">
    {error && <p className="error-msg">{error}</p>}
    {!weather && !error && (
        <p className="error-msg">Weather data show here!!</p>
    )}
    {weather && (
        <>
            
            <div className="weather-grid">
                <div className="weather-card">
                    <div className="weather-card-header">
                        <span className="icon">🌡️</span>
                        <span>Temperature</span>
                    </div>
                    <div className="weather-main-value">
                        {weather.main.temp}°C
                    </div>
                    <div className="weather-subtext">
                        Feels like {weather.main.feels_like}°C
                    </div>
                    <div className="weather-extra">
                        <div>High: {weather.main.temp_max}°C</div>
                        <div>Low: {weather.main.temp_min}°C</div>
                    </div>
                </div>

                <div className="weather-card">
                    <div className="weather-card-header">
                        <span className="icon">💧</span>
                        <span>Humidity</span>
                    </div>
                    <div className="weather-main-value">
                        {weather.main.humidity}%
                    </div>
                    <div className="weather-subtext">
                        High humidity
                    </div>
                </div>

                <div className="weather-card">
                    <div className="weather-card-header">
                        <span className="icon">💨</span>
                        <span>Wind</span>
                    </div>
                    <div className="weather-main-value">
                        {weather.wind.speed} m/s
                    </div>
                    <div className="weather-subtext">
                        Moderate wind
                    </div>
                </div>

                <div className="weather-card">
                    <div className="weather-card-header">
                        <span className="icon">👀</span>
                        <span>Visibility</span>
                    </div>
                    <div className="weather-main-value">
                        {weather.visibility / 1000} km
                    </div>
                    <div className="weather-subtext">
                        Clear view
                    </div>
                </div>

                <div className="weather-card">
                    <div className="weather-card-header">
                        <span className="icon">📈</span>
                        <span>Pressure</span>
                    </div>
                    <div className="weather-main-value">
                        {weather.main.pressure} hPa
                    </div>
                    <div className="weather-subtext">
                        Stable atmosphere
                    </div>
                </div>
            </div>
        </>
    )}
</div>

            </div>
        </>
    );
}

export default Dashboard;
