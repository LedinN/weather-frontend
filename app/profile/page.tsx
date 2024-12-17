"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiService from "../services/apiService";
import { IUser } from "../types/IUser";

export default function ProfilePage() {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiService.whoAmI();
        setUser(data);
      } catch {
        router.push("/sign-in");
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("authToken");
      alert("You have been logged out.");
      router.push("/sign-in");
    } catch (error) {
      alert("An unexpected error occurred during logout.");
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Profile</h1>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Role:</strong> {user.role || "Unknown"}
        </p>
        <p>
          <strong>User ID:</strong> {user.id ?? "No ID available"}
        </p>
        {user.role === "ADMIN" && (
          <button
            onClick={() => router.push("/admin")}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Admin Panel
          </button>
        )}
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
