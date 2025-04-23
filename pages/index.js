import React, { useState, useEffect, Suspense } from 'react';
import { getCurrentWeather, getWeatherForecast, getAirQuality, getUVIndex } from '../components/api';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import WeatherChart from '../components/WeatherChart';
const WeatherMap = React.lazy(() => import('../components/WeatherMap'));
import CustomHead from './_head';
import styled from 'styled-components';

export default function Home() {
  const [location, setLocation] = useState('New York');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [uv, setUv] = useState(null);

  useEffect(() => {
    // Dynamically load Leaflet for WeatherMap
    if (typeof window !== 'undefined' && !window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha512-o9N1jRVv6k1F9cR+7F8Qk5eG7kP7vC18JNpDutVdGs14Q6gttxyPjdvVSxN+GkORdzdrIW6DCeA44y7NULm5wQ==';
      script.crossOrigin = '';
      script.async = true;
      document.body.appendChild(script);
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha512-sA+z0ymF5ykj5kG6LJJLLfi5yRvDqxn6VOGGAaHo9dZYzTfGZNVVRhk1FdYyqS/fWznEtCG2lKT9Igrn3r3S3g==';
      link.crossOrigin = '';
      document.head.appendChild(link);
    }
  }, []);

  const fetchWeatherData = async (location) => {
    const weatherData = await getCurrentWeather(location);
    setCurrentWeather(weatherData);
    const forecastData = await getWeatherForecast(location);
    setForecast(forecastData);
    if(weatherData && weatherData.coord) {
      const aqiData = await getAirQuality(weatherData.coord.lat, weatherData.coord.lon);
      setAqi(aqiData);
      const uvData = await getUVIndex(weatherData.coord.lat, weatherData.coord.lon);
      setUv(uvData);
    } else {
      setAqi(null);
      setUv(null);
    }
  };

  useEffect(() => {
    fetchWeatherData(location);
  }, [location]);

  return (
    <>
      <CustomHead title="Weather App | Modern, Robust Weather Forecast" description="Modern, robust weather app with live radar, AQI, UV, hourly & 7-day forecast, and more." />
      <Container>
        <div className="App">
          <h1>Weather App</h1>
          <SearchBar onSearch={setLocation} />
          {currentWeather ? <WeatherCard weather={currentWeather} aqi={aqi} uv={uv} /> : <p>Loading weather...</p>}
          {forecast ? <WeatherChart forecast={forecast} /> : <p>Loading forecast...</p>}
          {currentWeather && currentWeather.coord && (
            <Suspense fallback={<div>Loading map…</div>}>
              <WeatherMap lat={currentWeather.coord.lat} lon={currentWeather.coord.lon} />
            </Suspense>
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  min-height: 800px;
  padding: 40px;
  text-align: center;
  background-image: url('https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?cs=srgb&dl=pexels-pixabay-209831.jpg&fm=jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  img {
    width: auto;
    height: auto;
  }
`;
