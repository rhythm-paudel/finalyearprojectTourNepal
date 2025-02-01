import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import BottomNavigation from '../components/BottomNavigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DescriptionScreen = () => {
  const navigateToGoogleMaps = () => { //currently a static link that redirects to eiffel tower only
    const eiffelTowerCoordinates = "48.8584,2.2945"; // Latitude, Longitude for Eiffel Tower
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${eiffelTowerCoordinates}`;
    Linking.openURL(googleMapsUrl);
  };

  return (
    // description screen model (everything is static as of now)
    <View style={styles.container}>
      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            source={require('../assets/logo.png')} 
            style={styles.logo}
          />
          <Text style={styles.appTitle}>TourNepal</Text>
          <FontAwesome name="bell" size={24} color="#000" />
        </View>

        {/* Destination Section */}
        <Image
          source={require('../assets/placeholder.png') }
          style={styles.destinationImage}
        />
        <View style={styles.destinationInfo}>
          <Text style={styles.destinationTitle}>Eiffel Tower</Text>
          <Text style={styles.rating}>
            <FontAwesome name="star" color="#FFD700" /> (9.5/10) 120
          </Text>
          <TouchableOpacity style={styles.navigateButton} onPress={navigateToGoogleMaps}>
            <Text style={styles.navigateButtonText}>Navigate</Text>
          </TouchableOpacity>
          <Text style={styles.destinationDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            The Eiffel Tower is one of the most famous landmarks in the world.
          </Text>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <Text style={styles.reviewsTitle}>Reviews</Text>
          <View style={styles.reviewCard}>
            <FontAwesome name="user-circle" size={40} color="#888" style={styles.reviewAvatar} />
            <View style={styles.reviewText}>
              <Text style={styles.reviewerName}>John Doe</Text>
              <Text style={styles.reviewContent}>Absolutely breathtaking view!</Text>
            </View>
          </View>
          <View style={styles.reviewCard}>
            <FontAwesome name="user-circle" size={40} color="#888" style={styles.reviewAvatar} />
            <View style={styles.reviewText}>
              <Text style={styles.reviewerName}>Jane Smith</Text>
              <Text style={styles.reviewContent}>Too crowded but worth visiting.</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  );
};

export default DescriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes the full screen
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 20, // Ensure content doesn't overlap BottomNavigation
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  destinationImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  destinationInfo: {
    paddingHorizontal: 10,
  },
  destinationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  navigateButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  navigateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  destinationDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 10,
  },
  reviewsSection: {
    marginTop: 20,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  reviewAvatar: {
    marginRight: 10,
  },
  reviewText: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewContent: {
    fontSize: 14,
    color: '#555',
  },
});