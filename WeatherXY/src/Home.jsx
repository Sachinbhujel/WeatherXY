import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./App.css";

function Home({
    weather,
    error,
    isOpen,
    setIsOpen,
    lightTheme,
    setLightTheme,
    fetchWeatherForDate,
}) {
    const [otherWeather, setOtherWeather] = useState([]);
    const otherCities = ["New York", "Tokyo", "Paris", "Delhi", "America"];
    const WEATHER_API_KEY = "6ba708951b97b015a56ca7ec30d18cf5";

    useEffect(() => {
        document.body.style.backgroundColor = lightTheme ? "white" : "black";
    }, [lightTheme]);

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

        const today = new Date();
        fetchWeatherForDate(today);
    }, []);

    return (
        <>
            <div className="weather-app">
                <div
                    className="weather-app-top"
                    style={{ backgroundColor: lightTheme ? "black" : "" }}
                >
                    <div className="weather-app-top-title">
                        <span
                            className="material-symbols-outlined"
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
                                className="material-symbols-outlined"
                                onClick={() => setLightTheme(true)}
                            >
                                light_mode
                            </span>
                        )}
                    </div>
                </div>

                <div className="weather-main">
                    <div className="weather-show-div">
                        {/*<div className="weather-show-div-top">
                        <h2>Local Weather</h2>
                        <span className="material-symbols-outlined">
                            refresh
                        </span>
                    </div>
                    <hr />*/}
                        <h1 style={{ color: lightTheme ? "black" : "white" }}>
                            Weather Forecast
                        </h1>
                        <p>Current weather for your location</p>
                        <div className="weather-div">
                            <div>
                                {error && <p className="error-msg">{error}</p>}
                                {!weather && !error && (
                                    <p className="error-msg">
                                        Loading weather...
                                    </p>
                                )}
                                {weather && (
                                    <>
                                        <div className="weather-details">
                                            <div className="date-place-div">
                                                <h1>
                                                    {weather.name}(
                                                    {weather.sys.country})
                                                </h1>
                                            </div>
                                            <div className="celcius-icons-div">
                                                <div className="celcius-div">
                                                    <img
                                                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                                        alt={
                                                            weather.weather[0]
                                                                .description
                                                        }
                                                    />
                                                    <h2>
                                                        {weather.main.temp} °C
                                                    </h2>
                                                </div>
                                                <div className="icons-div">
                                                    <img
                                                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                                        alt={
                                                            weather.weather[0]
                                                                .description
                                                        }
                                                    />
                                                    <div className="h-l-div">
                                                        <h3>H: 22°</h3>
                                                        <h3>L: 12°</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="weather-condition">
                                                <div>
                                                    <strong
                                                        style={{
                                                            fontWeight: "800",
                                                        }}
                                                    >
                                                        🌡Feels like
                                                    </strong>
                                                    <h4>
                                                        {weather.main.temp}°C
                                                    </h4>
                                                </div>
                                                <div>
                                                    <strong
                                                        style={{
                                                            fontWeight: "800",
                                                        }}
                                                    >
                                                        💧Humidity
                                                    </strong>
                                                    <h4>
                                                        {weather.main.humidity}%
                                                    </h4>
                                                </div>
                                                <div>
                                                    <strong
                                                        style={{
                                                            fontWeight: "800",
                                                        }}
                                                    >
                                                        💨Wind Speed
                                                    </strong>
                                                    <h4>
                                                        {weather.wind.speed} m/s
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <Outlet />
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
                                <span class="material-symbols-outlined">
                                    house
                                </span>
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
                                <span class="material-symbols-outlined">
                                    map
                                </span>
                                <button>Map</button>
                            </Link>
                            <Link
                                to="/forecast"
                                onClick={() => setIsOpen(false)}
                                className="link-button"
                            >
                                <span class="material-symbols-outlined">
                                    cloud
                                </span>
                                <button>Forecast</button>
                            </Link>
                        </div>
                    </div>
                )}

                <h1
                    className="others-place-title"
                    style={{ color: lightTheme ? "black" : "white" }}
                >
                    Other's weather
                </h1>
                <div className="other-place-div">
                    <div>
                        {error && <p className="error-msg">{error}</p>}
                        {!weather && !error && (
                            <p className="error-msg">Loading weather...</p>
                        )}
                        {otherWeather.map((cityWeather) => (
                            <div
                                className="other-weather-main"
                                key={cityWeather.name}
                            >
                                <div className="other-weather-card">
                                    <h2>Weather in {cityWeather.name}</h2>
                                    <div className="weather-details">
                                        <p>
                                            <strong
                                                style={{ fontWeight: "800" }}
                                            >
                                                Condition:
                                            </strong>{" "}
                                            {cityWeather.weather[0].main}
                                        </p>
                                        <p>
                                            <strong
                                                style={{ fontWeight: "800" }}
                                            >
                                                Temp:
                                            </strong>{" "}
                                            🌡 {cityWeather.main.temp} °C
                                        </p>
                                        <p>
                                            <strong
                                                style={{ fontWeight: "800" }}
                                            >
                                                Humidity:
                                            </strong>{" "}
                                            💧 {cityWeather.main.humidity}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
