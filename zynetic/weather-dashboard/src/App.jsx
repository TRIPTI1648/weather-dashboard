
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';
import './App.css';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]); 

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async (customCity) => {
    const cityToFetch = customCity || city;
    if (!cityToFetch) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityToFetch}&appid=${apiKey}&units=metric`
      );
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
      setWeatherData(data);
      setError(null);

      // Add to history (prevent duplicates)
      setSearchHistory((prev) => {
        const updated = [cityToFetch, ...prev.filter((c) => c.toLowerCase() !== cityToFetch.toLowerCase())];
        return updated.slice(0, 5); 
      });

    } catch (err) {
      setWeatherData(null);
      setError('City not found. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => fetchWeather(city);
  const handleHistoryClick = (city) => {
    setCity(city);
    fetchWeather(city);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <div className="theme-toggle">
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </label>
      </div>

      <h1>Weather Dashboard</h1>
      <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />

      {/* Recent History */}
      {searchHistory.length > 0 && (
        <div className="history">
          <h4>Recent Searches:</h4>
          <div className="history-list">
            {searchHistory.map((item, idx) => (
              <button key={idx} onClick={() => handleHistoryClick(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && <Loader />}
      {!loading && error && <p className="error">{error}</p>}
      {!loading && weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}
