import React, { useState, useEffect, useContext } from 'react';
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
import { clearToken } from '../utils/TokenStorage';
import { AuthCheck } from '../context/AuthServices';
import { useNavigation } from '@react-navigation/native';
import { AuthenticationProviderContext } from '../context/AuthenticationProvider';
import ErrMessage from '../components/ErrMessage';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';

import { UPLOAD_PRESET, CLOUD_NAME } from '@env';
import { AuthContext } from '../context/DataProvider';
import { deleteRequest } from '../utils/userActions';

const Profile = () => {

  const { reuploadDocuments } = useContext(AuthContext);

  const [profileData, setProfileData] = useState({ //setting initial state of the data
    name: '',
    dob: '',
    email: '',
    visaStatus: 'not_verified', // Options: 'not_verified', 'pending', 'rejected', 'verified'
    passport: null,
    visa: null,
    deleteRequest: false
  });

  //setting up form data to keep the data consistent
  const [formData, setFormData] = useState({
    passport: null,
    visa: null,
  });

  const [loading, setLoading] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false); //for making the field editable
  const [uploadedStatus, setUploadedStatus] = useState({ passport: false, visa: false });
  const { getUserDetail } = useContext(AuthenticationProviderContext);
  const navigation = useNavigation();
  const { setIsAuthenticated } = useContext(AuthenticationProviderContext);
  const [errMsg, setErrMsg] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);//for re-rendering profile data after data is updated
  //use effect to fetch the user data from the server
  useEffect(() => {



    setLoading(true); //for loading screen
    const fetchUserData = async () => {
      const response = await getUserDetail()
      if (response.status === 200) { //if the user access token is valid setting the user data
        const dob = new Date(response.data.dob).toLocaleDateString();
        const userData = {
          name: response.data.firstname + ' ' + response.data.lastname,
          dob: dob,
          email: response.data.email,
          visaStatus: response.data.verificationStatus,
          deleteRequest: response.data.deletionRequest
        }
        setProfileData(userData)
      } else {//if the access and refresh token is expired
        navigation.navigate('Auth')
      }



    }
    fetchUserData();
    setLoading(false);
  }, [refreshTrigger]);

  const handleEmailChange = (text) => {//when email changed updating the current user
    setProfileData({ ...profileData, email: text });
  };

  const handleDeletion = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This process is irreversible.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            const response = await deleteRequest();
            if (response.status === 200) {
              Alert.alert('Deletion Request Successful', 'Your account will be reviewed for deletion process.');
             
            } else {

              
              Alert.alert('Something went wrong');
            }
          }
        }

      ]
    )
  }

  const handleReupload = async () => {
    if (!formData.passport?.uri || !formData.visa?.uri) {
      setErrMsg(true);
    } else {

      setErrMsg(false)
      const passportToSave = formDataToSave('passport');
      const visaToSave = formDataToSave('visa');

      try {
        setLoading(true);


        const passportResponse = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          passportToSave,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )

        const visaResponse = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          visaToSave,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        //if the passport and visa is securely uploaded to cloudinary

        if (passportResponse?.data.secure_url && visaResponse?.data.secure_url) {
          //a copy of form data is created to update the passport and visa fields as using set method of useState is async
          const updatedData = {
            ...formData,
            passport: passportResponse.data.secure_url,
            visa: visaResponse.data.secure_url,
          };
          
          const reupload = await reuploadDocuments(updatedData);
          if (reupload?.status === 200) {
            Alert.alert('Documents Updated', 'Your documents have been updated successfully.');
            setRefreshTrigger((prev)=>prev+1);
          } else if (reupload?.status === 400) {
            Alert.alert('Incomplete Submission', 'Both the documents are required to be uploaded');
          } else {
            Alert.alert('Something went wrong');
          }

          //messages to be shown after registration

        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log('error')
      }

    }
  }

  const saveEmail = () => {
    setIsEditingEmail(false);
    Alert.alert('Email Updated', 'Your email has been updated successfully.');
  };

  //handling logout of the user
  const handleLogout = async () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            await clearToken();
            setIsAuthenticated(false);
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
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
      includeBase64: false,
    };

    const callback = (response) => {
      if (response.assets?.[0]?.uri) {
        setFormData(prev => ({
          ...prev,
          [field]: response.assets[0]  // Store the full asset object instead of base64
        }));
        setUploadedStatus(prev => ({
          ...prev,
          [field]: true
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

  //creating form data to push to cloudinary
  const formDataToSave = (copyType) => {
    const toSave = new FormData();
    const [firstName, lastName] = profileData.name.split(' ');
    if (copyType === 'passport') {
      const name = `${firstName}-${lastName}-passport`;


      toSave.append('file', {
        uri: formData.passport.uri,
        type: formData.passport.type || 'image/jpeg',
        name: name || 'passport'

      })
    } else if (copyType === 'visa') {
      const name = `${firstName}-${lastName}-visa`;

      toSave.append('file', {
        uri: formData.visa.uri,
        type: formData.visa.type || 'image/jpeg',
        name: name || 'visa'

      })
    }
    toSave.append('upload_preset', UPLOAD_PRESET);
    return toSave;

  }

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
          {errMsg && <ErrMessage message="Need to upload both passport and visa." />}
          <TouchableOpacity style={styles.resubmitButton} onPress={handleReupload}>
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

      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.loadingText}>Uploading Documents...</Text>
          </View>
        </View>
      )}
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
          <TouchableOpacity style={styles.passwordButton} onPress={handleDeletion} disabled={profileData.deleteRequest}>
            <Text style={styles.passwordButtonText}>{profileData.deleteRequest?'Deletion Request Sent':'Request Profile Deletion'}</Text>
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
  }, logoutButton: {
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
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
});