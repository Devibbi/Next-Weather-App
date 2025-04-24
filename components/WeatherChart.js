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

  // Monthly data (group by month)
  const months = {};
  forecast.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    if (!months[key]) months[key] = [];
    months[key].push(item.main.temp);
  });
  const monthlyLabels = Object.keys(months);
  const monthlyTemps = monthlyLabels.map(key => {
    const vals = months[key];
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  });

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
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#38bdf8',
        pointBorderWidth: 2,
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
        borderColor: '#2563eb',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };
  const monthlyData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: 'Monthly Avg Temp (°C)',
        data: monthlyTemps,
        backgroundColor: '#f59e42',
        borderColor: '#f59e42',
        borderWidth: 2,
        borderRadius: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: { color: '#38bdf8', font: { size: 14, weight: 'bold' } },
      },
      title: {
        display: true,
        text:
          mode === 'hourly'
            ? 'Hourly Forecast'
            : mode === 'daily'
            ? '7-Day Forecast'
            : 'Monthly Forecast',
        color: '#38bdf8',
        font: { size: 18, weight: 'bold' },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#222e',
        titleColor: '#38bdf8',
        bodyColor: '#fff',
      },
    },
    scales: {
      x: {
        ticks: { color: '#38bdf8', font: { size: 13 } },
        grid: { color: 'rgba(56,189,248,0.1)' },
      },
      y: {
        ticks: { color: '#38bdf8', font: { size: 13 } },
        grid: { color: 'rgba(56,189,248,0.1)' },
      },
    },
  };

  return (
    <Container>
      <ToggleBar>
        <button className={mode==='hourly' ? 'active' : ''} onClick={()=>setMode('hourly')}>Hourly</button>
        <button className={mode==='daily' ? 'active' : ''} onClick={()=>setMode('daily')}>7-Day</button>
        <button className={mode==='monthly' ? 'active' : ''} onClick={()=>setMode('monthly')}>Monthly</button>
      </ToggleBar>
      <ChartGlass>
        {mode === 'hourly' ? (
          <Line data={hourlyData} options={options} />
        ) : mode === 'daily' ? (
          <Bar data={dailyData} options={options} />
        ) : (
          <Bar data={monthlyData} options={options} />
        )}
      </ChartGlass>
    </Container>
  );
};

const ChartGlass = styled.div`
  background: rgba(255,255,255,0.21);
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(31,38,135,0.13);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1.5px solid rgba(56,189,248,0.15);
  padding: 1.3rem 1.2rem 1.3rem 1.2rem;
  margin: 0 auto;
  max-width: 600px;
`;

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

export default WeatherChart;
