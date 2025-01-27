import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


//currently the home screen is static and header and bottom navigation bar are also on the same .jsx file
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/logo.png')} 
            style={styles.logo}
          />
          <Text style={styles.headerText}>TourNepal</Text>

          <TouchableOpacity>
            <Text>
              <FontAwesome name="bell" size={24} color="#000" /> 
            </Text>
          </TouchableOpacity>
        </View>

        {/* Banner Section */}
        <Image
          source={require('../assets/placeholder.png')} 
          style={styles.banner}
        />

        {/* Content Section */}
        <View style={styles.contentContainer}>
          {/* Most Visited Places Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Most Visited Places in 2024</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.placesContainer}>
                <View style={styles.placeCard}>
                  <Image
                    source={require('../assets/placeholder.png')}
                    style={styles.placeImage}
                  />
                  <Text style={styles.placeName}>Italy</Text>
                </View>
                <View style={styles.placeCard}>
                  <Image
                    source={require('../assets/placeholder.png')} 
                    style={styles.placeImage}
                  />
                  <Text style={styles.placeName}>France</Text>
                </View>
                <View style={styles.placeCard}>
                  <Image
                    source={require('../assets/placeholder.png')} 
                    style={styles.placeImage}
                  />
                  <Text style={styles.placeName}>Greece</Text>
                </View>
                <View style={styles.placeCard}>
                  <Image
                    source={require('../assets/placeholder.png')} 
                    style={styles.placeImage}
                  />
                  <Text style={styles.placeName}>Spain</Text>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* Recommendation Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Recommendation By TourNepal</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.placesContainer}>
                <View style={styles.placeCard}>
                  <Image
                    source={require('../assets/placeholder.png')} 
                    style={styles.placeImage}
                  />
                  <Text style={styles.placeName}>Patan</Text>
                </View>
                <View style={styles.placeCard}>
                  <Image
                    source={require('../assets/placeholder.png')} 
                    style={styles.placeImage}
                  />
                  <Text style={styles.placeName}>Lumbini</Text>
                </View>
                <View style={styles.placeCard}>
                  <Image
                    source={require('../assets/placeholder.png')} 
                    style={styles.placeImage}
                  />
                  <Text style={styles.placeName}>Pokhara</Text>
                </View>
                <View style={styles.placeCard}>
                  <Image
                    source={require('../assets/placeholder.png')} 
                    style={styles.placeImage}
                  />
                  <Text style={styles.placeName}>Chitwan</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={[styles.navIcon, { color: 'orange' }]}>🏠</Text>
          <Text style={[styles.navText, { color: 'orange' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navIcon}>🔍</Text>
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navIcon}>🚨</Text>
          <Text style={styles.navText}>Emergency</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scrollContent: {
      flexGrow: 1,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    logo: {
      width: 40,
      height: 40,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    bellIcon: {
      width: 24,
      height: 24,
    },
    banner: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      marginBottom: 20,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    sectionContainer: {
      flex: 1,
      justifyContent: 'center',
      marginVertical: 10,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingBottom: 5,
    },
    placesContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: 25, 
      paddingHorizontal: 10,
    },
    placeCard: {
      width: 150,
      alignItems: 'center',
      marginHorizontal: 10,
    },
    placeImage: {
      width: 185,
      height: 155,
      borderRadius: 10,
      marginBottom: 5,
    },
    placeName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    bottomNavigation: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      backgroundColor: '#fff',
    },
    navButton: {
      alignItems: 'center',
    },
    navIcon: {
      fontSize: 18,
    },
    navText: {
      fontSize: 12,
      color: '#888',
    },
  });