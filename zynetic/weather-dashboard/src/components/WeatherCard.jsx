export default function WeatherCard({ data }) {
  const { name, main, weather, wind } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="card">
      <h2>{name}</h2>

      {/* Weather icon */}
      <img
        src={iconUrl}
        alt={weather[0].description}
        style={{ width: "100px", height: "100px" }}
      />

      <div className="weather-grid">
        <p><strong>Condition:</strong> {weather[0].description}</p>
        <p><strong>Temp:</strong> {main.temp} °C</p>
        <p><strong>Feels like:</strong> {main.feels_like} °C</p>
        <p><strong>Humidity:</strong> {main.humidity}%</p>
        <p><strong>Wind:</strong> {wind.speed} m/s</p>
      </div>
    </div>
  );
}
