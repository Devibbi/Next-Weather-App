import axios from 'axios';

const API_KEY = '689e563a4664417e5bbde0e2ba455089';

export const getCurrentWeather = async (location) => {
  try{
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error){
    console.log("location you added is not correct");
    return {error: 'location not found'};
  }
};

export const getWeatherForecast = async (location) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error){
    console.log("location you added is not correct");
    return {error: 'location not found'};
  }
};

export const getAirQuality = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getUVIndex = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
