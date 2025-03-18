import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NotificationCards = ({notification}) => {
    const alertColor = '#f8d7da';
    const infoColor = '#d1ecf1';
  return (
    <View
        key={notification.id}
        style={[styles.notificationCard, { backgroundColor: notification.messagetype==='Alert'?alertColor:infoColor }]} // To determine the color of the body of notification for clarification
      >
        <Text style={styles.notificationType}>{notification.title}!!!</Text>
        <Text style={styles.notificationMessage}>{notification.message}</Text>
      </View>
  )
}

export default NotificationCards

const styles = StyleSheet.create({
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
})