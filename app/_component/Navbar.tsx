"use client";

import LinkComponent from "./ui-elements/LinkComponent";
import { useEffect, useState } from "react";
import apiService from "../services/apiService";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const updateAuthState = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          await apiService.whoAmI(); // Verify token validity
          setIsAuthenticated(true);
        } catch {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    updateAuthState();

    const handleStorageChange = () => {
      updateAuthState(); // Update authentication state when localStorage changes
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <nav className="bg-blue-400 fixed top-0 left-0 w-full z-50">
      <ul className="text-2xl p-4 flex justify-between">
        <div className="flex space-x-4">
          <LinkComponent url="/" text="Home" />
          <LinkComponent url="/currentweather" text="Current" />
          <LinkComponent url="/forecastweather" text="Forecast" />
        </div>
        <div className="flex items-center">
          {isAuthenticated ? (
            <LinkComponent url="/profile" text="Profile" />
          ) : (
            <LinkComponent url="/sign-in" text="Sign In" />
          )}
        </div>
      </ul>
    </nav>
  );
}
