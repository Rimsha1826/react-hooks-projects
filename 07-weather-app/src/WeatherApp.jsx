import { useState, useEffect, useRef } from "react";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (window.innerWidth > 768) {
      inputRef.current.focus();
    }
  }, []);

  async function fetchWeather() {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found. Please try again.");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") fetchWeather();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex flex-col items-center justify-start md:justify-center px-4 py-16 overflow-x-hidden">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 w-full max-w-md text-white">
        <h1 className="text-3xl font-bold text-center mb-8">🌤️ Weather App</h1>

        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full px-4 py-3 rounded-xl bg-white/30 placeholder-white/70 text-white outline-none focus:bg-white/40"
          />
          <button
            onClick={fetchWeather}
            className="w-full sm:w-auto bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition"
          >
            Search
          </button>
        </div>

        {loading && (
          <p className="text-center text-white/80">Fetching weather...</p>
        )}

        {error && (
          <p className="text-center text-red-200 bg-red-500/30 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        {weather && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-1">
              {weather.name}, {weather.sys.country}
            </h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="mx-auto w-24 h-24"
            />
            <p className="text-6xl font-bold mb-2">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="text-lg capitalize mb-6">
              {weather.weather[0].description}
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/20 rounded-2xl p-3">
                <p className="text-xs opacity-70">Feels Like</p>
                <p className="text-lg font-bold">
                  {Math.round(weather.main.feels_like)}°C
                </p>
              </div>
              <div className="bg-white/20 rounded-2xl p-3">
                <p className="text-xs opacity-70">Humidity</p>
                <p className="text-lg font-bold">{weather.main.humidity}%</p>
              </div>
              <div className="bg-white/20 rounded-2xl p-3">
                <p className="text-xs opacity-70">Wind</p>
                <p className="text-lg font-bold">{weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;