"use client";

import { useEffect, useState } from "react";
import { WeatherApiResponse } from "../types/IWeatherValues";
import Image from 'next/image'
import apiService from "../services/apiService";

export default function CurrentWeather() {
  const [locations, setLocations] = useState<
    { city: string; weatherData: WeatherApiResponse | null }[]
  >([]);
  const [city, setCity] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  const fetchWeather = async (city: string): Promise<WeatherApiResponse | null> => {
    if (!token) return null;

    try {
      const data = await apiService.getWeather(city, token);
      return data;
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred");
      }
      return null;
    }
  };

  const handleAddLocation = async () => {
    if (!city || locations.some((loc) => loc.city.toLowerCase() === city.toLowerCase())) {
      setError("City already added or invalid.");
      return;
    }

    setError(null); 
    const data = await fetchWeather(city);
    if (data) {
      setLocations((prev) => [...prev, { city, weatherData: data }]);
      setCity("");
    }
  };

  const determineIcon = (data: WeatherApiResponse): string => {
    const { cloudCover, precipitationProbability } = data.data.values;

    if (precipitationProbability > 0) return "/icons/Rainy.webp";
    if (cloudCover > 20) return "/icons/Cloudy.webp";
    return "/icons/Sunny.webp";
  };

  return (
    <main className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border rounded-md"
        />
        <button
          onClick={handleAddLocation}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Location
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((loc, index) => (
          <div
            key={index}
            className="p-4 border rounded-md shadow-md bg-gray-100 flex flex-col items-center"
          >
            <p className="font-bold text-lg capitalize">{loc.city}</p>
            {loc.weatherData && (
              <>
                <Image
                  src={determineIcon(loc.weatherData)}
                  alt="Weather Icon"
                  width={64}
                  height={64}
                />
                <p>Temperature: {loc.weatherData.data.values.temperature}°C</p>
                <p>Wind Speed: {loc.weatherData.data.values.windSpeed} m/s</p>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
