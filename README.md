# 🌤️ TypeScript Weather App

This is a TypeScript application that simulates fetching weather data for a user based on their location, with optional temperature unit conversion.

## 🚀 How to Run

1. Clone the repo
2. Install dependencies:

```bash
npm init -y
npm install typescript --save-dev
npx tsc --init
```

```bash
run npx tsc
```

## Type Design Decisions

TemperatureUnit enum: Created to handle unit conversion cleanly (C or F).

Structured WeatherReport, Location, and Weather interfaces for clarity and strong typing.

## Challenges

Add a feature to get a 3-day forecast

Add location caching with a timeout

Modular files
