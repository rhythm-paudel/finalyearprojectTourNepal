import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Linking, ScrollView, TextInput, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useContext } from 'react';
import { AuthenticationProviderContext } from '../context/AuthenticationProvider';
import { addComment, getDescription, getReviews } from '../utils/nearbyPlaces';
import Reviews from '../components/Reviews';
import { AuthCheck } from '../context/AuthServices';
import { storeTokens, getToken } from '../utils/TokenStorage';
import { refreshToken } from '../api/authService';
import LoadingAnimation from '../components/LoadingAnimation';

const DescriptionScreen = () => {
  const [description, setDescription] = useState('');
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();
  const { place } = route.params;
  const navigateToGoogleMaps = () => { //redirects to google maps if installed else redirects to website for that location
    const coordinates = place.id
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates}`;
    Linking.openURL(googleMapsUrl);
  };
  const { currUser } = useContext(AuthenticationProviderContext) //for checking if the user is verified for posting a comment
  const [verified, setVerified] = useState(false); //for checking if the user is verified for posting a comment


  const removeComment = (commentID) => {
    const updatedReviews = reviews.filter((review) => review._id !== commentID);
    setReviews(updatedReviews);
  }

  useEffect(() => {
   
    if (currUser.verificationStatus === "verified") {


      setVerified(true);
    }
    const review = async () => {
      const response = await getReviews(place.id);
      if (response?.status === 200) {
        setReviews(response.data.reviews);
      } else {
        setReviews([]);
      }
    }
    review();

   


  }, [reviews.length]);

  useEffect(()=>{
    const descriptionOfPlace = async () => {
      setIsLoading(true)
      const response = await getDescription(place.name);
      if (response?.status === 200) {
        setDescription(response.data.description);
      }else{
         setDescription("Description for this place is not available");
      }
      setIsLoading(false)
    }

    descriptionOfPlace();
  },[])

  const handleComment = async () => {
    let encryptedToken =await getToken();
    Alert.alert(
      'Add a review',
      'Confirm your review before posting',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Save',
          onPress: async () => {
            const response = await addComment(comment, place.id,place.name);
            if (response?.status === 201) {
              Alert.alert('Success', 'Comment was added successfully.');
              const newReview = {
                "_id": response.data.review.commentID, "date": response.data.review.date,
                "text": response.data.review.text, "email": response.data.review.email,
                "firstname": response.data.review.firstname, "lastname": response.data.review.lastname
              }
              setReviews(prevState => [...prevState, newReview]);
            }else if(response?.status === 403){ //in case of access token expirattion

              const newToken =await refreshToken(encryptedToken.encryptedToken);
              if (newToken?.status === 200) {
                storeTokens(newToken.data.accessToken, encryptedToken.encryptedToken);
                encryptedToken = await getToken();
                const response = await addComment(comment, place.id,place.name);
                if (response?.status === 201) {
                  Alert.alert('Success', 'Comment was added successfully.');
                  const newReview = {
                    "_id": response.data.review.commentID, "date": response.data.review.date,
                    "text": response.data.review.text, "email": response.data.review.email,
                    "firstname": response.data.review.firstname, "lastname": response.data.review.lastname
                  }
                  setReviews(prevState => [...prevState, newReview]);
                }else{
                  Alert.alert('Something went wrong');
                }
              }else{
                
              }  
            }
            else if (response?.status === 400) {
              Alert.alert('Empty Comment', 'Please provide a valid comment');
            }

            else {

              Alert.alert('Something went wrong');
            }
            setComment('');
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );

  };

  const renderReviews = () => {
    if (reviews.length > 0) {
      return reviews.map(

        (review) => (


          <Reviews key={review._id} review={review} location={place.id} removeComment={removeComment} />
        )
      );
    }
  }



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
          {isLoading?
          <LoadingAnimation message={"Loading description..."} />:<Text style={styles.destinationDescription}>
          {description ? description : "Description is not available for this place"}
        </Text>
        }
        </View>



        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <Text style={styles.reviewsTitle}>Reviews</Text>
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
              onPress={verified ? () => handleComment() : null}
              disabled={!verified}>

              <Text style={[styles.commentButtonText, !verified && styles.disabledButtonText]}>Submit</Text>
            </TouchableOpacity>
          </View>
          {renderReviews()}
        </View>


      </ScrollView>
    </View>
  );
};

export default DescriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  destinationImage: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  destinationInfo: {
    paddingHorizontal: 5,
    marginBottom: 30,
  },
  destinationTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  rating: {
    fontSize: 18,
    color: '#3b82f6',
    marginBottom: 15,
    fontWeight: '500',
  },
  navigateButton: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  navigateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  destinationDescription: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
    marginTop: 10,
  },
  reviewsSection: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 20,
  },
  reviewsTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  reviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  reviewContent: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
  },
  commentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f8fafc',
    color: '#1e293b',
    marginRight: 12,
    minHeight: 50,
  },
  commentButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  commentButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledInput: {
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
    color: '#94a3b8',
  },
  disabledButton: {
    backgroundColor: '#cbd5e1',
  },
  disabledButtonText: {
    color: '#e2e8f0',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 15,
    color: '#64748b',
    fontSize: 16,
  }
});