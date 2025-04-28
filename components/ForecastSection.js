import React, { useState } from "react";
import styled from "styled-components";
import HourlyForecast from "./HourlyForecast";
import WeatherChart from "./WeatherChart";
import { FaSun, FaCloudRain, FaCloud, FaSnowflake, FaBolt } from 'react-icons/fa';

function getDailyForecast(forecast) {
  // Group forecast.list by day (using date string)
  const days = {};
  forecast.list.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });
  // For each day, pick the mid-day entry (or average)
  return Object.entries(days).map(([date, items]) => {
    const temps = items.map(i => i.main.temp);
    const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
    const weather = items[Math.floor(items.length / 2)].weather[0].description;
    const humidity = (items.reduce((a, b) => a + b.main.humidity, 0) / items.length).toFixed(0);
    const wind = (items.reduce((a, b) => a + b.wind.speed, 0) / items.length).toFixed(1);
    return { date, avgTemp, weather, humidity, wind };
  });
}

function getMonthlyForecast(forecast) {
  const months = {};
  forecast.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    if (!months[key]) months[key] = [];
    months[key].push(item);
  });
  return Object.entries(months).map(([month, items]) => {
    const temps = items.map(i => i.main.temp);
    const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
    const weather = items[Math.floor(items.length / 2)].weather[0].description;
    const humidity = (items.reduce((a, b) => a + b.main.humidity, 0) / items.length).toFixed(0);
    const wind = (items.reduce((a, b) => a + b.wind.speed, 0) / items.length).toFixed(1);
    return { month, avgTemp, weather, humidity, wind };
  });
}

function WeatherIcon({ desc }) {
  const d = desc.toLowerCase();
  const iconStyle = { color: undefined, verticalAlign: 'middle', fontSize: '1.7em', minWidth: '1.7em', minHeight: '1.7em', display: 'inline-block' };
  if (d.includes('rain')) return <FaCloudRain style={{ ...iconStyle, color: '#38bdf8' }} title="Rain"/>;
  if (d.includes('sun') || d.includes('clear')) return <FaSun style={{ ...iconStyle, color: '#fbbf24' }} title="Sunny"/>;
  if (d.includes('cloud')) return <FaCloud style={{ ...iconStyle, color: '#a3a3a3' }} title="Cloudy"/>;
  if (d.includes('snow')) return <FaSnowflake style={{ ...iconStyle, color: '#60a5fa' }} title="Snow"/>;
  if (d.includes('storm') || d.includes('thunder')) return <FaBolt style={{ ...iconStyle, color: '#f87171' }} title="Storm"/>;
  return null;
}

const ForecastSection = ({ forecast }) => {
  const [mode, setMode] = useState("hourly");
  if (!forecast || !forecast.list) return null;

  let tableContent = null;
  if (mode === "hourly") {
    tableContent = <HourlyForecast forecast={forecast} />;
  } else if (mode === "daily") {
    const daily = getDailyForecast(forecast);
    tableContent = (
      <ForecastGlass>
        <h3>7-Day Forecast</h3>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Avg Temp (°C)</th>
              <th>Weather</th>
              <th>Humidity</th>
              <th>Wind (m/s)</th>
            </tr>
          </thead>
          <tbody>
            {daily.map((d, i) => (
              <tr key={i}>
                <td>{d.date}</td>
                <td>{d.avgTemp}</td>
                <td style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'0.5em'}}>
                  <WeatherIcon desc={d.weather} /> <span style={{textTransform:'capitalize'}}>{d.weather}</span>
                </td>
                <td>{d.humidity}%</td>
                <td>{d.wind}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ForecastGlass>
    );
  } else if (mode === "monthly") {
    const monthly = getMonthlyForecast(forecast);
    tableContent = (
      <ForecastGlass>
        <h3>Monthly Forecast</h3>
        <Table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Avg Temp (°C)</th>
              <th>Weather</th>
              <th>Humidity</th>
              <th>Wind (m/s)</th>
            </tr>
          </thead>
          <tbody>
            {monthly.map((item, i) => (
              <tr key={i}>
                <td>{item.month}</td>
                <td>{item.avgTemp}</td>
                <td><WeatherIcon desc={item.weather} /> {item.weather}</td>
                <td>{item.humidity}%</td>
                <td>{item.wind}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ForecastGlass>
    );
  }

  return (
    <Section>
      <ToggleBar>
        <button className={mode === "hourly" ? "active" : ""} onClick={() => setMode("hourly")}>Hourly</button>
        <button className={mode === "daily" ? "active" : ""} onClick={() => setMode("daily")}>7-Day</button>
        <button className={mode === "monthly" ? "active" : ""} onClick={() => setMode("monthly")}>Monthly</button>
      </ToggleBar>
      {tableContent}
      <WeatherChart forecast={forecast} mode={mode} />
    </Section>
  );
};

const Section = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 2.5rem auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ToggleBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.1rem;
  button {
    padding: 0.5rem 1.5rem;
    border-radius: 2rem;
    border: none;
    background: #e2e8f0;
    color: #222;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    font-size: 1.08rem;
    box-shadow: 0 1px 4px rgba(31,38,135,0.07);
  }
  button.active, button:focus {
    background: #38bdf8;
    color: #fff;
    outline: none;
    box-shadow: 0 2px 12px #38bdf844;
  }
`;

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

export default ForecastSection;
