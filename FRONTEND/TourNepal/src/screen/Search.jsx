import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Slider from '@react-native-community/slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import PlacesList from '../components/PlacesList';
import { nearbyPlaces } from '../utils/nearbyPlaces';
import LoadingAnimation from '../components/LoadingAnimation';



const Search = () => {
  const [radius, setRadius] = useState(5); //setting initial slider
  const sliderValue = useRef(radius); // Ref to hold slider value without triggering re-rendering
  const [isLoading,setIsLoading] = useState(false); //to show loading page while retrieving data
  const [searchInput, setSearchInput] = useState(''); // search input field
  const [allPlaces, setAllPlaces] = useState([]); //for initializing empty places list
  const [filteredPlaces, setFilteredPlaces] = useState([]); // Filtered places to display
  const [currentSelection,setCurrentSelection] = useState('restaurants');

  const navigation = useNavigation();
  const redirectDescriptionScreen = (place)=>{
    navigation.navigate("Description",{place})
  }

  // Initialize the list of places when the component mounts
  useEffect(() => {

    const getPlaces = async () => {
      setIsLoading(true);
      const places =await nearbyPlaces(radius*1000,currentSelection);
      setIsLoading(false);
      setAllPlaces(places);
      setFilteredPlaces(places); // updating filteredPlaces after setting the places

    }
    getPlaces();
    
  
  }, [radius,currentSelection]);

 
  

  // filtering places based on search input field
  useEffect(() => {
    if (searchInput === '') {
      setFilteredPlaces(allPlaces);
    } else {
      const filtered = allPlaces.filter((place) =>
        place.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredPlaces(filtered);
    }
  }, [searchInput, allPlaces]);

  const renderPlaces = () => {
    return filteredPlaces.map((place) => (
      <PlacesList key={place.id} place={place} redirectDescriptionScreen={redirectDescriptionScreen}/>
    ));
  };

 

  return (
    <View style={styles.container}>
      {/* Search Section */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Type to search"
            value={searchInput}
            onChangeText={(text) => setSearchInput(text)} // updating search input field using useState
          />
          <TouchableOpacity style={styles.searchIcon}>
            <FontAwesome name="search" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Buttons for Restaurants and Destinations */}
        <View style={styles.toggleButtons}>
          <TouchableOpacity style={currentSelection==='restaurants'?styles.activeButton:styles.inactiveButton}
            onPress={()=>setCurrentSelection('restaurants')}>
            <Text style={styles.toggleText}>Restaurants</Text>
          </TouchableOpacity>
          <TouchableOpacity style={currentSelection==='tourist_attraction'?styles.activeButton:styles.inactiveButton}
          onPress={()=>setCurrentSelection('tourist_attraction')}>
            <Text style={styles.toggleText}>Destinations</Text>
          </TouchableOpacity>
        </View>

        {/* Slider Section */}
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={20}
            step={1}
            value={sliderValue.current}
            onValueChange={(value) => (sliderValue.current = value)} // updating ref value
            onSlidingComplete={(value) => setRadius(value)} // updating useState state for radius value when sliding is complete
            minimumTrackTintColor="#000"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#000"
          />
          <Text style={styles.sliderLabel}>{radius} K.M.</Text>
        </View>

        {/* List of Places */}
        {/* {!permissionGranted?(<Text>Permission Denied</Text>):(
        isLoading?<LoadingAnimation message="Loading Places Nearby"></LoadingAnimation>:
        <View style={styles.placesList}>{renderPlaces()}</View>) */}
        {
        isLoading?(<LoadingAnimation message="Loading Places Nearby"></LoadingAnimation>):
        (<View style={styles.placesList}>{renderPlaces()}</View>)
        
      }
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
  },
  activeButton: {
    backgroundColor: '#f16d26',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  inactiveButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
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
  
});