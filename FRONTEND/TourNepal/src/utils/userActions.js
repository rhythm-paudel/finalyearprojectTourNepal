import { deleteRequest as deletionRequest} from "../api/authService";
import { getToken as requestToken } from "./TokenStorage";
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { updateTokenNotification } from "../api/authService";

export const deleteRequest = async () => {

    const token = await requestToken();
    const response = await deletionRequest(token.accessToken);

    return response;
}

export const androidNotificationToken = async()=>{
        let token;
        const requestUserPermission = async () => {
          try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log("Notification permission granted");
            } else {
              console.log("Notification permission denied");
            }
      
            const authStatus = await messaging().requestPermission();
            const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || 
                            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
            if (enabled) {
              console.log('Authorization status:', authStatus);
              return await messaging().getToken();
            } else {
              console.log("Permission not granted for notifications");
              return null;
            }
          } catch (error) {
            console.error("Error requesting permission:", error);
            return null;
          }
        };
        return await requestUserPermission();
      
}

export const updateToken = async(notificationToken,accessToken)=>{
    

    
    
    const response = await updateTokenNotification(notificationToken,accessToken);

    return response;
}