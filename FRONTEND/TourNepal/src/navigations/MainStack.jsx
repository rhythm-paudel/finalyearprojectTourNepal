import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'

//screens
import HomeScreen from '../screen/HomeScreen';
import Emergency from '../screen/Emergency';
import Profile from '../screen/Profile';
import NotificationScreen from '../screen/NotificationScreen';

import SearchStack from './SearchStack';

//components
import Header from '../components/Header';

//for bottom navigation bar
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'



const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                header: () => <Header />,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'Emergency') {
                        iconName = focused ? 'warning' : 'warning-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    // returning the icon component
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'orange',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <BottomTab.Screen name="Home" component={HomeScreen} />
            <BottomTab.Screen name="Search" component={SearchStack} />
            <BottomTab.Screen name="Emergency" component={Emergency} />
            <BottomTab.Screen name="Profile" component={Profile} />
        </BottomTab.Navigator>
    )
}

export default function MainStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Bottom tabs */}
        <Stack.Screen name="Tabs" component={TabNavigator} />
        {/* Notification screen stacked creating a new screen with no other tabs */}
        <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Notifications',
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={35}
              color="black"
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      </Stack.Navigator>
    );
  }

