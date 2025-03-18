import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import NotificationCards from '../components/NotificationCards';
import { getNotifications, refreshToken } from '../api/authService';
import { getToken, storeTokens } from '../utils/TokenStorage';
import LoadingAnimation from '../components/LoadingAnimation';

const NotificationScreen = ({isBack}) => {

  const [isLoading, setIsLoading] = useState(true);

  //useeffect
useEffect(()=>{
  const fetchNotifications = async () => {
    const token =await getToken();
    const response = await getNotifications(token.accessToken);

    
    console.log(response?.status);
    if(response?.status===200){
      setNotifications(response?.data.notifications);
      setIsLoading(false);
    }else if(response?.status===403){
      setIsLoading(true);
      const newToken =await refreshToken(token.encryptedToken);
      if (newToken?.status === 200) {
        storeTokens(newToken.data.accessToken, token.encryptedToken);
        const response = await getNotifications(newToken.data.accessToken);
        if(response?.status===200){
          setNotifications(response?.data.notifications);
          setIsLoading(false);
        }
      }

    }

    setIsLoading(false);
    
  }
  fetchNotifications();
},[])


  const [notifications,setNotifications] =useState( [ //retreiving list of notifications (static as of now)
   
  ]);

  const renderNotifications = () => { //component for retrieving notifications
    let keyID = 0
    return notifications.slice(-5).reverse().map((notification) => (
      <NotificationCards key={keyID++} notification={notification}/>
    ));
  };

  return (
    <View style={styles.container}>
      {/* Notification Section */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Notifications</Text>
        {isLoading ? <LoadingAnimation message="Loading Notifications"/>:
        renderNotifications()}
      </ScrollView>
    </View>
  );

  
};



export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 20,
    textAlign: 'center',
  }
});