import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'


import LoginScreen from './src/screen/LoginScreen';
import SignupScreen from './src/screen/SignupScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screen/HomeScreen';
import Search from './src/screen/Search';
import DescriptionScreen from './src/screen/DescriptionScreen';
import Emergency from './src/screen/Emergency';
import Profile from './src/screen/Profile';
import NotificationScreen from './src/screen/NotificationScreen';

const Stack = createNativeStackNavigator();
const App = () => {
  return (

      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown:false,
          }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Homescreen" component={HomeScreen} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Description" component={DescriptionScreen} />
            <Stack.Screen name="Emergency" component={Emergency} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>

  )
}

export default App

const styles = StyleSheet.create({})