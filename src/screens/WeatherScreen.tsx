import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, FlatList } from 'react-native';
import { fetchWeather } from '../api/weather';

const WeatherScreen = () => {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetchWeather = async () => {
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError('Could not fetch weather data');
      setWeatherData(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={handleFetchWeather} />

      {error && <Text style={styles.error}>{error}</Text>}

      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.location}>
            {weatherData.location.name}, {weatherData.location.country}
          </Text>
          <Text style={styles.condition}>{weatherData.current.condition.text}</Text>
          <Image
            style={styles.icon}
            source={{ uri: `http:${weatherData.current.condition.icon}` }}
          />

          <Text style={styles.forecastTitle}>Forecast (Next 5 Hours)</Text>
          <FlatList
            data={weatherData.forecast.forecastday[0].hour.slice(0, 5)}
            keyExtractor={(item) => item.time}
            renderItem={({ item }) => (
              <View style={styles.forecastItem}>
                <Text>{item.time}</Text>
                <Text>{item.temp_c}°C</Text>
                <Image style={styles.iconSmall} source={{ uri: `http:${item.condition.icon}` }} />
                <Text>{item.condition.text}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  weatherContainer: {
    marginTop: 20,
  },
  location: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 18,
    marginVertical: 10,
  },
  icon: {
    width: 100,
    height: 100,
  },
  forecastTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  iconSmall: {
    width: 50,
    height: 50,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default WeatherScreen;
