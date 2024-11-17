"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/weather/current?city=stockholm`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Server error: ${response.statusText} (${response.status})`
          );
        }
        return response.json();
      })
      .then((data) => setWeatherData(data))
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err.message);
      });
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!weatherData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Current weather in Stockholm</h1>
      <p>Temperature: {weatherData.data.values.temperature}°C</p>
    </div>
  );
}
