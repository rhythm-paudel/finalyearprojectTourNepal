import {getDescriptionOfPalce, getNearbyPlaces} from '../api/authService';
import { postComment,updateComment,removeComment } from '../api/authService';
import { getToken } from './TokenStorage';
import { getPlaceReviews } from '../api/authService';

//for getting nearby places
export const nearbyPlaces = async (
  radii,
  currentSelection,
  currentLocation,
) => {
  const locationDetail = {
    location: currentLocation.location,
    radius: radii,
    destinationType: currentSelection,
  };

  try {
    const places = [];
    const response = await getNearbyPlaces(locationDetail);
    if (response.status === 200) {
      const place = response.data.ref;
      for (let i = 0; i < place.length; i++) {
        places.push({
          id: `${place[i].location.latitude},${place[i].location.longitude}`,
          name: place[i].name,
          rating: `⭐ (${place[i].rating}/5)`,
          reviews: 0,
          photo: place[i].photoRef,
          description: place[i].description,
        });
      }

      return places;
    } else {
      console.log(response?.data);
      return [];
    }
  } catch (e) {
   
    
    return [];
  }
};


//for getting description of places
export const getDescription = async (placeName)=>{
  const desscription = await getDescriptionOfPalce(placeName);
  return desscription
}


//location function
export const getLocation = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  ).catch(err => {
    console.log(err);
  });
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

//check permission
export const checkPermission = async () => {
  let granted = await getLocation();

};



//reviews section for places

//for adding comment
export const addComment = async(comment,location,name)=>{
  const accessToken =await getToken();
  
  const [longitude,latitude] = location.split(',')
  const formattedLocation = {"location":{
    "latitude":parseFloat(latitude),
    "longitude":parseFloat(longitude)
  }}

  
  const posted = await postComment(formattedLocation,comment,accessToken.accessToken,name);
  
  return posted;
}

//for editing comment
export const editComment = async(location,editedReview,commentID)=>{
  const accessToken =await getToken();
  const [longitude,latitude] = location.split(',')
  const formattedJson = {
    'location':{
      'latitude':parseFloat(latitude),
      'longitude':parseFloat(longitude)
    },
    'commentBody':editedReview,
    'commentID':commentID
  }

  const response = await updateComment(formattedJson,accessToken.accessToken);
  return response
}

//for deleting comment
export const deleteComment = async(location,commentID)=>{
  const accessToken =await getToken();

  
  const [longitude,latitude] = location.split(',')
  const formattedJson = {
    'location':{
      'latitude':parseFloat(latitude),
      'longitude':parseFloat(longitude)
    },
    'commentID':commentID
  }

  const response = await removeComment(formattedJson,accessToken.accessToken);
  return response
}


//for getting all the reviews
export const getReviews = async(location)=>{
  const [longitude,latitude] = location.split(',')

  const reviews = await getPlaceReviews(latitude,longitude);

  return reviews
}
