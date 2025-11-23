import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Keyboard, Alert, Platform } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

import WeatherCard from './src/WeatherCard';
import ForecastList from './src/ForecastList';

const API_KEY = '3a307f3ced9dd6c1425c723508bdc58c'; 

export default function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [citySearch, setCitySearch] = useState('');

  useEffect(() => {
    loadCachedData();
    getCurrentLocationWeather();
  }, []);

  const saveWeatherData = async (weatherData, forecastData) => {
    await AsyncStorage.setItem('lastWeather', JSON.stringify(weatherData));
    await AsyncStorage.setItem('lastForecast', JSON.stringify(forecastData));
  };

  const loadCachedDataFallback = async (offlineMessage) => {
    try {
      const savedWeather = await AsyncStorage.getItem('lastWeather');
      const savedForecast = await AsyncStorage.getItem('lastForecast');

      if (savedWeather && savedForecast) {
        setWeather(JSON.parse(savedWeather));
        setForecast(JSON.parse(savedForecast));
        setErrorMsg(null);
        Alert.alert("Offline Mode", offlineMessage);
        return true;
      }
      return false;
    } catch (storageErr) {
      return false;
    }
  };

  const loadCachedData = async () => {
    try {
      const savedWeather = await AsyncStorage.getItem('lastWeather');
      const savedForecast = await AsyncStorage.getItem('lastForecast');

      if (savedWeather && savedForecast) {
        setWeather(JSON.parse(savedWeather));
        setForecast(JSON.parse(savedForecast));
        setLoading(false);
      }
    } catch (e) {
      // Silent fail - let getCurrentLocationWeather handle loading state
    }
  };

  const getCurrentLocationWeather = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      setLoading(false);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    fetchData(location.coords.latitude, location.coords.longitude);
  };

  const fetchData = async (lat, lon) => {
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
      ]);

      setWeather(weatherRes.data);
      setForecast(forecastRes.data);
      setErrorMsg(null);
      await saveWeatherData(weatherRes.data, forecastRes.data);

    } catch (err) {
      const hasCachedData = await loadCachedDataFallback("Showing last updated data. Check internet connection.");
      if (!hasCachedData) {
        setErrorMsg('No Internet & No Saved Data.');
      }
    } finally {
      setLoading(false);
    }
  };

  const searchCity = async () => {
    if (!citySearch.trim()) return;
    Keyboard.dismiss();
    setLoading(true);
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric&appid=${API_KEY}`
      );
      const { lat, lon } = weatherRes.data.coord;

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      setWeather(weatherRes.data);
      setForecast(forecastRes.data);
      setErrorMsg(null);
      setCitySearch('');
      await saveWeatherData(weatherRes.data, forecastRes.data);

    } catch (err) {
      const hasCachedData = await loadCachedDataFallback("City search failed. Showing last updated data. Check internet connection.");
      if (!hasCachedData) {
        setErrorMsg('City not found or Network Error. No cached data available.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

return (
  <SafeAreaView style={styles.root}>
    <View style={styles.phoneWrapper}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={24} color="#666" style={{marginRight: 5}}/>
            <TextInput 
              style={styles.input}
              placeholder="Search City..."
              value={citySearch}
              onChangeText={setCitySearch}
              onSubmitEditing={searchCity}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={searchCity}>
            <MaterialIcons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {errorMsg ? (
          <View style={styles.errorContainer}>
             <MaterialIcons name="error-outline" size={40} color="red" />
             <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        ) : (
          <>
            {weather && <WeatherCard weather={weather} />}
            {forecast && <ForecastList forecast={forecast} />} 
          </>
        )}
      </ScrollView>
    </View>
  </SafeAreaView>
);

}

const styles = StyleSheet.create({
  root: { 
    flex: 1, 
    backgroundColor: '#f5f5f5',
  },

  phoneWrapper: {
    width: Platform.OS === "web" ? 430 : "100%",
    maxWidth: 430,
    alignSelf: "center",
    backgroundColor: "#f5f5f5",
    flex: 1,
  },

  scrollContainer: { 
    alignItems: 'center', 
    padding: 20, 
    paddingBottom: 50 
  },

  searchWrapper: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 25,
    alignItems: 'center',
  },

  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    elevation: 2,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },

  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorContainer: { alignItems: 'center', marginTop: 50 },
  errorText: { color: '#333', fontSize: 18, marginTop: 10, fontWeight: '500' },
});
