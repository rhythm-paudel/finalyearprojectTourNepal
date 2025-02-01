import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screen/LoginScreen';
import SignupScreen from '../screen/SignupScreen';

const Stack = createNativeStackNavigator(); //creating stack


//for only stacking login and signup screen, when signed up or logged in this will be removed from the stack
export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}