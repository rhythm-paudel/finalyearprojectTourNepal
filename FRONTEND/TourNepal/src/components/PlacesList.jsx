import { StyleSheet, Text, View,  Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { Linking } from 'react-native';

//each card to show in the search section for places or restaurants
const PlacesList = ({place,redirectDescriptionScreen}) => {
  const navigateToGoogleMaps = () => { //redirects to google maps if installed else redirects to website for that location
    const coordinates = place.id
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates}`;
    Linking.openURL(googleMapsUrl);
  };

  return (
    <View key={place.id} style={styles.placeCard}>
        <Image
          source={place.photo
            ? { uri: place.photo }
            : require('../assets/placeholder.png')} 
          style={styles.placeImage}
        />
        <View style={styles.placeDetails}>
          <Text style={styles.placeName}>{place.name}</Text>
          <Text style={styles.placeRating}>
            {place.rating} 
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.navigateButton}onPress={navigateToGoogleMaps} >
              <Text style={styles.buttonText}>Navigate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewMoreButton} onPress={()=>redirectDescriptionScreen(place)}>
              <Text style={styles.buttonText}>View More</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  )
}

export default PlacesList

const styles = StyleSheet.create({
  placeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  placeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  placeDetails: {
    flex: 1,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  placeRating: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navigateButton: {
    backgroundColor: '#f16d26',
    padding: 5,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  viewMoreButton: {
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
})