import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from './Header';
import  BottomNavigation  from './BottomNavigation';


//currently the home screen is static and header and bottom navigation bar are also on the same .jsx file
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <Header/>

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
      <BottomNavigation/>
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
    }
  });