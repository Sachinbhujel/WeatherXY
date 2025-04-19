import React, { useState } from "react";
import './App.css';

function Dashboard({ setCity, weather, error }) {
    const [input, setInput] = useState("");

    const handleSearch = () => {
        if (input.trim()) {
            setCity(input);
        }
        console.log("dd")
    };

    return (
        <>
            <div className="weather-app">
                <div className="weather-app-top">
                    <h2>Weather<span className="xy">XY</span></h2>
                    <img
                        src="https://icons.veryicon.com/png/o/miscellaneous/business-bicolor-icon/weather-109.png"
                        alt="Weather Illustration"
                        className="default-img"
                    />
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
                <div className="weather-show-div">
                    <div className="weather-div">
                        <div>
                            {error && <p className="error-msg">{error}</p>}
                            {!weather && !error && <p className="error-msg">Loading weather...</p>}
                            {weather && (
                                <>
                                    <h2 className="weather-place-name">Weather in {weather.name}</h2>
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
