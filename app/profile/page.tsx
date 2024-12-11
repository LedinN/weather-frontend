"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiService from "../services/apiService";

export default function ProfilePage() {
  const [user, setUser] = useState<{
    username: string;
    role: string;
    id: number;
  } | null>(null);
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

  const handleLogout = async () => {
    try {
      await apiService.logout();
      alert("You have been logged out.");
      router.push("/sign-in");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred.");
      }
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
          <strong>User ID:</strong> {user.id}
        </p>
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
