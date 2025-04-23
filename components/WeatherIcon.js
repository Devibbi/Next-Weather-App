import React from 'react';

const iconMap = {
  '01d': 'https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-day-sunny.svg',
  '01n': 'https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-night-clear.svg',
  '02d': 'https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-day-cloudy.svg',
  '02n': 'https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-night-alt-cloudy.svg',
  '03d': 'https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-cloud.svg',
  '03n': 'https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-cloud.svg',
  '04d': 'https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-cloudy.svg',
  '04n': 'https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-cloudy.svg',
  '09d': 'https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-showers.svg',
  '09n': 'https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-showers.svg',
  '10d': 'https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-day-rain.svg',
  '10n': 'https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-night-alt-rain.svg',
  '11d': 'https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-thunderstorm.svg',
  '11n': 'https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-thunderstorm.svg',
  '13d': 'https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-snow.svg',
  '13n': 'https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-snow.svg',
  '50d': 'https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-fog.svg',
  '50n': 'https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-fog.svg',
};

export default function WeatherIcon({ icon, alt = "Weather icon", size = 64 }) {
  const src = iconMap[icon] || iconMap['01d'];
  return <img src={src} alt={alt} width={size} height={size} style={{verticalAlign:'middle'}} />;
}
