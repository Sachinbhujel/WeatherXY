import React, { useCallback, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Map from "./Map";
import Website_open from "./Website-open";
import Forecast from "./Forecast";

function App() {
    const [city, setCity] = useState("");
    const [localWeather, setLocalWeather] = useState(null);
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    const [lightTheme, setLightTheme] = useState(false);
    const WEATHER_API_KEY = "6ba708951b97b015a56ca7ec30d18cf5";

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 700);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        fetch("https://ipinfo.io/json?token=d0666e8c70b5f8")
            .then((res) => res.json())
            .then((location) => {
                const localCity = location.city;
                if (localCity) {
                    fetch(
                        `https://api.openweathermap.org/data/2.5/weather?q=${localCity}&appid=${WEATHER_API_KEY}&units=metric`
                    )
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.cod === 200) {
                                setLocalWeather(data);
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

    // Ensure city is set from weather if not manually set
    useEffect(() => {
        if (!city && weather?.name) {
            setCity(weather.name);
        }
    }, [weather]);

    useEffect(() => {
        if (!city) return;
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
            })
            .catch(() => {
                setError("Error fetching weather.");
                setWeather(null);
            });
    }, [city]);

    const [selectedDateWeather, setSelectedDateWeather] = useState(null);

    const fetchWeatherForDate = useCallback((date) => {
    const cityName = city || weather?.name;
    if (!cityName) return;

    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`
    )
        .then((res) => res.json())
        .then((data) => {
            if (data.cod === "200") {
                const forecastData = data.list.filter((item) => {
                    const itemDate = new Date(item.dt * 1000);
                    return (
                        itemDate.getDate() === date.getDate() &&
                        itemDate.getMonth() === date.getMonth() &&
                        itemDate.getFullYear() === date.getFullYear()
                    );
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
}, [city, weather]);

    const [selectedDate, setSelectedDate] = useState(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    });

    return (
        <>
            {showSplash ? (
                <Website_open />
            ) : (
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home
                                    weather={localWeather}
                                    error={error}
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                    lightTheme={lightTheme}
                                    setLightTheme={setLightTheme}
                                    fetchWeatherForDate={fetchWeatherForDate}
                                />
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <Dashboard
                                    setCity={setCity}
                                    weather={weather}
                                    error={error}
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                    lightTheme={lightTheme}
                                    setLightTheme={setLightTheme}
                                />
                            }
                        />
                        <Route
                            path="/map"
                            element={
                                <Map
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                    lightTheme={lightTheme}
                                    setLightTheme={setLightTheme}
                                />
                            }
                        />
                        <Route
                            path="/forecast"
                            element={
                                <Forecast
                                    weather={weather}
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                    lightTheme={lightTheme}
                                    setLightTheme={setLightTheme}
                                    selectedDateWeather={selectedDateWeather}
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                    fetchWeatherForDate={fetchWeatherForDate}
                                />
                            }
                        />
                    </Routes>
                </BrowserRouter>
            )}
        </>
    );
}

export default App;
