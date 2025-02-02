import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'

//screens
import HomeScreen from '../screen/HomeScreen';
import Search from '../screen/Search';
import DescriptionScreen from '../screen/DescriptionScreen';
import Emergency from '../screen/Emergency';
import Profile from '../screen/Profile';
import NotificationScreen from '../screen/NotificationScreen';


const Stack = createNativeStackNavigator(); //creating stack

export default function MainStack()  {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Homescreen" component={HomeScreen} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Description" component={DescriptionScreen} />
            <Stack.Screen name="Emergency" component={Emergency} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
        </Stack.Navigator>
    )
}

