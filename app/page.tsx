import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Welcome to Weather App</h1>
        <p className="text-gray-600 text-lg mb-8">
          Get accurate and up-to-date weather information at your fingertips.
        </p>
      </div>
      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        <Link
          href="/currentweather"
          className="w-full py-3 text-lg font-medium text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none transition"
        >
          Current Weather
        </Link>
        <Link
          href="/forecast"
          className="w-full py-3 text-lg font-medium text-white bg-green-500 rounded-lg shadow hover:bg-green-600 focus:ring-4 focus:ring-green-300 focus:outline-none transition"
        >
          Weather Forecast
        </Link>
      </div>
    </div>
  );
}
