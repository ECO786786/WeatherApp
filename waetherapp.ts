// TypeScript Weather App Starter Code
// This provides a starting point for your homework assignment

// These types are incomplete - you'll need to flesh them out!
enum TemperatureUnit {
  Celsius = "C",
  Fahrenheit = "F",
}

interface Coordinates {
  lat: number;
  lon: number;
}

interface Location {
  // TODO: Add properties
  city: string;
  country: string;
  coordinates: Coordinates;
}

interface Weather {
  // TODO: Add properties
  temperature: number;
  conditions: string;
  humidity: number;
}

interface WeatherReport {
  location: Location;
  weather: Weather;
  summary: string;
  timestamp: string;
}

interface WeatherReport {
  location: Location;
  weather: Weather;
  summary: string;
  timestamp: string;
  unit: TemperatureUnit;
}

class WeatherAppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WeatherAppError";
    Object.setPrototypeOf(this, WeatherAppError.prototype);
  }
}

class LocationError extends WeatherAppError {
  constructor(message: string) {
    super(message);
    this.name = "LocationError";
    Object.setPrototypeOf(this, LocationError.prototype);
  }
}

class WeatherDataError extends WeatherAppError {
  constructor(message: string) {
    super(message);
    this.name = "WeatherDataError";
    Object.setPrototypeOf(this, WeatherDataError.prototype);
  }
}

class InvalidInputError extends WeatherAppError {
  constructor(message: string) {
    super(message);
    this.name = "InvalidInputError";
    Object.setPrototypeOf(this, InvalidInputError.prototype);
  }
}

function convertTemperature(value: number, toUnit: TemperatureUnit): number {
  if (toUnit === TemperatureUnit.Fahrenheit) {
    return (value * 9) / 5 + 32;
  } else {
    return ((value - 32) * 5) / 9;
  }
}

// Simulated API functions - Convert these to TypeScript with proper types
// Replace callbacks with Promise-based implementations

function getUserLocation(userId: number): Promise<Location> {
  // TODO: Implement this function using Promises instead of callbacks
  // Use the same logic as the original getUserLocation but with Promises
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId < 0) {
        reject(new InvalidInputError("User ID must be a non-negative number."));
        return;
      }

      const locations = {
        1: {
          city: "New York",
          country: "USA",
          coordinates: { lat: 40.7128, lon: -74.006 },
        },
        2: {
          city: "London",
          country: "UK",
          coordinates: { lat: 51.5074, lon: -0.1278 },
        },
        3: {
          city: "Tokyo",
          country: "Japan",
          coordinates: { lat: 35.6762, lon: 139.6503 },
        },
      };

      const location = locations[userId];

      if (!location) {
        reject(new LocationError(`No location found for user ID ${userId}.`));
        return;
      }

      resolve(location);
    }, 1000);
  });
}

function getWeatherData(coordinates: Coordinates): Promise<Weather> {
  // TODO: Implement this function using Promises instead of callbacks
  // Use the same logic as the original getWeatherData but with Promises

  const { lat, lon } = coordinates;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (lat === 0 && lon === 0) {
        reject(new WeatherDataError("Invalid coordinates"));
        return;
      }

      let weather: Weather;
      if (lat > 35) {
        weather = {
          temperature: Math.floor(Math.random() * 10) + 15,
          conditions: "Partly Cloudy",
          humidity: Math.floor(Math.random() * 20) + 60,
        };
      } else {
        weather = {
          temperature: Math.floor(Math.random() * 10) + 25,
          conditions: "Sunny",
          humidity: Math.floor(Math.random() * 20) + 40,
        };
      }

      resolve(weather);
    }, 1000);
  });
}

// Implement the async/await version of getWeatherReport
async function getWeatherReport(
  userId: number,
  unit: TemperatureUnit = TemperatureUnit.Celsius
): Promise<WeatherReport> {
  try {
    const location = await getUserLocation(userId);
    const weatherData = await getWeatherData(location.coordinates);

    const convertedTemperature =
      unit === TemperatureUnit.Celsius
        ? weatherData.temperature
        : convertTemperature(
            weatherData.temperature,
            TemperatureUnit.Fahrenheit
          );

    const summary = `The weather in ${location.city} is ${
      weatherData.conditions
    } with a temperature of ${convertedTemperature.toFixed(1)}°${unit} and ${
      weatherData.humidity
    }% humidity.`;

    return {
      location,
      weather: {
        ...weatherData,
        temperature: convertedTemperature,
      },
      summary,
      timestamp: new Date().toISOString(),
      unit,
    };
  } catch (error) {
    if (error instanceof LocationError) {
      console.error("Location Error:", error.message);
    } else if (error instanceof WeatherDataError) {
      console.error("Weather Data Error:", error.message);
    } else if (error instanceof InvalidInputError) {
      console.error("Invalid Input:", error.message);
    } else {
      console.error("Unknown Error:", error);
    }
    throw error;
  }
}

// Test the function
async function main() {
  try {
    console.log("Starting weather report generation (Celsius)...");
    const reportC = await getWeatherReport(1, TemperatureUnit.Celsius);
    console.log("\nWeather Report (Celsius):");
    console.log(reportC.summary);

    console.log("\nStarting weather report generation (Fahrenheit)...");
    const reportF = await getWeatherReport(1, TemperatureUnit.Fahrenheit);
    console.log("\nWeather Report (Fahrenheit):");
    console.log(reportF.summary);
  } catch (error) {
    console.error("Error getting weather report:", error);
  }
}

main();
