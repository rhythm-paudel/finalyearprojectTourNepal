import {StyleSheet, PermissionsAndroid, View} from 'react-native';
import React, {useState, useEffect, createContext} from 'react';
import {getToken,storeTokens} from '../utils/TokenStorage';
import {checkUserToken} from '../api/authService';
import {decodedToken} from '../utils/decodeToken';
import { fetchUserDetails,refreshToken } from "../api/authService";


//importing GetLocation for getting current location
import GetLocation from 'react-native-get-location';

export const AuthenticationProviderContext = createContext();

const AuthenticationProvider = ({children}) => {
  const [currUser, setCurrUser] = useState({}); //for maintaining user session throughout the application
  const [currentLocation, setCurrentLocation] = useState({}); //for  current location of the user
  const [locationPermission, setLocationPermission] = useState(false); //check if the location permission is granted
  const [isAuthenticated, setIsAuthenticated] = useState(false); //for updating if any user is currently logged in
  const [isLoading, setIsLoading] = useState(false); //for spinning animation

  //location functions to get current location

  //getting current location
  const gettingCurrentLocation = async () => {
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setCurrentLocation({"location":{latitude:location.latitude,longitude:location.longitude}});
        
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  //requesting location permission
  const getLocationAccess = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).catch(err => {
      console.log(err);
    });
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  //saving location of the user
  const saveLocation = async () => {
    let granted = await getLocationAccess();
    if (granted) {
      setLocationPermission(true);
        gettingCurrentLocation();
       
        
    } else {  
      console.log("user current location not granted"); 
      setLocationPermission(false);
    }
  };

  //function for getting user details 
  const getUserDetail = async ()=>{

    let encryptedToken =await getToken();
    const response = await fetchUserDetails(encryptedToken.accessToken);
    if(response?.status===403){ //if the current access token is expired

        const accessToken = await refreshToken(encryptedToken.encryptedToken); //requesting new accessToken
        if(accessToken?.status===200){
         
            storeTokens(accessToken.data.accessToken,encryptedToken.encryptedToken);

            encryptedToken = await getToken();
         
            
            const newResponse = await fetchUserDetails(encryptedToken.accessToken); //re-requesting user details
            return newResponse;
        }else{ //incase if the refresh token is also expired

            return response;
        }
    }

    
    return response;
}

  //initilizing user and their location
  useEffect(() => {

    
    const checkToken = async () => {
      setIsLoading(true);
      try{
        const tokens = await getToken();
        
        if (tokens && tokens.encryptedToken && tokens.accessToken) {
          console.log(tokens)
          const response = await checkUserToken(tokens.encryptedToken); //waiting for response from the backend

          if (response?.status === 200) {
            let accessToken = decodedToken(tokens.accessToken);
            const details = await getUserDetail();
            if(details?.status===200){
              setCurrUser(details.data); //setting the user session if the token is validated

            
              setIsAuthenticated(true);
            }else{
              setIsAuthenticated(false);
            }
            
            await saveUserLocation();
          }
          //if the refresh  token is expirted then everything else is set to false and user has to re login
          else {
            setIsAuthenticated(false);
          }
        } else {
          setIsLoading(false);
          setIsAuthenticated(false);
        }

        
        setIsLoading(false);
      }catch(e){
        setIsLoading(false)
      }
  }

    const saveUserLocation = async () => {
        await saveLocation();
    }

  
    checkToken();
 
  }, []);

  

  return (
    //setting required context value in globally in order to make changes
    <AuthenticationProviderContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        currUser,
        setCurrUser,
        setIsAuthenticated,
        currentLocation,
        locationPermission,
        getUserDetail,
        saveLocation,
        currentLocation
      }}>
      {children}
    </AuthenticationProviderContext.Provider>
  );
};

export default AuthenticationProvider;

const styles = StyleSheet.create({});
