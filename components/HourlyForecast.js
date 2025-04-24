import React from "react";
import styled from "styled-components";
import { FaSun, FaCloudRain, FaCloud, FaSnowflake, FaBolt } from 'react-icons/fa';

function getPrecipitation(item) {
  // OpenWeatherMap API: rain/3h or snow/3h
  if (item.rain && item.rain["3h"]) return item.rain["3h"] + " mm";
  if (item.snow && item.snow["3h"]) return item.snow["3h"] + " mm";
  return "0 mm";
}

function WeatherIcon({ desc }) {
  const d = desc.toLowerCase();
  if (d.includes('rain')) return <FaCloudRain style={{color:'#38bdf8',verticalAlign:'middle'}} title="Rain"/>;
  if (d.includes('sun') || d.includes('clear')) return <FaSun style={{color:'#fbbf24',verticalAlign:'middle'}} title="Sunny"/>;
  if (d.includes('cloud')) return <FaCloud style={{color:'#a3a3a3',verticalAlign:'middle'}} title="Cloudy"/>;
  if (d.includes('snow')) return <FaSnowflake style={{color:'#60a5fa',verticalAlign:'middle'}} title="Snow"/>;
  if (d.includes('storm') || d.includes('thunder')) return <FaBolt style={{color:'#f87171',verticalAlign:'middle'}} title="Storm"/>;
  return null;
}

const HourlyForecast = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;
  // Show next 12 hours
  const next12 = forecast.list.slice(0, 12);
  return (
    <ForecastGlass>
      <h3>Hourly Forecast</h3>
      <Table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Temp (°C)</th>
            <th>Feels Like</th>
            <th>Weather</th>
            <th>Precipitation</th>
            <th>Humidity</th>
            <th>Wind</th>
          </tr>
        </thead>
        <tbody>
          {next12.map((item, i) => {
            const dt = new Date(item.dt * 1000);
            return (
              <tr key={i}>
                <td>{dt.getHours()}:00</td>
                <td>{item.main.temp.toFixed(1)}</td>
                <td>{item.main.feels_like.toFixed(1)}</td>
                <td><WeatherIcon desc={item.weather[0].description} /> {item.weather[0].description}</td>
                <td>{getPrecipitation(item)}</td>
                <td>{item.main.humidity}%</td>
                <td>{item.wind.speed} m/s</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </ForecastGlass>
  );
};

const ForecastGlass = styled.div`
  background: rgba(255,255,255,0.19);
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(31,38,135,0.13);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1.5px solid rgba(56,189,248,0.15);
  padding: 1.2rem 0.7rem 1.2rem 0.7rem;
  margin: 0 auto 1.5rem auto;
  max-width: 700px;
  width: 100%;
  overflow-x: auto;
  h3 {
    margin-bottom: 1rem;
    color: var(--primary-text);
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-align: left;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: transparent;
  th, td {
    padding: 0.65rem 0.5rem;
    text-align: center;
    font-size: 1.05rem;
    color: var(--primary-text);
    border-bottom: 1px solid rgba(56,189,248,0.11);
  }
  th {
    font-weight: 700;
    background: rgba(56,189,248,0.09);
    color: #38bdf8;
    border-radius: 6px;
  }
  tr:last-child td {
    border-bottom: none;
  }
`;

export default HourlyForecast;
