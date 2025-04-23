import { render, screen } from '@testing-library/react';
import WeatherCard from '../components/WeatherCard';

describe('WeatherCard', () => {
  it('renders city name and temperature', () => {
    const mockWeather = {
      name: 'Test City',
      main: { temp: 22, feels_like: 21, humidity: 50, pressure: 1012 },
      weather: [{ icon: '01d', description: 'Clear sky' }],
      wind: { speed: 3 },
      visibility: 8000,
      sys: { sunrise: 1682246400, sunset: 1682293200 },
    };
    render(<WeatherCard weather={mockWeather} aqi={null} uv={null} />);
    expect(screen.getByText('Test City')).toBeInTheDocument();
    expect(screen.getByText(/Temperature/)).toBeInTheDocument();
  });
});
