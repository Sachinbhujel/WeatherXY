import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./App.css";

function Home({ weather, error, isOpen, setIsOpen }) {

    const [otherWeather, setOtherWeather] = useState([]);
    const otherCities = ["New York", "Tokyo", "Paris", "Delhi", "America"];
    const WEATHER_API_KEY = "6ba708951b97b015a56ca7ec30d18cf5";

    const [selectedDate, setSelectedDate] = useState(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    });

    const getNext7Days = () => {
        const today = new Date();
        const days = [];

        for (let i = 1; i < 8; i++) {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i);
            days.push(nextDay);
        }

        return days;
    };

    const weekDates = getNext7Days();

    const [selectedDateWeather, setSelectedDateWeather] = useState(null);
    const fetchWeatherForDate = (date) => {
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${weather.name}&appid=${WEATHER_API_KEY}&units=metric`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.cod === "200") {
                    const forecastData = data.list.filter((item) => {
                        const itemDate = new Date(item.dt * 1000);
                        return itemDate.toDateString() === date.toDateString();
                    });
                    setSelectedDateWeather(forecastData[0] || null);
                } else {
                    console.error("Error fetching forecast:", data.message);
                    setSelectedDateWeather(null);
                }
            })
            .catch((error) => {
                console.error("API fetch error:", error);
                setSelectedDateWeather(null);
            });
    };

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

        fetchWeatherForDate(selectedDate);
    }, [selectedDate]);

    return (
        <>
            <div className="weather-app">
                <div className="weather-app-top">
                    <a href="#">
                        <h2>
                            Weather<div className="xy">XY</div>
                        </h2>
                    </a>
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
                <div className="others-weather-div">
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

                <h1 className="tomorrow-title">Tomorrow's Weather:-</h1>
                <div className="next-day-button">
                    {weekDates.map((date, index) => {
                        const isActive =
                            date.toDateString() === selectedDate.toDateString();
                        return (
                            <div
                                key={index}
                                className={isActive ? "active-date-btn" : ""}
                                onClick={() => setSelectedDate(date)}
                            >
                                <h3>
                                    {date.toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                    })}
                                </h3>
                            </div>
                        );
                    })}
                </div>
                {selectedDateWeather ? (
                    <div className="weather-div">
                        <div className="weather-details tomorrow-weather-details">
                            <h2>
                                🌤 Weather for {weather.name} on{" "}
                                {selectedDate.toLocaleDateString("en-GB")}
                            </h2>
                            <div className="weather-details">
                                <p>
                                    <strong>Condition:</strong>{" "}
                                    {selectedDateWeather.weather[0].description}
                                </p>
                                <p>
                                    <strong>Temp:</strong> 🌡{" "}
                                    {selectedDateWeather.main.temp} °C
                                </p>
                                <p>
                                    <strong>Humidity:</strong> 💧{" "}
                                    {selectedDateWeather.main.humidity}%
                                </p>
                                <p>
                                    <strong>Wind Speed:</strong> 💨{" "}
                                    {selectedDateWeather.wind.speed} m/s
                                </p>
                                <p>
                                    <strong>Pressure:</strong>{" "}
                                    {selectedDateWeather.main.pressure} hPa
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="weather-show-div">
                        <div className="weather-details">
                            <p className="err-msg">
                                Weather data unavailable for the selected date
                            </p>
                        </div>
                    </div>
                )}

                <Outlet />
            </div>
        </>
    );
}

export default Home;
