import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'


import LoginScreen from './src/screen/LoginScreen';
import SignupScreen from './src/screen/SignupScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {PaperProvider } from 'react-native-paper';

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
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>

  )
}

export default App

const styles = StyleSheet.create({})