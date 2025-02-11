import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'

import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { AuthenticationProviderContext } from '../context/AuthenticationProvider';

//react-native imports
import { ActivityIndicator } from 'react-native-paper';
import { StyleSheet,View,Text } from 'react-native';

const RootStack = createNativeStackNavigator(); //creating stack


//for only stacking login and signup screen, when signed up or logged in this will be removed from the stack
export default function RootNavigator() {
    const { isAuthenticated, isLoading } = useContext(AuthenticationProviderContext)

    if (isLoading) { //spinning loading animation using activity indicator from react-native
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3498db" />
                <Text>Tour Nepal...</Text>
            </View>
        );
    }

    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{
                headerShown: false,
            }}>
                {/*AuthStack */}
                {!isAuthenticated ?
                    (<><RootStack.Screen name="Auth" component={AuthStack} />
                    <RootStack.Screen name="Mainstack" component={MainStack} />
                    </>) :
                    <RootStack.Screen name="Mainstack" component={MainStack} />
                }
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});