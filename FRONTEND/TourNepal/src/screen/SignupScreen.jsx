import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Animated, Alert, KeyboardAvoidingView } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; //for icons
import { useNavigation } from '@react-navigation/native'; //for picking date
import * as Animatable from 'react-native-animatable'; //to navigate between screens
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'; //for selecting images or by photo

const SignupScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  //setting up form data to keep the data consistent
  const [formData, setFormData] = useState({
    email: '',
    dob: new Date(),
    password: '',
    confirmPassword: '',
    passport: null,
    visa: null,
  });
  //for showing checkmarks
  const [uploadedStatus, setUploadedStatus] = useState({ passport: false, visa: false });
  const [showDatePicker, setShowDatePicker] = useState(false);

  //for toggling between visibility of password
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [inputFocus, setInputFocus] = useState({ email: false, password: false, confirmPassword: false });
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const emailScale = useRef(new Animated.Value(1)).current;
  const passwordScale = useRef(new Animated.Value(1)).current;
  const confirmPasswordScale = useRef(new Animated.Value(1)).current;

  //for animating the screen when first loaded
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  //to focus on the input fields when clicked
  const handleFocus = (field, scaleRef) => {
    setInputFocus({ ...inputFocus, [field]: true });
    Animated.spring(scaleRef, {
      toValue: 1.02,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = (field, scaleRef) => {
    setInputFocus({ ...inputFocus, [field]: false });
    Animated.spring(scaleRef, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  //to update the change in date
  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) setFormData({ ...formData, dob: selectedDate });
    setShowDatePicker(false);
  };

  //will popup when user clicks on upload image button
  const showImagePickerAlert = (field) => {
    Alert.alert(
      'Upload Image',
      'Choose an option',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Camera', onPress: () => handleImagePicker('camera', field) },
        { text: 'Gallery', onPress: () => handleImagePicker('gallery', field) },
      ]
    );
  };

  const handleImagePicker = (type, field) => {
    //defining the nature of media
    const options = { mediaType: 'photo', includeBase64: true };

    //callback function to perform what after user chooses photo or clicks picture
    const callback = (response) => {
      if (response.assets?.[0]?.base64) {
        setFormData(prev => ({ ...prev, [field]: response.assets[0].base64 })); //getting the base64 value of image
        setUploadedStatus(prev => ({ ...prev, [field]: true })); //setting the form data with uploaded image
      }
    };
    type === 'camera' ? launchCamera(options, callback) : launchImageLibrary(options, callback);
  };



  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Animatable.View animation="fadeInDown" duration={1000} style={styles.logoContainer}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
          </Animatable.View>

          <Animatable.Text animation="fadeInDown" duration={1000} style={styles.logoNameContainerText}>
            TourNepal
          </Animatable.Text>

          <KeyboardAvoidingView style={styles.fieldsContainer} behavior="padding">
            {currentPage === 1 && (
              <>
                <Animatable.Text animation="fadeInUp" duration={800} style={styles.signInText}>
                  Create your account
                </Animatable.Text>

                <Animated.View style={[
                  styles.inputContainer,
                  { borderColor: inputFocus.email ? '#3498db' : '#ccc', transform: [{ scale: emailScale }] }
                ]}>
                  <FontAwesome name="envelope" size={20} color={inputFocus.email ? '#3498db' : 'grey'} />
                  <TextInput
                    value={formData.email}
                    style={styles.inputField}
                    placeholder="Email"
                    placeholderTextColor="#888"
                    keyboardType="email-address"
                    onFocus={() => handleFocus('email', emailScale)}
                    onBlur={() => handleBlur('email', emailScale)}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                  />
                </Animated.View>

                <Animated.View style={[
                  styles.inputContainer,
                  { borderColor: '#ccc', transform: [{ scale: 1 }] }
                ]}>
                  <FontAwesome name="calendar" size={20} color="grey" />
                  <TouchableOpacity
                    style={styles.inputField}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={[styles.placeholderText, { marginLeft: 10 }]}>
                      Date of Birth: {formData.dob.toDateString()}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>

                {showDatePicker && (
                  <DateTimePicker
                    value={formData.dob}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}

                <TouchableOpacity style={styles.loginButton} onPress={() => setCurrentPage(2)}>
                  <Text style={styles.loginButtonText}>Next</Text>
                </TouchableOpacity>
              </>
            )}

            {currentPage === 2 && (
              <>
                <Animatable.Text animation="fadeInUp" duration={800} style={styles.signInText}>
                  Secure your account
                </Animatable.Text>

                <Animated.View style={[
                  styles.inputContainer,
                  { borderColor: inputFocus.password ? '#3498db' : '#ccc', transform: [{ scale: passwordScale }] }
                ]}>
                  <FontAwesome name="lock" size={20} color={inputFocus.password ? '#3498db' : 'grey'} />
                  <TextInput
                    value={formData.password}
                    style={styles.inputField}
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry={!passwordVisible}
                    onFocus={() => handleFocus('password', passwordScale)}
                    onBlur={() => handleBlur('password', passwordScale)}
                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                  />
                  <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <FontAwesome
                      name={passwordVisible ? "eye" : "eye-slash"}
                      size={20}
                      color={inputFocus.password ? '#3498db' : 'grey'}
                    />
                  </TouchableOpacity>
                </Animated.View>

                <Animated.View style={[
                  styles.inputContainer,
                  { borderColor: inputFocus.confirmPassword ? '#3498db' : '#ccc', transform: [{ scale: confirmPasswordScale }] }
                ]}>
                  <FontAwesome name="lock" size={20} color={inputFocus.confirmPassword ? '#3498db' : 'grey'} />
                  <TextInput
                    style={styles.inputField}
                    value={formData.confirmPassword}
                    placeholder="Confirm Password"
                    placeholderTextColor="#888"
                    secureTextEntry={!confirmPasswordVisible}
                    onFocus={() => handleFocus('confirmPassword', confirmPasswordScale)}
                    onBlur={() => handleBlur('confirmPassword', confirmPasswordScale)}
                    onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                  />
                  <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                    <FontAwesome
                      name={confirmPasswordVisible ? "eye" : "eye-slash"}
                      size={20}
                      color={inputFocus.confirmPassword ? '#3498db' : 'grey'}
                    />
                  </TouchableOpacity>
                </Animated.View>

                <View style={styles.buttonGroup}>
                  <TouchableOpacity style={[styles.navButton, { marginRight: 10 }]} onPress={() => setCurrentPage(1)}>
                    <Text style={styles.navButtonText}>Previous</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.navButton} onPress={() => setCurrentPage(3)}>
                    <Text style={styles.navButtonText}>Next</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {currentPage === 3 && (
              <>
                <Animatable.Text animation="fadeInUp" duration={800} style={styles.signInText}>
                  Upload Documents
                </Animatable.Text>

                <TouchableOpacity
                  style={[styles.uploadButton, uploadedStatus.passport && styles.uploadButtonWithCheck]}
                  onPress={() => showImagePickerAlert('passport')}
                >
                  {uploadedStatus.passport && (
                    <FontAwesome name="check-circle" size={20} color="green" style={styles.uploadCheckIcon} />
                  )}
                  <Text style={styles.uploadButtonText}>Upload Passport</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.uploadButton, uploadedStatus.visa && styles.uploadButtonWithCheck]}
                  onPress={() => showImagePickerAlert('visa')}
                >
                  {uploadedStatus.visa && (
                    <FontAwesome name="check-circle" size={20} color="green" style={styles.uploadCheckIcon} />
                  )}
                  <Text style={styles.uploadButtonText}>Upload Visa</Text>
                </TouchableOpacity>

                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={[styles.navButton, { marginRight: 10 }]}
                    onPress={() => setCurrentPage(2)}
                  >
                    <Text style={styles.navButtonText}>Previous</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => navigation.navigate('Homescreen')}
                  >
                    <Text style={styles.navButtonText}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            <Animatable.View animation="fadeInUp" duration={800} style={styles.signupButton}>
              <Text style={styles.signupButtonText}>
                Already have an account?{' '}
                <Text style={styles.highlightedText} onPress={() => navigation.navigate("Login")}>
                  Sign In
                </Text>
              </Text>
            </Animatable.View>
          </KeyboardAvoidingView>
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
  placeholderText: {
    color: "#888",
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
  buttonGroup: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    width: "100%",
    justifyContent: 'center',
  },
  uploadButtonText: {
    color: "#3498db",
    fontSize: 16,
    fontWeight: "600",
  },
  uploadButtonWithCheck: {
    backgroundColor: '#e3f2fd',
  },
  uploadCheckIcon: {
    position: 'absolute',
    left: 15,
  },
  mountainLogo: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
    resizeMode: "cover",
    marginTop: 20,
  },
});

export default SignupScreen;