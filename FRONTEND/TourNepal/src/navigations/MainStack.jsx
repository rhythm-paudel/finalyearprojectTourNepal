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
import ProfileStack from './ProfileStack';



const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
      <BottomTab.Navigator
          screenOptions={({ route }) => ({
              header: () => <Header />,
              tabBarIcon: ({ focused, color}) => {
                  let iconName;
                  let iconSize = 28;

                  if (route.name === 'Home') {
                      iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === 'Search') {
                      iconName = focused ? 'search' : 'search-outline';
                  } else if (route.name === 'Emergency') {
                      iconName = focused ? 'warning' : 'warning-outline';
                  } else if (route.name === 'Profile') {
                      iconName = focused ? 'person' : 'person-outline';
                  }

                  return <Ionicons name={iconName} size={iconSize} color={color} />;
              },
              tabBarActiveTintColor: '#3b82f6', 
              tabBarInactiveTintColor: '#94a3b8', 
              tabBarStyle: {
                  backgroundColor: '#ffffff',
                  borderTopColor: '#e2e8f0',
                  borderTopWidth: 1,
                  height: 60,
                  paddingBottom: 8,
                  paddingTop: 8,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: -2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                  elevation: 8,
              },
              tabBarLabelStyle: {
                  fontSize: 12,
                  fontWeight: '500',
                  marginBottom: 4,
              },
          })}
      >
          <BottomTab.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ tabBarLabel: 'Home' }}
          />
          <BottomTab.Screen 
              name="Search" 
              component={SearchStack} 
              options={{ tabBarLabel: 'Search' }}
          />
          <BottomTab.Screen 
              name="Emergency" 
              component={Emergency} 
              options={{ tabBarLabel: 'Emergency' }}
          />
          <BottomTab.Screen 
              name="Profile" 
              component={ProfileStack} 
              options={{ tabBarLabel: 'Profile' }}
          />
      </BottomTab.Navigator>
  )
}

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={({ navigation }) => ({
              headerShown: true,
              headerTitle: 'Notifications',
              headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: '600',
                  color: '#1e293b',
              },
              headerStyle: {
                  backgroundColor: '#ffffff',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 2,
              },
              headerLeft: () => (
                  <Ionicons
                      name="arrow-back"
                      size={28}
                      color="#3b82f6"
                      style={{ marginLeft: 16 }}
                      onPress={() => navigation.goBack()}
                  />
              ),
          })}
      />
    </Stack.Navigator>
  );
}

