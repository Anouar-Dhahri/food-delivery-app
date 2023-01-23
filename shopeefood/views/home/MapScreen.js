import { View, Dimensions, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { mapsLocations } from '../../data/maps_location';
import { Button, Colors } from 'react-native-paper';
import { Ionicons } from 'react-native-vector-icons';

const MapScreen = () => {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const randomLocation = mapsLocations[ (Math.random() * mapsLocations.length) | 0 ]

  /**
   * <Marker
key={index} 
coordinate={{
  latitude:location.coords.latitude,
  longitude:location.coords.longitude,
}}
title={"My Location"}
description={new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString()}
pinColor="#E74C3C"
/>
   */
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: 33.8439408,
          longitude: 9.400138,
          latitudeDelta: 8.429280868599424,
          longitudeDelta: 6.08929306268692
        }}
        mapType="standard" //satellite 
        zoomControlEnabled={true}
        scrollEnabled={true}
        rotateEnabled={true}
        showsUserLocation={true}
        zoomEnabled = {true}
      >
        <Marker
          coordinate={{
            latitude:randomLocation.latitude,
            longitude:randomLocation.longitude,
          }}
          title={"Staff Location"}
          description={new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString()}
          mapType='standard'
          pinColor="#3498DB"
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

export default MapScreen