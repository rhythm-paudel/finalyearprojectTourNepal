import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from '../screen/Search';
import DescriptionScreen from '../screen/DescriptionScreen';

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SearchScreen" component={Search} />
        <Stack.Screen name="Description" component={DescriptionScreen} />
    </Stack.Navigator>
  )
}

export default SearchStack

