import axiosInstance from "./axiosInstance";
import { WeatherApiResponse } from "../types/IWeatherValues";
import { WeatherDataForecastDTO } from "../types/IWeatherForecastValues";
import { IUser } from "../types/IUser";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface PromoteResponse { message: string; }

export const apiService = {
    async login(username: string, password: string): Promise<string> {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
    
        const response = await axiosInstance.post('/api/user/login', params.toString(), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return response.data;
      },

    async whoAmI(): Promise<IUser> {
        const response = await axiosInstance.get('/api/user/who-am-i')
        return response.data;
    },
    
  async promoteToAdmin(userId: number): Promise<PromoteResponse> {
    const response = await axiosInstance.put(`/api/user/promote/${userId}`)
    return response.data;
  },

  async deleteUser(userId: number): Promise<{ message: string }> {
    const response = await axiosInstance.delete(`/api/user/delete/${userId}`);
    return response.data;
  },

  async changePassword(userId: number, newPassword: string): Promise<{ message: string }> {
    const response = await axiosInstance.put(`/api/user/change-password/${userId}`, { newPassword });
    return response.data;
  },

  async fetchAllUsers(): Promise<IUser[]> {
    const response = await axiosInstance.get('/api/user/fetchallusers');
    return response.data;
  },

  async logout(): Promise<void> {
    await axiosInstance.post('/api/user/logout');
    localStorage.removeItem('authToken');
    window.dispatchEvent(new StorageEvent("storage", { key: "authToken" }));
  },
  
  async getWeather(city: string, token: string): Promise<WeatherApiResponse> {
    const response = await axiosInstance.get(`/weather/current?location=${city}`);
    return response.data;
  },

  async getForecast(city: string, token: string): Promise<WeatherDataForecastDTO> {
    const response = await axiosInstance.get(`/weather/forecast?location=${city}`);
    return response.data;
  }
};
export default apiService;