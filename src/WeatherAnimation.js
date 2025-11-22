import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function WeatherAnimation({ weatherMain }) {
  let animationSource;

  switch (weatherMain) {
    case 'Thunderstorm':
      animationSource = require('../assets/animations/storm.json'); 
      break;
      
    case 'Rain':
    case 'Drizzle':
    case 'Clouds': 
    case 'Mist':
    case 'Smoke':
    case 'Haze':
    case 'Dust':
    case 'Fog':
    case 'Snow':
      animationSource = require('../assets/animations/Rainy.json'); 
      break;

    case 'Clear':
    default:
      animationSource = require('../assets/animations/sunny.json'); 
      break;
  }

  return (
    <View style={styles.container}>
      <LottieView
        source={animationSource}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  animation: {
    width: 200,
    height: 200,
  },
});