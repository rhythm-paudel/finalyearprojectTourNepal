import {StyleSheet, PermissionsAndroid, View} from 'react-native';
import React, {useState, useEffect, createContext} from 'react';
import {getToken} from '../utils/TokenStorage';
import {checkUserToken} from '../api/authService';
import {decodedToken} from '../utils/decodeToken';

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
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setCurrentLocation({"location":{latitude:location.latitude,longitude:location.longitude}});
        
        console.log(currentLocation);
        
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
      setLocationPermission(false);
    }
  };

  //initilizing user and their location
  useEffect(() => {
    const checkToken = async () => {
      setIsLoading(true);
      const tokens = await getToken();

      if (tokens && tokens.encryptedToken && tokens.accessToken) {
        const response = await checkUserToken(tokens.encryptedToken); //waiting for response from the backend

        if (response?.status === 200) {
          let accessToken = decodedToken(tokens.accessToken);
          setCurrUser(accessToken); //setting the user session if the token is validated
         
          
          setIsAuthenticated(true);
          await saveUserLocation();
        }
        //if the access token is not 200 then everything else is set to false
        else {
          setIsAuthenticated(false);
        }
      } else {
        setIsLoading(false);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

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
        locationPermission
      }}>
      {children}
    </AuthenticationProviderContext.Provider>
  );
};

export default AuthenticationProvider;

const styles = StyleSheet.create({});
