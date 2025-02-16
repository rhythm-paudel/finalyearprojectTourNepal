import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const LoadingAnimation = ({ message }) => {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../assets/loading.json')} 
                autoPlay
                loop
                style={styles.animation}
            />
            <Text style={styles.loadingText}>{message}</Text>
        </View>
    );
}

export default LoadingAnimation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    animation: {
        width: 300,
        height: 300,
    },
    loadingText: {
        marginTop: 20,
        fontSize: 18,
        color: '#3498db',
        fontWeight: '600'
    }
})