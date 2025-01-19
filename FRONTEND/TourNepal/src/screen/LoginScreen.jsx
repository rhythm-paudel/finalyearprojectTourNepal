import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';


const LoginScreen = () => {
  
  const [passwordVisible, setPasswordVisible] = useState(false); //for toggling visibility of the password

  const navigation = useNavigation();

  //redirecting to login
  const redirectRegister = () =>{
    navigation.navigate("Signup")
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
          </View>
          <View style={styles.logoNameContainer}>
            <Text style={styles.logoNameContainerText}>TourNepal</Text>
          </View>
          <View style={styles.fieldsContainer}>
            <Text style={styles.signInText}>Sign in to your account</Text>
            <View style={styles.inputContainer}>
              <FontAwesome name={"user"} size={20} color="grey" style={styles.inputIcon} />
              <TextInput
                style={styles.inputField}
                placeholder="Email"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputContainer}>
              <FontAwesome name={"lock"} size={20} color="grey" style={styles.inputIcon} />
              <TextInput
                style={styles.inputField}
                placeholder="Password"
                secureTextEntry={!passwordVisible} 
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)} 
              >
                <FontAwesome
                  name={passwordVisible ? "eye" : "eye-slash"} 
                  size={20}
                  color="grey"
                  style={styles.passwordToggleIcon}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signupButton} onPress={redirectRegister}>
              <Text style={styles.signupButtonText}>
                Don't have an account? <Text style={styles.highlightedText}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Image source={require("../assets/mountain.png")} style={styles.mountainLogo} />
        
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

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
    paddingTop: 10,
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
  logoNameContainer: {
    marginBottom: 20,
  },
  logoNameContainerText: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "500",
    color: "#262626",
  },
  fieldsContainer: {
    width: "90%",
    alignItems: "center",
  },
  signInText: {
    textAlign: "center",
    fontSize: 18,
    color: "#8a8585",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25, 
    paddingHorizontal: 15,
    marginBottom: 15,
    width: "100%",
    height: 50,
    backgroundColor: "#f9f9f9", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2, 
  },
  inputIcon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
  },
  passwordToggleIcon: {
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: "#3498db",
    width: "100%",
    padding: 15,
    borderRadius: 25, 
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
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
    marginTop: 10,
  },
});