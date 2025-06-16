// TypeScript Weather App Starter Code
// This provides a starting point for your homework assignment

// These types are incomplete - you'll need to flesh them out!
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

// Simulated API functions - Convert these to TypeScript with proper types
// Replace callbacks with Promise-based implementations

function getUserLocation(userId: number): Promise<Location> {
  // TODO: Implement this function using Promises instead of callbacks
  // Use the same logic as the original getUserLocation but with Promises
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId < 0) {
        reject(new Error("Invalid user ID"));
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

      const location = locations[userId] || {
        city: "Unknown City",
        country: "Unknown Country",
        coordinates: { lat: 0, lon: 0 },
      };

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
        reject(new Error("Invalid coordinates"));
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
async function getWeatherReport(userId: number): Promise<WeatherReport> {
  try {
    const location = await getUserLocation(userId);

    const weatherData = await getWeatherData(location.coordinates);

    const report: WeatherReport = {
      location: location,
      weather: weatherData,
      summary: `The weather in ${location.city} is ${weatherData.conditions} with a temperature of ${weatherData.temperature}°C and ${weatherData.humidity}% humidity.`,
      timestamp: new Date().toISOString(),
    };

    return report;
  } catch (error) {
    console.error("Error getting weather report:", error);

    throw error;
  }
}

// Test the function
async function main() {
  try {
    console.log("Starting weather report generation...");
    const report = await getWeatherReport(1);

    console.log("\nWeather Report:");
    console.log(report.summary);
    console.log("\nFull report details:", report);
  } catch (error) {
    console.error("Error getting weather report:", error);
  }
}

main();
