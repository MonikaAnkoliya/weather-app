import axios from 'axios';

const API_KEY = 'b825a5347d8d4a5ab6d90531240909'; // Replace with your actual key
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeather = async (city: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        hours: 5
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};
