import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';

const FlightCard = ({ flight }) => {
  const {
    source,
    airlines,
    stopInfo,
    destination,
    totalDuration,
  } = flight.displayData;

  const price = flight.fare;
  const departureDate = new Date(source.depTime);
  const arrivalDate = new Date(destination.arrTime);
  const formatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDepartureDate = departureDate.toLocaleDateString('en-GB', formatOptions);
  const formattedArrivalDate = arrivalDate.toLocaleDateString('en-GB', formatOptions);
  const sourceAirportImage = 'https://a.cdn-hotels.com/gdcs/production129/d1965/18d31ddc-406c-4a1e-afc6-4871854e221c.jpg';
  const destinationAirportImage = 'https://th.bing.com/th/id/R.53809f11433604d394fe530714d7c207?rik=g7CurrX9J7tQXg&riu=http%3a%2f%2fwww.airport-data.com%2fimages%2fairports%2fsmall%2f008%2f008186.jpg&ehk=9mjVnU0lymNgi6998WcYrnBfBBSapUsTwum8s5g5T9Q%3d&risl=&pid=ImgRaw&r=0';

  return (
    <Card style={{ margin: 10, borderRadius: 10, elevation: 5, backgroundColor: '#F5F5F5' }}>
      <Card.Content>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#3498db' }}>{airlines[0].airlineName}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
          <Image source={{ uri: sourceAirportImage }} style={{ width: 30, height: 30, borderRadius: 15 }} />
          <Text style={{ color: '#27ae60' }}>{`${source.airport.cityName} (${source.airport.airportCode})`}</Text>
          <Image source={{ uri: destinationAirportImage }} style={{ width: 30, height: 30, borderRadius: 15 }} />
          <Text style={{ color: '#e74c3c' }}>{`${destination.airport.cityName} (${destination.airport.airportCode})`}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <Text style={{ color: '#f39c12' }}>{` ${formattedDepartureDate} - ${formattedArrivalDate}`}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <Text style={{ color: '#e74c3c' }}>{` Duration: ${totalDuration}`}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <Text style={{ color: 'black' }}>{` Stop Info: ${stopInfo}`}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <Text style={{ color: '#e67e22' }}>{` Price: ${price}`}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default FlightCard;
