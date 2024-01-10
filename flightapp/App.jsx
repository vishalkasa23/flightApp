// App.js

import React, { useEffect, useState} from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FlightCard from './FlightCard';
import CustomDropdown from './customdropdown';

const App = () => {
  const [flightData, setFlightData] = useState([]);
  const [selectedAirline, setSelectedAirline] = useState(null);
  const [sortByPrice, setSortByPrice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.npoint.io/4829d4ab0e96bfab50e7');
        const data = await response.json();
        setFlightData(data.data.result || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const uniqueAirlines = Array.from(
    new Set(flightData.flatMap((flight) => flight.displayData.airlines.map((airline) => airline.airlineName)))
  );

  const handleSortByPrice = (order) => {
    const sortedFlights = [...flightData].sort((a, b) => {
      const priceA = a.fare;
      const priceB = b.fare;
      return order === 'lowToHigh' ? priceA - priceB : priceB - priceA;
    });

    setFlightData(sortedFlights);
    setSortByPrice(order);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 2, marginTop: 50 }}>
        <CustomDropdown
          items={uniqueAirlines.map((airline) => ({ label: airline, value: airline }))}
          placeholder = {selectedAirline ? selectedAirline :"Select an airline"}
          onSelect={(item) => setSelectedAirline(item?.value)}
        />

      <View style={{ flexDirection: 'row',padding:5 }}>
          <TouchableOpacity
            onPress={() => handleSortByPrice('lowToHigh')}
            style={[styles.button, sortByPrice === 'lowToHigh' && styles.selectedButton]}
          >
            <Text style={styles.buttonText}>Low to High</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSortByPrice('highToLow')}
            style={[styles.button, sortByPrice === 'highToLow' && styles.selectedButton]}
          >
            <Text style={styles.buttonText}>High to Low</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        {flightData
          .filter((flight) => (selectedAirline ? flight.displayData.airlines.some((airline) => airline.airlineName === selectedAirline) : true))
          .map((flight, index) => (
            <FlightCard key={index} flight={flight} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  buttonText: {
    color: '#000',
  },
});

export default App;
