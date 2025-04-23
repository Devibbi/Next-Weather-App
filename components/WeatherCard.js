import React from 'react';
import styled from "styled-components";
import WeatherIcon from './WeatherIcon';

const WeatherCard = ({ weather, aqi, uv }) => {
  if(typeof weather.error!='undefined' && weather.error.length > 0){
    return(
      <Container>
        <div>
          {weather.error}
        </div>
      </Container>
    );
  }
  const sunrise = weather.sys && weather.sys.sunrise ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString() : '--';
  const sunset = weather.sys && weather.sys.sunset ? new Date(weather.sys.sunset * 1000).toLocaleTimeString() : '--';
  const icon = weather.weather[0].icon;
  return (
    <Container>
      <div className="weather-card">
        <h2>{weather.name}</h2>
        <WeatherIcon icon={icon} size={80} alt={weather.weather[0].description} />
        <p>Temperature: {weather.main.temp} °C (Feels like: {weather.main.feels_like} °C)</p>
        <p>Weather: {weather.weather[0].description}</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Pressure: {weather.main.pressure} hPa</p>
        <p>Visibility: {weather.visibility ? (weather.visibility/1000).toFixed(1) : '--'} km</p>
        <p>Wind Speed: {weather.wind.speed} m/s</p>
        <p>Sunrise: {sunrise} | Sunset: {sunset}</p>
        <p>UV Index: {uv && uv.value ? uv.value : '--'}</p>
        <p>Air Quality Index: {aqi && aqi.list && aqi.list[0] ? aqi.list[0].main.aqi : '--'} {aqi && aqi.list && aqi.list[0] ? getAQIText(aqi.list[0].main.aqi) : ''}</p>
      </div>
    </Container>
  );
};

function getAQIText(aqi) {
  switch(aqi) {
    case 1: return '(Good)';
    case 2: return '(Fair)';
    case 3: return '(Moderate)';
    case 4: return '(Poor)';
    case 5: return '(Very Poor)';
    default: return '';
  }
}

export default WeatherCard;
const Container= styled.div`
width: 350px;
padding: 20px;
margin: 10px auto;
background-color: #f8f9fa;
border: 1px solid #e1e1e1;
border-radius: 10px;
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
text-align: center;
h5 {font-size: 1.5rem;margin-bottom: 15px;}
p {margin: 5px 0;font-size: 1rem;}
`;
