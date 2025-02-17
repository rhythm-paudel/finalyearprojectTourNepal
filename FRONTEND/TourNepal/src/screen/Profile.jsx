import React, { useState,useEffect,useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { clearToken} from '../utils/TokenStorage';
import { AuthCheck } from '../context/AuthServices';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [profileData, setProfileData] = useState({ //setting initial state of the data
    name: '',
    dob: '',
    email: '',
    visaStatus: 'not_verified', // Options: 'not_verified', 'pending', 'rejected', 'verified'
    passport: null,
    visa: null,
  });
  const [loading, setLoading] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false); //for making the field editable
  const [uploadedStatus, setUploadedStatus] = useState({ passport: false, visa: false });
  const {getUserDetail} = useContext(AuthCheck);
  const navigation = useNavigation();

  //use effect to fetch the user data from the server
  useEffect(() => {
    
    
    
     setLoading(true); //for loading screen
     const fetchUserData = async () => {
       const response = await getUserDetail()
        if(response.status===200){ //if the user access token is valid setting the user data
          const dob = new Date(response.data.dob).toLocaleDateString();
          const userData = {
            name: response.data.firstname + ' ' + response.data.lastname,
            dob: dob,
            email: response.data.email,
            visaStatus: response.data.verificationStatus,
          }
          setProfileData(userData)
        }else {//if the access and refresh token is expired
          navigation.navigate('Auth')
        }
        
      
       
    }
    fetchUserData();
    setLoading(false);
  }, []);

  const handleEmailChange = (text) => {//when email changed updating the current user
    setProfileData({ ...profileData, email: text });
  };

  const saveEmail = () => {
    setIsEditingEmail(false);
    Alert.alert('Email Updated', 'Your email has been updated successfully.');
  };

  //handling logout of the user
  const handleLogout =async ()=>{
    clearToken()
    navigation.navigate('Auth')
  }

  //for letting the user decide to choose between camera and gallery while uploading documents
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

  //when an image is uploaded a callback fucntion is called to perform certain action
  const handleImagePicker = (type, field) => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
    };

    const callback = (response) => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].base64;
        setProfileData((prevState) => ({
          ...prevState,
          [field]: selectedImage,
        }));
        setUploadedStatus((prevState) => ({
          ...prevState,
          [field]: true,
        }));
      }
    };

    //options and callback are defined to perform actions for certain mediaType
    if (type === 'camera') { 
      launchCamera(options, callback);
    } else if (type === 'gallery') {
      launchImageLibrary(options, callback);
    }
  };

  //for rendering certain fields according to the visa status of the user. 
  //if rejected certain buttons are added
  const renderVisaSection = () => {
    if (profileData.visaStatus === 'not_verified') {
      return <Text style={styles.visaStatus}>Visa Status: Not Verified</Text>;
    } else if (profileData.visaStatus === 'pending') {
      return <Text style={styles.visaStatus}>Visa Status: Pending Verification</Text>;
    } else if (profileData.visaStatus === 'rejected') {
      return (
        <View>
          <Text style={styles.visaStatus}>Visa Status: Rejected</Text>
          <TouchableOpacity
            style={[styles.uploadButton, uploadedStatus.passport && styles.uploadSuccess]}
            onPress={() => showImagePickerAlert('passport')}
          >
            <FontAwesome
              name="check-circle"
              size={20}
              color={uploadedStatus.passport ? 'green' : 'gray'}
              style={styles.uploadIcon}
            />
            <Text style={styles.uploadButtonText}>Upload Passport</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.uploadButton, uploadedStatus.visa && styles.uploadSuccess]}
            onPress={() => showImagePickerAlert('visa')}
          >
            <FontAwesome
              name="check-circle"
              size={20}
              color={uploadedStatus.visa ? 'green' : 'gray'}
              style={styles.uploadIcon}
            />
            <Text style={styles.uploadButtonText}>Upload Visa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resubmitButton}>
            <Text style={styles.resubmitButtonText}>Resubmit</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (profileData.visaStatus === 'verified') {
      return <Text style={styles.visaStatus}>Visa Status: Verified</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.card}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Name:</Text>
            <View style={styles.fieldBox}>
              <Text style={styles.value}>{profileData.name}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Date of Birth:</Text>
            <View style={styles.fieldBox}>
              <Text style={styles.value}>{profileData.dob}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email:</Text>
            {isEditingEmail ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.input}
                  value={profileData.email}
                  onChangeText={handleEmailChange}
                />
                <TouchableOpacity style={styles.saveButton} onPress={saveEmail}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.editContainer}>
                <View style={styles.fieldBox}>
                  <Text style={styles.value}>{profileData.email}</Text>
                </View>
                <TouchableOpacity onPress={() => setIsEditingEmail(true)}>
                  <FontAwesome name="edit" size={20} color="#3498db" />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.passwordButton}>
            <Text style={styles.passwordButtonText}>Change Password</Text>
          </TouchableOpacity>
          {renderVisaSection()}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  fieldBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  value: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  passwordButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  passwordButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  visaStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    flexDirection: 'row',
  },
  uploadIcon: {
    marginRight: 10,
  },
  uploadSuccess: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
  },
  resubmitButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  resubmitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});