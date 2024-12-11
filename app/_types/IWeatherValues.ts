interface WeatherValues {
    cloudBase: number;
    cloudCeiling: number | null;
    cloudCover: number;
    dewPoint: number;
    freezingRainIntensity: number;
    humidity: number;
    precipitationProbability: number;
    pressureSurfaceLevel: number;
    rainIntensity: number;
    sleetIntensity: number;
    snowIntensity: number;
    temperature: number;
    temperatureApparent: number;
    uvHealthConcern: number;
    uvIndex: number;
    visibility: number;
    weatherCode: number;
    windDirection: number;
    windGust: number;
    windSpeed: number;
  }
  
  interface WeatherDataDetails {
    time: string;
    values: WeatherValues;
  }
  
  interface WeatherLocation {
    lat: number;
    lon: number;
    name: string;
    type: string;
  }
  
  export interface WeatherApiResponse {
    data: WeatherDataDetails;
    location: WeatherLocation;
  }