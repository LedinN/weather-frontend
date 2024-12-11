export interface WeatherForecastValues {
    temperatureAvg: number;
    windSpeedAvg: number;
    weatherCodeMax: number;
    cloudCoverAvg: number;
    precipitationProbabilityAvg: number;
  }
  
  export interface WeatherForecastDay {
    time: string;  
    values: WeatherForecastValues;  
  }
  
  export interface WeatherForecastTimeline {
    daily: WeatherForecastDay[];  
  }
  
  export interface WeatherForecastLocation {
    lat: number;  
    lon: number;   
    name: string; 
    type: string; 
  }
  
  export interface WeatherDataForecastDTO {
    timelines: WeatherForecastTimeline; 
    location: WeatherForecastLocation;  
  }