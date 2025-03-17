import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

import React, { useEffect, useState } from 'react'

import { PaperProvider } from 'react-native-paper';

//importing context providers
import { DataProvider } from './src/context/DataProvider';

import {PermissionsAndroid} from 'react-native';


//importing stacks
import RootNavigator from './src/navigations/RootNavigator';
import AuthenticationProvider from './src/context/AuthenticationProvider';
import { AuthServices } from './src/context/AuthServices';

import notifee, { AndroidImportance } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {

  useEffect(() => {
    const initializeNotifee = async () => {
      // Create a notification channel
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });

      // Listen for foreground events
      notifee.onForegroundEvent(({ type, detail }) => {
        if (type === 'press') {
          console.log('User pressed the notification:', detail.notification);
        } else if (type === 'display') {
          console.log('Notification displayed:', detail.notification);
        }
      });

      // Listen for Firebase foreground messages
      messaging().onMessage(async remoteMessage => {
        console.log('Received message:', remoteMessage);
        const { title, body } = remoteMessage.notification;

        // Display the notification using Notifee
        await notifee.displayNotification({
          title: title,
          body: body,
          android: {
            channelId: 'default',
            importance: AndroidImportance.HIGH,
          },
        });
      });
    };

    initializeNotifee();
  }, []);
  
  
  return (

    <PaperProvider>
      <AuthenticationProvider>
        <DataProvider>
          <AuthServices>
            <RootNavigator />
          </AuthServices>
        </DataProvider>
      </AuthenticationProvider>

    </PaperProvider>

  )
}

export default App

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})