import React, { useState } from "react";
import { Link } from "react-router-dom";

function Map({ isOpen, setIsOpen }) {
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
                    <h2>
                        Weather<span className="xy">XY</span>
                    </h2>
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

            {searchCity && (
                <div className="map-container" style={{ marginTop: "20px" }}>
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
