import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import HomescreenCards from '../components/HomescreenCards';

//currently the home screen is static and header and bottom navigation bar are also on the same .jsx file
const HomeScreen = () => {
  const [visitedPlace, setVisitedPLaces] = useState([]); // store visited places
  const [recommendationPlaces, setRecommendationPlaces] = useState([]); // store recommendation places

  useEffect(() => {
    const visitPlaces = [
      { id: 1, name: 'Italy', imagePath: '../assets/placeholder.png' },
      { id: 2, name: 'France', imagePath: '../assets/placeholder.png' },
      { id: 3, name: 'Greece', imagePath: '../assets/placeholder.png' },
      { id: 4, name: 'Spain', imagePath: '../assets/placeholder.png' },
    ];
    setVisitedPLaces(visitPlaces);
  }, []);

  useEffect(() => {
    const recommendPlaces = [
      { id: 1, name: 'Patan', imagePath: '../assets/placeholder.png' },
      { id: 2, name: 'Lumbini', imagePath: '../assets/placeholder.png' },
      { id: 3, name: 'Pokhara', imagePath: '../assets/placeholder.png' },
      { id: 4, name: 'Chitwan', imagePath: '../assets/placeholder.png' },
    ];
    setRecommendationPlaces(recommendPlaces);
  }, []);

  const renderVisitedPlaces = () => {
    return visitedPlace.map(visitedPlac => (
      <HomescreenCards key={visitedPlac.id} place={visitedPlac} />
    ));
  };
  const renderRecommendedPlaces = () => {
    return recommendationPlaces.map(recommendationPlace => (
      <HomescreenCards key={recommendationPlace.id} place={recommendationPlace} />
    ));
  };

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <Header />

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
                {renderVisitedPlaces()}
              </View>
            </ScrollView>
          </View>

          {/* Recommendation Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Recommendation By TourNepal</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.placesContainer}>
                {renderRecommendedPlaces()}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation />
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
  }
});
