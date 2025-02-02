import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'

import AuthStack from './AuthStack';
import MainStack from './MainStack';

const RootStack = createNativeStackNavigator(); //creating stack


//for only stacking login and signup screen, when signed up or logged in this will be removed from the stack
export default function RootNavigator() {
    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{
                headerShown: false,
            }}>
                {/*AuthStack */}
                <RootStack.Screen name="Auth" component={AuthStack} />
                <RootStack.Screen name="Mainstack" component={MainStack} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}