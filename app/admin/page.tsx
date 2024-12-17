'use client';
import { useState, useEffect } from 'react';
import { apiService } from "../services/apiService";
import { IUser } from '../types/IUser';

export default function AdminPage() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [passwords, setPasswords] = useState<Record<number, string>>({});

    useEffect(() => {
        
        apiService.fetchAllUsers()
            .then((data) => setUsers(data))
            .catch((error) => alert(error.message));
    }, []);

    const handlePromoteToAdmin = async (userId: number) => {
        try {
            await apiService.promoteToAdmin(userId);
            alert("User promoted to admin successfully!");
            refreshUsers();
        } catch (error) {
            if (error instanceof Error) {
            alert(error.message);
        } else {
            alert("Unexpected error occurred")
        }
        }
    };

    const handleDelete = async (userId: number) => {
        try {
            await apiService.deleteUser(userId);
            alert("User deleted successfully!");
            refreshUsers();
        } catch (error) {
            if (error instanceof Error) {
            alert(error.message);
        } else {
            alert("Unexpected error occurred")
        }
        }
    };

    const handleChangePassword = async (userId: number) => {
        const newPassword = passwords[userId];
        if (!newPassword) {
            alert("Please enter a new password.");
            return;
        }

        try {
            await apiService.changePassword(userId, newPassword);
            alert("Password updated successfully!");
            setPasswords((prev) => ({ ...prev, [userId]: "" }));
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            } else {
                alert("An unexpected error occurred")
            }
        }
    };

    const refreshUsers = async () => {
        try {
            const data = await apiService.fetchAllUsers();
            setUsers(data);
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("An unexpected error occurred");
            }
        }
    };

    const handlePasswordInputChange = (userId: number, value: string) => {
        setPasswords((prev) => ({ ...prev, [userId]: value }));
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 px-4 min-h-screen pt-20">
            {/* Admin Panel */}
            <div className="w-full max-w-5xl p-4 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    Admin Panel
                </h1>
            </div>

            <div className="w-full max-w-5xl p-4 bg-white rounded-lg shadow-md mt-2">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border-b border-r border-gray-300 p-2 text-left text-gray-800">Username</th>
                                <th className="border-b border-r border-gray-300 p-2 text-left text-gray-800">Role</th>
                                <th className="border-b p-2 text-left text-gray-800">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
  {users.map((user) => {
    const userWithId = user as IUser & { id: number }; // Temporarily cast to include `id`
    return (
      <tr key={userWithId.id} className="hover:bg-gray-50">
        <td className="border-b border-r border-gray-300 p-2 text-sm">{userWithId.username}</td>
        <td className="border-b border-r border-gray-300 p-2 text-sm font-bold">{userWithId.role}</td>
        <td className="border-b p-2">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <input
                type="password"
                placeholder="Change Password"
                value={passwords[userWithId.id] || ""}
                onChange={(e) =>
                  handlePasswordInputChange(userWithId.id, e.target.value)
                }
                className="border px-3 py-1 rounded-md focus:outline-none text-sm w-full sm:w-auto"
              />
              <button
                className="text-sm px-4 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none flex-shrink-0"
                onClick={() => handleChangePassword(userWithId.id)}
              >
                Change
              </button>
            </div>
            <div className="flex-shrink-0">
              {userWithId.role !== "ADMIN" ? (
                <button
                  className="min-w-[150px] px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none text-sm"
                  onClick={() => handlePromoteToAdmin(userWithId.id)}
                >
                  Promote to Admin
                </button>
              ) : (
                <button
                  className="min-w-[150px] px-4 py-1 bg-gray-200 text-gray-500 rounded-md cursor-not-allowed text-sm"
                  disabled
                >
                  Already Admin
                </button>
              )}
            </div>
            <button
              className="text-lg font-bold text-white bg-red-500 w-12 h-12 rounded-md flex items-center justify-center hover:bg-red-600 focus:outline-none flex-shrink-0"
              onClick={() => handleDelete(userWithId.id)}
            >
              X
            </button>
          </div>
        </td>
      </tr>
    );
  })}
</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
