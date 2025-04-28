import React, { useState, useEffect, Suspense } from 'react';
import { getCurrentWeather, getWeatherForecast, getAirQuality, getUVIndex } from '../components/api';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import HourlyForecast from '../components/HourlyForecast';
import ForecastSection from '../components/ForecastSection';
import PromoBanner from '../components/PromoBanner';
import NewsLeft from '../components/NewsLeft';
import NewsRight from '../components/NewsRight';
import FooterFull from '../components/FooterFull';
const WeatherMap = React.lazy(() => import('../components/WeatherMap'));
import CustomHead from './_head';
import styled, { useTheme } from 'styled-components';

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
      <CustomHead title="Weather Forecast" description="Modern, robust weather app with live radar, AQI, UV, hourly & 7-day forecast, and more." />
      <Container>
        <div className="App glass-bg">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <img src="/sun.png" alt="Weather Logo" style={{ height: 48, width: 48, marginRight: 16 }} />
            <h1 className="main-title" style={{ margin: 0 }}>Weather App</h1>
          </div>
          <SearchBar onSearch={setLocation} />
          <PromoBanner />
          <MainLayout>
            <NewsAreaLeft>
              <NewsLeft />
            </NewsAreaLeft>
            <MainContentArea>
              <div className="weather-content">
                {currentWeather ? <WeatherCard weather={currentWeather} aqi={aqi} uv={uv} /> : <p>Loading weather...</p>}
              </div>
              {forecast ? <ForecastSection forecast={forecast} /> : <p>Loading forecast...</p>}
            </MainContentArea>
            <NewsAreaRight>
              <NewsRight />
            </NewsAreaRight>
          </MainLayout>
        </div>
        <FooterFull />
      </Container>
    </>
  );
}

const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  padding: 0;
  text-align: center;
  background-image: url('https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?cs=srgb&dl=pexels-pixabay-209831.jpg&fm=jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-color: #bcd1e6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: ${({ theme }) => theme.text};
  overflow-x: auto;
  width: 100vw;
  .glass-bg {
    background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(35,41,70,0.85)' : 'rgba(255,255,255,0.17)'};
    box-shadow: 0 8px 32px 0 rgba(31,38,135,0.18);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 24px;
    padding: 2.5rem 2.5rem 2rem 2.5rem;
    margin-top: 2.5rem;
    width: 90vw;
    max-width: 100vw;
    overflow-x: visible;
  }
  .main-title {
    font-size: 2.8rem;
    font-weight: 800;
    letter-spacing: 1.5px;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.text};
    text-shadow: ${({ theme }) => theme.mode === 'dark' ? '0 2px 24px rgba(0,0,0,0.38)' : '0 2px 24px rgba(0,0,0,0.18)'};
  }
  .weather-content {
    display: flex;
    gap: 2.5rem;
    justify-content: center;
    align-items: flex-start;
    margin-top: 2.5rem;
    flex-wrap: wrap;
  }
  @media (max-width: 1400px) {
    .glass-bg {
      max-width: 100vw;
      width: 100vw;
      padding: 2rem 1.2rem 2rem 1.2rem;
      overflow-x: visible;
    }
    .main-title {
      font-size: 2.3rem;
    }
  }
  @media (max-width: 1200px) {
    .glass-bg {
      max-width: 100vw;
      width: 100vw;
      padding: 1.5rem 0.7rem 1.5rem 0.7rem;
      overflow-x: visible;
    }
    .main-title {
      font-size: 2rem;
    }
    .weather-content {
      gap: 1.7rem;
    }
  }
  @media (max-width: 900px) {
    .glass-bg {
      padding: 1.2rem 0.3rem 1.2rem 0.3rem;
      max-width: 100vw;
      width: 100vw;
      border-radius: 0;
      margin-top: 0.7rem;
      overflow-x: visible;
    }
    .main-title {
      font-size: 1.7rem;
      margin-bottom: 1rem;
      text-align: left;
    }
    .weather-content {
      gap: 1.2rem;
      margin-top: 1.2rem;
      flex-direction: column;
      align-items: stretch;
    }
  }
  @media (max-width: 700px) {
    .glass-bg {
      padding: 0.8rem 0.1rem 0.8rem 0.1rem;
      max-width: 100vw;
      width: 100vw;
      overflow-x: visible;
    }
    .main-title {
      font-size: 1.3rem;
    }
    .weather-content {
      gap: 0.8rem;
    }
  }
  @media (max-width: 540px) {
    .glass-bg {
      padding: 0.5rem 0.05rem 0.5rem 0.05rem;
      max-width: 100vw;
      width: 100vw;
      overflow-x: visible;
    }
    .main-title {
      font-size: 1.08rem;
    }
  }
  @media (max-width: 400px) {
    .glass-bg {
      padding: 0.2rem 0 0.2rem 0;
      max-width: 100vw;
      width: 100vw;
      overflow-x: visible;
    }
    .main-title {
      font-size: 0.92rem;
    }
  }
`;

const MainLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100vw;
  max-width: 1200px;
  margin: 0 auto;
  gap: 2.5rem;
  box-sizing: border-box;
  overflow-x: visible;
  padding-left: 24px;
  padding-right: 24px;
  @media (max-width: 1400px) {
    max-width: 98vw;
    gap: 1.5rem;
    padding-left: 16px;
    padding-right: 16px;
  }
  @media (max-width: 1200px) {
    max-width: 98vw;
    gap: 1.2rem;
    padding-left: 8px;
    padding-right: 8px;
  }
  @media (max-width: 1100px) {
    gap: 0.7rem;
    padding-left: 0;
    padding-right: 0;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1.2rem;
    max-width: 100vw;
    padding: 0;
  }
`;
const MainContentArea = styled.div`
  flex: 1 1 600px;
  max-width: 100vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.text};
`;
const NewsAreaLeft = styled.div`
  flex: 0 0 320px;
  max-width: 100vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: ${({ theme }) => theme.text};
  @media (max-width: 900px) {
    max-width: 100%;
    width: 100%;
    margin-bottom: 1.5rem;
    align-items: center;
  }
`;
const NewsAreaRight = styled.div`
  flex: 0 0 320px;
  max-width: 100vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme }) => theme.text};
  @media (max-width: 900px) {
    max-width: 100%;
    width: 100%;
    margin-bottom: 1.5rem;
    align-items: center;
  }
`;
