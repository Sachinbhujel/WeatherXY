import React, { useState } from "react";
import { Link } from "react-router-dom";

function Map({ isOpen, setIsOpen, lightTheme, setLightTheme }) {
    const [city, setCity] = useState("");
    const [searchCity, setSearchCity] = useState("");

    const handleSearch = () => {
        if (city.trim()) {
            setSearchCity(city);
        }
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
            </div>
            
            <div className="search-div">
            <div className="weather-search-div">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name......"
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

            {searchCity && (
                <div className="map-container" style={{ marginTop: "30px" }}>
                    <iframe
                        title="Google Map"
                        width="100%"
                        height="500"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        src={`https://www.google.com/maps?q=${encodeURIComponent(
                            searchCity
                        )}&output=embed`}
                    ></iframe>
                </div>
            )}
        </>
    );
}

export default Map;
