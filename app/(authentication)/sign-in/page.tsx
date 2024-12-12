'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import apiService from '../../services/apiService';

export default function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    try {
      const token = await apiService.login(username, password);
      localStorage.setItem('authToken', token);
      console.log('Logged in successfully');
      router.push('/currentweather');

      window.dispatchEvent(new StorageEvent('storage', { key: 'authToken' }));
    } catch (error) {
      if (error instanceof Error){
      console.error('Login error: ', error);
      setMessage('Login failed: ' + error.message);
    }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>
        {message && (
          <p className="mb-4 text-center text-red-600">
            {message}
          </p>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">Not registered?</p>
          <button
            onClick={() => router.push('/sign-up')}
            className="mt-2 px-4 py-2 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}
