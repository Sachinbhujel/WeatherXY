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
}) {
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

    console.log(weather);

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
                                class="material-symbols-outlined"
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
                        <h1>Weather Forecast</h1>
                        <p>
                            Current weather and 7-day forecast for your location
                        </p>
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
                                                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
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
                                                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
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
                                                <h4>
                                                    <strong style={{fontWeight: "800"}}>🌡Feels like</strong>
                                                    {weather.main.temp}°C
                                                </h4>
                                                <h4>
                                                    <strong style={{fontWeight: "800"}}>💧Humidity</strong>
                                                    {weather.main.humidity}%
                                                </h4>
                                                <h4>
                                                    <strong style={{fontWeight: "800"}}>
                                                        💨Wind Speed
                                                    </strong>
                                                    {weather.wind.speed} m/s
                                                </h4>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <h1 className="tomorrow-title">7-Day Forecast</h1>
                    <div className="next-day-button">
                        {weekDates.map((date, index) => {
                            const isActive =
                                date.toDateString() ===
                                selectedDate.toDateString();
                            return (
                                <div
                                    key={index}
                                    className={
                                        isActive
                                            ? "active-date-btn"
                                            : "default-btn"
                                    }
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
                        <div className="weather-div tomorrow-div">
                            <div className="tomorrow-weather-details">
                                <h2>
                                    🌤 Weather for {weather.name} on{" "}
                                    {selectedDate.toLocaleDateString("en-GB")}
                                </h2>
                                <div className="weather-details">
                                    <p className="weather-details-detail">
                                        <strong style={{fontWeight: "800"}}>Condition:</strong>{" "}
                                        {
                                            selectedDateWeather.weather[0]
                                                .description
                                        }
                                    </p>
                                    <p className="weather-details-detail">
                                        <strong style={{fontWeight: "800"}}>Temp:</strong> 🌡{" "}
                                        {selectedDateWeather.main.temp} °C
                                    </p>
                                    <p className="weather-details-detail">
                                        <strong style={{fontWeight: "800"}}>Humidity:</strong> 💧{" "}
                                        {selectedDateWeather.main.humidity}%
                                    </p>
                                    <p className="weather-details-detail">
                                        <strong style={{fontWeight: "800"}}>Wind Speed:</strong> 💨{" "}
                                        {selectedDateWeather.wind.speed} m/s
                                    </p>
                                    <p className="weather-details-detail">
                                        <strong style={{fontWeight: "800"}}>Pressure:</strong>{" "}
                                        {selectedDateWeather.main.pressure} hPa
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="err-div">
                            <div className="err-details">
                                <p className="err-msg">
                                    Weather data unavailable for the selected
                                    date
                                </p>
                            </div>
                        </div>
                    )}

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
                        </div>
                    </div>
                )}
                
                <h1 className="others-place-title">Other's weather</h1>
                <div className="other-place-div">
                    <div>
                        {error && <p className="error-msg">{error}</p>}
                        {!weather && !error && (
                            <p className="error-msg">Loading weather...</p>
                        )}
                        {otherWeather.map((cityWeather) => (
                            <div className="other-weather-main">
                                <div
                                    className="other-weather-card"
                                    key={cityWeather.id}
                                >
                                    <h2>Weather in {cityWeather.name}</h2>
                                    <div className="weather-details">
                                        <p>
                                            <strong style={{fontWeight: "800"}}>Condition:</strong>{" "}
                                            {cityWeather.weather[0].main}
                                        </p>
                                        <p>
                                            <strong style={{fontWeight: "800"}}>Temp:</strong> 🌡{" "}
                                            {cityWeather.main.temp} °C
                                        </p>
                                        <p>
                                            <strong style={{fontWeight: "800"}}>Humidity:</strong> 💧{" "}
                                            {cityWeather.main.humidity}%
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
