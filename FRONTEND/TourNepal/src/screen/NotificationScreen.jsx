import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import NotificationCards from '../components/NotificationCards';

const NotificationScreen = () => {
  const notifications = [ //retreiving list of notifications (static as of now)
    { id: 1, type: 'Alert', message: 'Flood near Thankot area'},
    { id: 2, type: 'Information', message: 'Your profile has been successfully verified'},
    { id: 3, type: 'Alert', message: 'Flood near Thankot area'},
    { id: 4, type: 'Information', message: 'Your profile has been successfully verified'},
  ];

  const renderNotifications = () => { //component for retrieving notifications
    return notifications.map((notification) => (
      <NotificationCards key={notification.id} notification={notification}/>
    ));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Notification Section */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Notifications</Text>
        {renderNotifications()}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation />
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