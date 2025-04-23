import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import styled from "styled-components";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

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
    return { date, avgTemp };
  });
}

const WeatherChart = ({ forecast }) => {
  const [mode, setMode] = useState('hourly');
  if (!forecast || !forecast.list) {
    return <p>Problem loading chart data...</p>;
  }

  // Hourly data
  const hours = forecast.list.map(item => {
    const d = new Date(item.dt * 1000);
    return d.getHours() + ':00';
  });
  const temps = forecast.list.map(item => item.main.temp);

  // Daily data
  const daily = getDailyForecast(forecast);
  const dailyLabels = daily.map(d => d.date);
  const dailyTemps = daily.map(d => d.avgTemp);

  const hourlyData = {
    labels: hours,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temps,
        fill: false,
        borderColor: '#38bdf8',
        backgroundColor: '#38bdf8',
        tension: 0.4,
      },
    ],
  };
  const dailyData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Avg Temp (°C)',
        data: dailyTemps,
        backgroundColor: '#2563eb',
        borderRadius: 8,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: mode === 'hourly' ? 'Hourly Forecast' : '7-Day Forecast',
      },
    },
  };
  return (
    <Container>
      <ToggleBar>
        <button className={mode==='hourly' ? 'active' : ''} onClick={()=>setMode('hourly')}>Hourly</button>
        <button className={mode==='daily' ? 'active' : ''} onClick={()=>setMode('daily')}>7-Day</button>
      </ToggleBar>
      {mode === 'hourly' ? (
        <Line data={hourlyData} options={options} />
      ) : (
        <Bar data={dailyData} options={options} />
      )}
    </Container>
  );
};

export default WeatherChart;
const Container = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 20px auto;
`;
const ToggleBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  button {
    padding: 0.5rem 1.5rem;
    border-radius: 2rem;
    border: none;
    background: #e2e8f0;
    color: #222;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  button.active, button:focus {
    background: #38bdf8;
    color: #fff;
  }
`;
