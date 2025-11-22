import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OutfitSuggestion from './OutfitSuggestion';
import WeatherAnimation from './WeatherAnimation'; 

export default function WeatherCard({ weather }) {
  
  const getThemeColor = (main) => {
    if (main === 'Clear') return '#FFD700'; 
    if (main === 'Clouds') return '#B0C4DE';
    if (main === 'Rain') return '#4682B4'; 
    return '#87CEEB'; 
  };

  const themeColor = getThemeColor(weather.weather[0].main);

  return (
    <View style={[styles.card, { backgroundColor: 'white' }]}> 
      <View style={[styles.colorStrip, { backgroundColor: themeColor }]} />

      <Text style={styles.city}>{weather.name}, {weather.sys.country}</Text>
      <Text style={styles.description}>{weather.weather[0].description}</Text>
      
      <WeatherAnimation weatherMain={weather.weather[0].main} />
      
      <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>

      <View style={styles.divider} />
      
      <OutfitSuggestion 
        temp={weather.main.temp} 
        weatherId={weather.weather[0].id} 
      />

      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Feels Like</Text>
          <Text style={styles.value}>{Math.round(weather.main.feels_like)}°C</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Humidity</Text>
          <Text style={styles.value}>{weather.main.humidity}%</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Wind</Text>
          <Text style={styles.value}>{weather.wind.speed} m/s</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Pressure</Text>
          <Text style={styles.value}>{weather.main.pressure} hPa</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 25,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    overflow: 'hidden', 
    marginBottom: 20,
  },
  colorStrip: {
    width: '100%',
    height: 150, 
    position: 'absolute',
    top: 0,
  },
  city: {
    fontSize: 32,
    fontWeight: '800',
    color: '#333',
    marginTop: 40, 
    zIndex: 1,
  },
  description: {
    fontSize: 18,
    textTransform: 'capitalize',
    color: '#555',
    marginBottom: 10,
    zIndex: 1,
  },
  temp: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
    zIndex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    width: '80%',
    marginVertical: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  gridItem: {
    width: '48%', 
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
});