import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function OutfitSuggestion({ temp, weatherId }) {
  const getRecommendation = () => {
    if (weatherId >= 200 && weatherId < 600) return "Bring an umbrella and wear waterproof shoes.";
    if (temp < 10) return "Wear a heavy coat, scarf, and gloves.";
    if (temp >= 10 && temp < 20) return "A light jacket or hoodie and jeans should be fine.";
    if (temp >= 20) return "T-shirt and shorts weather. Don't forget sunglasses.";
    return "Check outside, the weather is unusual.";
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="tshirt-crew" size={24} color="#fff" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Suggestion</Text>
        <Text style={styles.suggestion}>{getRecommendation()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.05)', 
    borderRadius: 15,
    padding: 15,
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  iconContainer: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#007AFF',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  suggestion: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
    lineHeight: 20,
  },
});