import React, { useState } from "react";

function Map() {
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
                    <img
                        src="https://icons.veryicon.com/png/o/miscellaneous/business-bicolor-icon/weather-109.png"
                        alt="Weather Illustration"
                        className="default-img"
                    />
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

            {searchCity && (
          <div className="map-container" style={{ marginTop: '20px' }}>
            <iframe
              title="Google Map"
              width="100%"
              height="500"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${encodeURIComponent(searchCity)}&output=embed`}
            ></iframe>
          </div>
        )}
        </>
    );
}

export default Map;
