import React from 'react';
import styled from "styled-components";
import WeatherIcon from './WeatherIcon';

const WeatherCard = ({ weather, aqi, uv }) => {
  if(typeof weather.error!='undefined' && weather.error.length > 0){
    return(
      <Container className="glass-card">
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
    <Container className="glass-card">
      <div className="weather-card-content">
        <h2 className="city-name">{weather.name}</h2>
        <WeatherIcon icon={icon} size={90} alt={weather.weather[0].description} />
        <div className="weather-main-info">
          <p className="temp">{weather.main.temp}°C <span className="feels">(Feels like {weather.main.feels_like}°C)</span></p>
          <p className="desc">{weather.weather[0].description}</p>
        </div>
        <div className="weather-details">
          <div><b>Humidity:</b> {weather.main.humidity}%</div>
          <div><b>Pressure:</b> {weather.main.pressure} hPa</div>
          <div><b>Visibility:</b> {weather.visibility ? (weather.visibility/1000).toFixed(1) : '--'} km</div>
          <div><b>Wind:</b> {weather.wind.speed} m/s</div>
          <div><b>Sunrise:</b> {sunrise} <b>Sunset:</b> {sunset}</div>
          <div><b>UV Index:</b> {uv && uv.value ? uv.value : '--'}</div>
          <div><b>Air Quality:</b> {aqi && aqi.list && aqi.list[0] ? aqi.list[0].main.aqi : '--'} {aqi && aqi.list && aqi.list[0] ? getAQIText(aqi.list[0].main.aqi) : ''}</div>
        </div>
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
  width: 370px;
  min-height: 420px;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  margin: 0 auto;
  background: rgba(255,255,255,0.18);
  border-radius: 22px;
  box-shadow: 0px 8px 32px rgba(31, 38, 135, 0.15);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border: 1.5px solid rgba(255,255,255,0.22);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  .weather-card-content {
    width: 100%;
  }
  .city-name {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 0.6rem;
    color: var(--primary-text);
    text-shadow: 0 2px 16px rgba(0,0,0,0.10);
  }
  .temp {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 0.2rem;
    color: var(--primary-text);
  }
  .feels {
    font-size: 1rem;
    font-weight: 400;
    color: var(--secondary-text);
  }
  .desc {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: var(--secondary-text);
    letter-spacing: 0.5px;
  }
  .weather-details {
    margin-top: 1.1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem 1.1rem;
    font-size: 1.02rem;
    color: var(--primary-text);
    background: rgba(255,255,255,0.09);
    border-radius: 12px;
    padding: 0.6rem 0.5rem;
  }
`;
