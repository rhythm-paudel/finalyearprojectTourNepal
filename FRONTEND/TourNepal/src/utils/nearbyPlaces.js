import {getNearbyPlaces} from '../api/authService';
import { postComment,updateComment,removeComment } from '../api/authService';
import { getToken } from './TokenStorage';
import { getPlaceReviews } from '../api/authService';

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
      return [];
    }
  } catch (e) {
    return [];
  }
};

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

export const getReviews = async(location)=>{
  const [longitude,latitude] = location.split(',')

  const reviews = await getPlaceReviews(latitude,longitude);

  return reviews
}
