import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function ForecastList({ forecast }) {
  const upcoming = forecast?.list?.slice(0, 5) || [];



  const renderItem = ({ item }) => {
    const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
      <View style={styles.item}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.temp}>{Math.round(item.main.temp)}°C</Text>
        <Text style={styles.desc}>{item.weather[0].main}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Forecast</Text>
      <FlatList
        data={upcoming}
        renderItem={renderItem}
        keyExtractor={(item) => item.dt.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  listContent: {
    paddingBottom: 10,
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginRight: 15,
    alignItems: 'center',
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    elevation: 2,
  },
  time: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  temp: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  desc: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
});

