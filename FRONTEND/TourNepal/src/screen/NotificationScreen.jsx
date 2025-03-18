import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import NotificationCards from '../components/NotificationCards';
import { getNotifications } from '../api/authService';
import { getToken } from '../utils/TokenStorage';

const NotificationScreen = ({isBack}) => {

  //useeffect
useEffect(()=>{
  const fetchNotifications = async () => {
    const token =await getToken();
    const response = await getNotifications(token.accessToken);
    console.log(token);
    
    console.log(response?.data);
    if(response?.status===200){
      setNotifications(response?.data.notifications);
    }
    
  }
  fetchNotifications();
},[])


  const [notifications,setNotifications] =useState( [ //retreiving list of notifications (static as of now)
    { title: 1, messagetype: 'Alert', message: 'Flood near Thankot area'},
    { title: 2, messagetype: 'Information', message: 'Your profile has been successfully verified'},
    { title: 3, messagetype: 'Alert', message: 'Flood near Thankot area'},
    { title: 4, messagetype: 'Information', message: 'Your profile has been successfully verified'},
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
        {renderNotifications()}
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