import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // animation values for input scaling
  const emailScale = useRef(new Animated.Value(1)).current;
  const passwordScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleEmailFocus = () => {
    setEmailFocus(true);
    Animated.spring(emailScale, {
      toValue: 1.02,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const handleEmailBlur = () => {
    setEmailFocus(false);
    Animated.spring(emailScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const handlePasswordFocus = () => {
    setPasswordFocus(true);
    Animated.spring(passwordScale, {
      toValue: 1.02,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const handlePasswordBlur = () => {
    setPasswordFocus(false);
    Animated.spring(passwordScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

   //redirecting to login
  const redirectRegister = () => {
    navigation.navigate("Signup");
  };

  //redirecting to homescreen
  const redirectHomescreen = () => {
    navigation.navigate("Mainstack");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Animatable.View
            animation="fadeInDown"
            duration={1000}
            style={styles.logoContainer}
          >
            <Image source={require("../assets/logo.png")} style={styles.logo} />
          </Animatable.View>

          <Animatable.Text 
            animation="fadeInDown"
            duration={1000}
            style={styles.logoNameContainerText}
          >
            TourNepal
          </Animatable.Text>

          <View style={styles.fieldsContainer}>
            <Animatable.Text 
              animation="fadeInUp"
              duration={800}
              style={styles.signInText}
            >
              Sign in to your account
            </Animatable.Text>

            <Animated.View 
              style={[
                styles.inputContainer, 
                { 
                  borderColor: emailFocus ? '#3498db' : '#ccc',
                  transform: [{ scale: emailScale }] 
                }
              ]}
            >
              <FontAwesome name="user" size={20} color={emailFocus ? '#3498db' : 'grey'} />
              <TextInput
                style={styles.inputField}
                placeholder="Email"
                placeholderTextColor="#888"
                keyboardType="email-address"
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
              />
            </Animated.View>

            <Animated.View 
              style={[
                styles.inputContainer, 
                { 
                  borderColor: passwordFocus ? '#3498db' : '#ccc',
                  transform: [{ scale: passwordScale }] 
                }
              ]}
            >
              <FontAwesome name="lock" size={20} color={passwordFocus ? '#3498db' : 'grey'} />
              <TextInput
                style={styles.inputField}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry={!passwordVisible}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <FontAwesome
                  name={passwordVisible ? "eye" : "eye-slash"}
                  size={20}
                  color={passwordFocus ? '#3498db' : 'grey'}
                />
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity 
              style={styles.loginButton}
              onPress={redirectHomescreen}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <Animatable.View 
              animation="fadeInUp"
              duration={800}
              style={styles.signupButton}
            >
              <Text style={styles.signupButtonText}>
                Don't have an account?{' '}
                <Text style={styles.highlightedText} onPress={redirectRegister}>
                  Sign Up
                </Text>
              </Text>
            </Animatable.View>
          </View>
        </Animated.View>

        <Animatable.Image 
          source={require("../assets/mountain.png")} 
          style={styles.mountainLogo}
          animation="fadeInUp"
          duration={1200}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  logoNameContainerText: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: '500',
    color: "#262626",
    marginBottom: 20,
  },
  fieldsContainer: {
    width: "85%",
    alignItems: "center",
  },
  signInText: {
    textAlign: "center",
    fontSize: 18,
    color: "#8a8585",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: "100%",
    height: 50,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: "#262626",
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: "#3498db",
    width: "100%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#3498db",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  signupButton: {
    marginTop: 15,
    alignItems: "center",
  },
  signupButtonText: {
    color: "#8a8585",
    fontSize: 14,
  },
  highlightedText: {
    color: "#3498db",
    fontSize: 16,
    fontWeight: "600",
  },
  mountainLogo: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
    resizeMode: "cover",
    marginTop: 20,
  },
});

export default LoginScreen;