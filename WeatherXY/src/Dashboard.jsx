import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Dashboard({ setCity, weather, error, isOpen, setIsOpen }) {
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
                <div className="weather-search-div">
                    <input
                        type="text"
                        value={input}
                        placeholder="Enter city name......"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
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
                    <div className="weather-div">
                        <div>
                            {error && <p className="error-msg">{error}</p>}
                            {!weather && !error && (
                                <p className="error-msg">Weather data show here!!</p>
                            )}
                            {weather && (
                                <>
                                    <h2 className="weather-place-name">
                                        Weather in {weather.name}
                                    </h2>
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
            </div>
        </>
    );
}

export default Dashboard;
