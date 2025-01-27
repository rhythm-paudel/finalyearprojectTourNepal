import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

const NotificationScreen = () => {
  const notifications = [ //retreiving list of notifications (static as of now)
    { id: 1, type: 'Alert', message: 'Flood near Thankot area', color: '#f8d7da' },
    { id: 2, type: 'Information', message: 'Your profile has been successfully verified', color: '#d1ecf1' },
    { id: 3, type: 'Alert', message: 'Flood near Thankot area', color: '#f8d7da' },
    { id: 4, type: 'Information', message: 'Your profile has been successfully verified', color: '#d1ecf1' },
  ];

  const renderNotifications = () => { //component for retrieving notifications (will be placed in the main return section)
    return notifications.map((notification) => (
      <View
        key={notification.id}
        style={[styles.notificationCard, { backgroundColor: notification.color }]}
      >
        <Text style={styles.notificationType}>{notification.type}!!!</Text>
        <Text style={styles.notificationMessage}>{notification.message}</Text>
      </View>
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
  },
  notificationCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  notificationType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#721c24',
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 16,
    color: '#555',
  },
});