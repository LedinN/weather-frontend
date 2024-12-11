import { WeatherApiResponse } from "../_types/IWeatherValues";
import { WeatherDataForecastDTO } from "../_types/IWeatherForecastValues";
import { UserProfile} from "../_types/IUserProfile";
import { PromoteResponse } from "../_types/IPromoteResponse";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const apiService = {

    async login(username: string, password: string): Promise<string> {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
    
        const response = await fetch(`${BASE_URL}/api/user/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Failed to log in');
        }
    
        return response.text();
      },

    async whoAmI(): Promise<UserProfile> {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No token found. User is not authenticated.");
        }
    
        const response = await fetch(`${BASE_URL}/api/user/who-am-i`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.error || "Failed to fetch user information.");
        }
    
        return response.json();
      },

  async promoteToAdmin(userId: number): Promise<PromoteResponse> {
    const response = await fetch(`${BASE_URL}/api/user/promote/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json();
  },

  async deleteUser(userId: number): Promise<{message: string}> {
    const response = await fetch(`${BASE_URL}/api/user/delete/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json();
  },

  async changePassword(userId: number, newPassword: string): Promise<{ message: string}> {
    const response = await fetch(`${BASE_URL}/api/user/change-password/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ newPassword }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json();
  },

  async fetchAllUsers(): Promise<UserProfile[]> {
    const response = await fetch(`${BASE_URL}/api/user/fetchallusers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json();
  },

  async logout(): Promise<void> {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No token found. User is already logged out.");
    }
  
    await fetch(`${BASE_URL}/api/user/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    localStorage.removeItem("authToken");
  
    window.dispatchEvent(new StorageEvent("storage", { key: "authToken" }));
  },
  
    async getWeather(city: string, token: string): Promise<WeatherApiResponse> {
      const response = await fetch(`${BASE_URL}/weather/current?location=${city}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Error: ${response.status} ${response.statusText}`);
      }
  
      return response.json();
    },

    async getForecast(city: string, token: string): Promise<WeatherDataForecastDTO> {
        const response = await fetch(
          `${BASE_URL}/weather/forecast?location=${city}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || `Error: ${response.status} ${response.statusText}`);
        }
      
        return response.json();
      },

}
export default apiService;