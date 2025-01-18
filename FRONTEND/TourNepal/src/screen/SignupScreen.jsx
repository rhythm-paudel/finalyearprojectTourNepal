//importing necessary libraries
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; //for icons
import DateTimePicker from '@react-native-community/datetimepicker'; //for picking date
import { useNavigation } from '@react-navigation/native'; //to navigate between screens
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'; //for selecting images or by photo


const SignupScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);

  //setting up form data 
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

  const navigation = useNavigation();

  //dividing filling up the form in multiple pages to avoid crowd in a single screen
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setFormData({ ...formData, dob: selectedDate });
    }
    setShowDatePicker(false);
  };

  //will popup when user clicks on upload image button
  const showImagePickerAlert = (field) => {
    Alert.alert(
      'Upload Image',
      'Choose an option to upload',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Camera',
          onPress: () => handleImagePicker('camera', field),
        },
        {
          text: 'Gallery',
          onPress: () => handleImagePicker('gallery', field),
        },
      ],
      { cancelable: true }
    );
  };


  const handleImagePicker = (type, field) => {
    //defining the nature of media
    const options = {
      mediaType: 'photo',
      includeBase64: true,
    };

    //callback function to perform what after user chooses photo or clicks picture
    const callback = (response) => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].base64; //getting the base64 value of image
        setFormData((prevState) => ({
          ...prevState,
          [field]: selectedImage, //setting the form data with uploaded image
        }));
        setUploadedStatus((prevState) => ({
          ...prevState,
          [field]: true,
        }));
      }
    };

    if (type === 'camera') {
      launchCamera(options, callback);
    } else if (type === 'gallery') {
      launchImageLibrary(options, callback);
    }
  };

  const handleSignup = () => {
    // Do nothing for now
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <KeyboardAvoidingView

          style={styles.content}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
          </View>
          <View style={styles.logoNameContainer}>
            <Text style={styles.logoNameContainerText}>TourNepal</Text>
          </View>

          <View style={styles.fieldsContainer}>
            {currentPage === 1 && (
              <>
                <Text style={styles.signUpText}>Create your account</Text>
                <View style={styles.inputContainer}>
                  <FontAwesome name="envelope" size={20} color="grey" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputField}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <FontAwesome name="calendar" size={20} color="grey" style={styles.inputIcon} />
                  <TouchableOpacity
                    style={styles.inputField}
                    onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.placeholderText}>
                      {formData.dob.toDateString() || 'Select Date of Birth'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {showDatePicker && (
                  <DateTimePicker
                    value={formData.dob}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
                <TouchableOpacity style={styles.loginButton} onPress={handleNextPage}>
                  <Text style={styles.loginButtonText}>Next</Text>
                </TouchableOpacity>
              </>
            )}
            {currentPage === 2 && (
              <>
                <Text style={styles.signUpText}>Secure your account</Text>
                <View style={styles.inputContainer}>
                  <FontAwesome name="lock" size={20} color="grey" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputField}
                    placeholder="Password"
                    secureTextEntry={!passwordVisible}
                    value={formData.password}
                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                  />
                  <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}>
                    <FontAwesome
                      name={passwordVisible ? 'eye' : 'eye-slash'}
                      size={20}
                      color="grey"
                      style={styles.passwordToggleIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                  <FontAwesome name="lock" size={20} color="grey" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputField}
                    placeholder="Confirm Password"
                    secureTextEntry={!confirmPasswordVisible}
                    value={formData.confirmPassword}
                    onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                  />
                  <TouchableOpacity
                    onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                    <FontAwesome
                      name={confirmPasswordVisible ? 'eye' : 'eye-slash'}
                      size={20}
                      color="grey"
                      style={styles.passwordToggleIcon}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleNextPage}>
                  <Text style={styles.loginButtonText}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signupButton} onPress={handlePreviousPage}>
                  <Text style={styles.signupButtonText}>Previous</Text>
                </TouchableOpacity>
              </>
            )}
            {currentPage === 3 && (
              <>
                <Text style={styles.signUpText}>Upload Documents</Text>
                <TouchableOpacity
                  style={[
                    styles.uploadButton,
                    uploadedStatus.passport && styles.uploadButtonWithCheck,
                  ]}
                  onPress={() => showImagePickerAlert('passport')}>
                  {uploadedStatus.passport && (
                    <FontAwesome name="check-circle" size={20} color="green" style={styles.uploadCheckIcon} />
                  )}
                  <Text style={styles.uploadButtonText}> Upload Passport</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.uploadButton,
                    uploadedStatus.visa && styles.uploadButtonWithCheck,
                  ]}
                  onPress={() => showImagePickerAlert('visa')}>
                  {uploadedStatus.visa && (
                    <FontAwesome name="check-circle" size={20} color="green" style={styles.uploadCheckIcon} />
                  )}
                  <Text style={styles.uploadButtonText}> Upload Visa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
                  <Text style={styles.loginButtonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signupButton} onPress={handlePreviousPage}>
                  <Text style={styles.signupButtonText}>Previous</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <TouchableOpacity style={styles.signupButton} onPress={navigateToLogin}>
            <Text style={styles.signupButtonText}>
              Already have an account? <Text style={styles.highlightedText}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <Image source={require('../assets/mountain.png')} style={styles.mountainLogo} />
      </ScrollView>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  logoNameContainer: {
    marginBottom: 20,
  },
  logoNameContainerText: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '500',
    color: '#262626',
  },
  fieldsContainer: {
    width: '90%',
    alignItems: 'center',
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#8a8585',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: '100%',
    height: 50,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
  },
  placeholderText: {
    color: 'grey',
    fontSize: 16,
  },
  passwordToggleIcon: {
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: '#3498db',
    width: '100%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  signupButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#8a8585',
    fontSize: 14,
  },
  highlightedText: {
    color: '#3498db',
    fontWeight: '600',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    width: '100%',
  },
  uploadButtonText: {
    marginLeft: 10,
    color: '#3498db',
    fontSize: 16,
    fontWeight: '600',
  },
  mountainLogo: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
    resizeMode: 'cover',
    marginTop: 10,
  },
  uploadStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  uploadSuccessText: {
    marginLeft: 5,
    color: 'green',
    fontSize: 14,
    fontWeight: '600',
  },
});