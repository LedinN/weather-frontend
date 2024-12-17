"use client";

import { useEffect, useState } from "react";
import apiService from "../services/apiService";
import Image from "next/image";
import {
  WeatherDataForecastDTO,
  WeatherForecastDay,
} from "../types/IWeatherForecastValues";

export default function ForecastWeather() {
  const [locations, setLocations] = useState<
    { city: string; forecastData: WeatherDataForecastDTO | null }[]
  >([]);
  const [city, setCity] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  const fetchForecast = async (
    city: string
  ): Promise<WeatherDataForecastDTO | null> => {
    if (!token) return null;

    try {
      const data = await apiService.getForecast(city, token);
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
    if (
      !city ||
      locations.some((loc) => loc.city.toLowerCase() === city.toLowerCase())
    ) {
      setError("City already added or invalid.");
      return;
    }

    setError(null);
    const data = await fetchForecast(city);
    if (data) {
      setLocations((prev) => [...prev, { city, forecastData: data }]);
      setCity("");
    }
  };

  const determineIcon = (forecastDay: WeatherForecastDay): string => {
    if (!forecastDay.values) return "/icons/Sunny.webp"; // Fallback for missing values
    const { cloudCoverAvg, precipitationProbabilityAvg } = forecastDay.values;

    if (precipitationProbabilityAvg > 0) return "/icons/Rainy.webp";
    if (cloudCoverAvg > 20) return "/icons/Cloudy.webp";
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

      <div className="space-y-6">
        {locations.map((loc, index) => (
          <div key={index} className="space-y-4">
            <p className="font-bold text-lg capitalize">{loc.city}</p>
            <div className="grid grid-cols-7 gap-4">
              {loc.forecastData?.timelines.daily.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className="p-4 border rounded-md shadow-md flex flex-col items-center"
                >
                  <p>{new Date(day.time).toLocaleDateString()}</p>
                  <Image
                    src={determineIcon(day)}
                    alt="Weather Icon"
                    width={64}
                    height={64}
                  />
                  {day.values ? (
                    <>
                      <p>Temp: {day.values.temperatureAvg}°C</p>
                      <p>Wind: {day.values.windSpeedAvg} m/s</p>
                    </>
                  ) : (
                    <p>No data available</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
