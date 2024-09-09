import { fetchWeather } from './weather';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchWeather', () => {
  it('fetches weather data successfully from an API', async () => {
    const mockData = {
      location: { name: 'Frankfurt', country: 'Germany' },
      current: { condition: { text: 'Clear', icon: '//cdn.weatherapi.com/weather.png' } },
      forecast: { forecastday: [{ hour: [{ time: '11:34', temp_c: 20 }] }] },
    };

    mockedAxios.get.mockResolvedValue({ data: mockData });

    const data = await fetchWeather('Frankfurt');
    expect(data.location.name).toBe('Frankfurt');
    expect(data.current.condition.text).toBe('Clear');
  });

  it('throws an error when fetching fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('API Error'));

    await expect(fetchWeather('Unknown')).rejects.toThrow('Failed to fetch weather data');
  });
});
