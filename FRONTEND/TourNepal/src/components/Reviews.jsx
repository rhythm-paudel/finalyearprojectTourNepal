import { StyleSheet, Text, View,TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-paper';
import { useContext } from 'react';
import { AuthenticationProviderContext } from '../context/AuthenticationProvider';
import { editComment,deleteComment } from '../utils/nearbyPlaces';


const Reviews = ({ review, location,removeComment }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [editedReview, setEditedReview] = useState(review.text);
  const [isEditable, setIsEditable] = useState(false);
  const {currUser} = useContext(AuthenticationProviderContext) //for checking if the user can edit or delete the review

  const handleEdit =async () => {
    if(isEditable){
      const updatedReviewResponse = await editComment(location,editedReview,review._id);
      if(updatedReviewResponse.status===200){
        Alert.alert('Edited Successfully', 'Your review has been edited successfully');
        review.text = editedReview;
      }else if(updatedReviewResponse.status===400){
        Alert.alert('Empty Fields', 'Your review had missing fields');
      }else if(updatedReviewResponse.status===404){
        Alert.alert('Review Not Found', 'The review you are trying to edit does not exist');
      }else{
        Alert.alert('Something went wrong');
      }
      
      
    }
    setIsEditable((prev)=>!prev);
  }

  const handleDelete = async() => {
    const response = await deleteComment(location,review._id)
    if(response.status===200){
      Alert.alert('Deleted Successfully', 'Your review has been deleted successfully');
      removeComment(review._id);
    }else if(response.status===404){
      Alert.alert('Review Not Found', 'The review you are trying to delete does not exist');
    }else{
      console.log(response?.status);
      Alert.alert('Something went wrong');
    }
  }

  useEffect(() => {
    console.log(location);
    
    if(currUser.email===review.email){
      setIsAuthorized(true);
    }
    
  },[editedReview])

  return (
    <View style={styles.reviewCard}>
      <FontAwesome name="user-circle" size={40} color="#888" style={styles.reviewAvatar} />
      <View style={styles.reviewText}>
        <Text style={styles.reviewerName}>{review.firstname} {review.lastname}</Text>
        {isEditable ? (
          <TextInput multiline
            value={editedReview}
            onChangeText={setEditedReview}
            style={styles.reviewContent} />
        ) : (<Text style={styles.reviewContent}>{editedReview}</Text>)}

      </View>
      {isAuthorized && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleEdit} style={styles.button}>
            <FontAwesome name="pencil" size={20} color="#5ac3ed" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.button}>
            <FontAwesome name="trash" size={20} color="#f54242" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default Reviews

const styles = StyleSheet.create({
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
  }, buttonsContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 8,
    padding: 4,
  }
})