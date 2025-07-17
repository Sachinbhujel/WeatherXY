import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Forecast({
    weather,
    isOpen,
    setIsOpen,
    lightTheme,
    setLightTheme,
    selectedDateWeather,
    selectedDate,
    setSelectedDate,
    fetchWeatherForDate,
}) {
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

    useEffect(() => {
        if (selectedDate) {
            console.log("Selected date:", selectedDate);
            fetchWeatherForDate(selectedDate);
        }
    }, [selectedDate, fetchWeatherForDate]);

     useEffect(() => {
            document.body.style.backgroundColor = lightTheme ? "white" : "black";
        }, [lightTheme]);

    return (
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
                            className="material-symbols-outlined"
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

            <h1
                className="tomorrow-title"
                style={{ color: lightTheme ? "black" : "white", marginTop: "64px"}}
            >
                7-Day Forecast
            </h1>

            <div className="next-day-button">
                {weekDates.map((date, index) => {
                    const isActive =
                        selectedDate &&
                        date.toDateString() === selectedDate.toDateString();
                    return (
                        <div
                            key={index}
                            className={
                                isActive ? "active-date-btn" : "default-btn"
                            }
                            style={
                                isActive
                                    ? {}
                                    : {
                                          backgroundColor: lightTheme
                                              ? "black"
                                              : "white",
                                          color: lightTheme ? "white" : "black",
                                      }
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
                            🌤 Weather for {weather?.name} on{" "}
                            {selectedDate.toLocaleDateString("en-GB")}
                        </h2>
                        <div className="weather-details">
                            <div className="weather-details-detail">
                                <strong style={{fontWeight: "800"}}>Condition:</strong>{" "}
                                <h4>
                                    {
                                        selectedDateWeather.weather[0]
                                            .description
                                    }
                                </h4>
                            </div>
                            <div className="weather-details-detail">
                                <strong style={{fontWeight: "800"}}>Temp:</strong>{" "}
                                <h4>
                                    {selectedDateWeather.main.temp} °C
                                </h4>
                            </div>
                            <div className="weather-details-detail">
                                <strong style={{fontWeight: "800"}}>Humidity:</strong>{" "}
                                <h4>
                                    {selectedDateWeather.main.humidity}%
                                </h4>
                            </div>
                            <div className="weather-details-detail">
                                <strong style={{fontWeight: "800"}}>Wind Speed:</strong>{" "}
                                <h4>
                                    {selectedDateWeather.wind.speed} m/s
                                </h4>
                            </div>
                            <div className="weather-details-detail">
                                <strong style={{fontWeight: "800"}}>Pressure:</strong>{" "}
                                <h4>
                                    {selectedDateWeather.main.pressure} hPa
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="err-div">
                    <div className="err-details">
                        <p className="err-msg">
                            Weather data unavailable for the selected date
                        </p>
                    </div>
                </div>
            )}
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
        </div>
    );
}

export default Forecast;
