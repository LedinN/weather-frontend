'use client';

import { useEffect, useState } from 'react';

export default function Currentweather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const city = 'stockholm';

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          `https://localhost:8443/weather/current?city=${city}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Error: ${response.status} {response.statusText');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (e) {
        setError(e.message);
      }
    }
    fetchWeather();
  }, []);

  return (
    <main>
      <p>Current Weather</p>
      <div>
        <p>Temperature: {weatherData?.data.values.temperature}</p>
      </div>
    </main>
  );
}
