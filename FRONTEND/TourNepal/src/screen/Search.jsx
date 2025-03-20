import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import PlacesList from '../components/PlacesList';
import { nearbyPlaces } from '../utils/nearbyPlaces';
import LoadingAnimation from '../components/LoadingAnimation';
import { AuthenticationProviderContext } from '../context/AuthenticationProvider';

const Search = () => {
  const [radius, setRadius] = useState(5);
  const sliderValue = useRef(radius);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [allPlaces, setAllPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [currentSelection, setCurrentSelection] = useState('restaurants');
  const { currentLocation, locationPermission } = useContext(AuthenticationProviderContext);

  const navigation = useNavigation();
  const redirectDescriptionScreen = (place) => {
    navigation.navigate("Description", { place });
  };

  useEffect(() => {
    const getPlaces = async () => {
      if (currentSelection === 'all') return;
      
      setIsLoading(true);
      const places = await nearbyPlaces(radius * 1000, currentSelection, currentLocation);
      setIsLoading(false);
      setAllPlaces(places);
      setFilteredPlaces(places);
    };

    if (locationPermission && currentSelection !== 'all') {
      getPlaces();
    } else if (!locationPermission) {
      Alert.alert(
        'Location Permission Required',
        'Please enable location permission to get nearby places',
        [
          {
            text: 'Open Settings',
            onPress: () => Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS')
          },
          {
            text: "Cancel",
            style: 'cancel'
          }
        ]
      );
    }
  }, [radius, currentSelection, currentLocation]);

  useEffect(() => {
    if (currentSelection !== 'all') {
      if (searchInput === '') {
        setFilteredPlaces(allPlaces);
      } else {
        const filtered = allPlaces.filter((place) =>
          place.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredPlaces(filtered);
      }
    }
  }, [searchInput, allPlaces, currentSelection]);

  const handleSearch = async () => {
    if (currentSelection === 'all' && searchInput.trim() && locationPermission) {
      setIsLoading(true);
      try {
        const places = await nearbyPlaces(searchInput, currentSelection, currentLocation);
        setAllPlaces(places);
        setFilteredPlaces(places);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderPlaces = () => {
    return filteredPlaces.map((place) => (
      <PlacesList key={place.id} place={place} redirectDescriptionScreen={redirectDescriptionScreen} />
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Type to search"
            value={searchInput}
            onChangeText={(text) => setSearchInput(text)}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
            <FontAwesome name="search" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.toggleButtons}>
          <TouchableOpacity
            style={currentSelection === 'restaurants' ? styles.activeButton : styles.inactiveButton}
            onPress={() => setCurrentSelection('restaurants')}>
            <Text style={styles.toggleText}>Restaurants</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={currentSelection === 'tourist_attraction' ? styles.activeButton : styles.inactiveButton}
            onPress={() => setCurrentSelection('tourist_attraction')}>
            <Text style={styles.toggleText}>Destinations</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={currentSelection === 'all' ? styles.activeButton : styles.inactiveButton}
            onPress={() => setCurrentSelection('all')}>
            <Text style={styles.toggleText}>Search All</Text>
          </TouchableOpacity>
        </View>

        {currentSelection !== 'all' && (
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={20}
              step={1}
              value={sliderValue.current}
              onValueChange={(value) => (sliderValue.current = value)}
              onSlidingComplete={(value) => setRadius(value)}
              minimumTrackTintColor="#000"
              maximumTrackTintColor="#ccc"
              thumbTintColor="#000"
            />
            <Text style={styles.sliderLabel}>{radius} K.M.</Text>
          </View>
        )}

        {!locationPermission ? (
          <Text>Please provide access to your location for results</Text>
        ) : isLoading ? (
          <LoadingAnimation message="Loading Places Nearby" />
        ) : (
          <View style={styles.placesList}>
            {filteredPlaces.length > 0 ? renderPlaces() : 
              <Text style={styles.noResultsText}>No results found</Text>
            }
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
  toggleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    gap: 5,
  },
  activeButton: {
    backgroundColor: '#f16d26',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  inactiveButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  slider: {
    flex: 1,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  placesList: {
    marginTop: 10,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});