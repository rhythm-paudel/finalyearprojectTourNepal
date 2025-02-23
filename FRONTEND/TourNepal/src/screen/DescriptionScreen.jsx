import { useRoute } from '@react-navigation/native';
import React,{useEffect, useState} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Linking, ScrollView,TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useContext } from 'react';
import { AuthenticationProviderContext } from '../context/AuthenticationProvider';
import { addComment } from '../utils/nearbyPlaces';

const DescriptionScreen = () => {
  const [comment, setComment] = useState('');
  const route = useRoute();
    const {place} = route.params;
  const navigateToGoogleMaps = () => { //redirects to google maps if installed else redirects to website for that location
    const coordinates = place.id
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates}`;
    Linking.openURL(googleMapsUrl);
  };
  const {currUser} = useContext(AuthenticationProviderContext) //for checking if the user is verified for posting a comment
  const [verified,setVerified] = useState(false); //for checking if the user is verified for posting a comment


  useEffect(() => {
    if(currUser.verificationStatus){
      setVerified(true);
    }
    console.log(currUser.verificationStatus);
    
  },[]);

  const handleComment = async (postType) => {
    await addComment(comment,place.id);
  };



  return (
    // description screen model (everything is static as of now)
    <View style={styles.container}>
      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Destination Section */}
        <Image
          source={place.photo
            ? { uri: place.photo }
            : require('../assets/placeholder.png')} 
          style={styles.destinationImage}
        />
        <View style={styles.destinationInfo}>
          <Text style={styles.destinationTitle}>{place.name}</Text>
          <Text style={styles.rating}>
          {place.rating}
          </Text>
          <TouchableOpacity style={styles.navigateButton} onPress={navigateToGoogleMaps}>
            <Text style={styles.navigateButtonText}>Navigate</Text>
          </TouchableOpacity>
          <Text style={styles.destinationDescription}>
            {place.description?place.description:"Description is not available for restaurants"}
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

        {/* Comment section */}
        <View style={styles.commentSection}>
          <TextInput
            style={[styles.commentInput, !verified && styles.disabledInput]}
            placeholder={verified ? "Add a comment" : "Document needs to be approved before posting a review"}
            value={comment}
            onChangeText={setComment}
            editable={verified}
            placeholderTextColor={!verified ? '#888' : '#ccc'}
          />
          <TouchableOpacity style={[styles.commentButton, !verified && styles.disabledButton]}
          onPress={verified ?()=> handleComment('add') : null}
          disabled={!verified}>
            
            <Text style={[styles.commentButtonText, !verified && styles.disabledButtonText]}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  commentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  commentButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
    color: '#888',
  },
  disabledButton: {
    backgroundColor: '#a0a0a0',
  },
  disabledButtonText: {
    color: '#ddd',
  }
});