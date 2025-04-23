# Weather App (Next.js)

A modern, robust weather application with:
- **Live weather data** (OpenWeatherMap, Open-Meteo)
- **Animated weather icons**
- **Air Quality Index (AQI) & UV Index**
- **Sunrise/Sunset, Pressure, Visibility, Wind, etc.**
- **Hourly and 7-day forecast charts** (toggle)
- **Geolocation** (current location weather)
- **Autocomplete city search**
- **Favorites & Recent searches** (local persistence)
- **Live weather radar map** (Leaflet + OpenWeatherMap)
- **Dark/Light mode** (toggle, accessible)
- **Mobile-first, responsive design**
- **SEO & PWA support**
- **Accessibility & keyboard navigation**
- **Code splitting/lazy loading for performance**
- **Unit test foundation (Jest, Testing Library)**

## Getting Started

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` with your OpenWeatherMap API key:
   ```env
   NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_api_key_here
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

## Testing
Run tests with:
```bash
npm test
```

## Build for Production
```bash
npm run build && npm start
```

## Features
- Add, remove, and quickly access favorite cities
- See recent searches
- Toggle between hourly and daily forecast
- View radar/precipitation overlay for current city
- Works great on mobile and desktop
- Installable as a PWA

## Credits
- [OpenWeatherMap](https://openweathermap.org/)
- [Open-Meteo](https://open-meteo.com/)
- [Leaflet](https://leafletjs.com/)
- [Weather Icons - Erik Flowers](https://erikflowers.github.io/weather-icons/)

---

Enjoy your advanced, production-ready weather app!
