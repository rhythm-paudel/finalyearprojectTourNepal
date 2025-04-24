import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,Alert} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { getToken, storeTokens } from '../utils/TokenStorage';
import { changePassword, refreshToken } from '../api/authService';
import ErrMessage from '../components/ErrMessage';

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPasswordErrMsg, setOldPasswordErrMsg] = useState('');
  const [newPasswordErrMsg, setNewPasswordErrMsg] = useState('');
  const [confirmPasswordErrMsg, setConfirmPasswordErrMsg] = useState('');

  useEffect(() => {
    checkFields();
  }, [currentPassword, newPassword, confirmPassword]);

  const handleChangePassword =async () => {
   
    if (checkFields()) { 
      Alert.alert('Validation Error', 'Please fix all errors before submitting');
      return;
    }
    const token = await getToken();
   
    const response = await changePassword(newPassword,currentPassword,token.accessToken);
    
    if(response?.status===200){
      Alert.alert('Password Updated', 'Your password has been updated successfully.');
      setConfirmPassword('');
      setCurrentPassword('');
      setNewPassword('');
    }else if(response?.status===403){
      const newToken =await refreshToken(token.encryptedToken);
      if (newToken?.status === 200) {
        setOldPasswordErrMsg('');
        storeTokens(newToken.data.accessToken, token.encryptedToken);
        const response = await changePassword(updatedPassword,oldPassword,token.accessToken);
        if(response?.status===200){
          Alert.alert('Password Updated', 'Your password has been updated successfully.');
          setConfirmPassword('');
          setCurrentPassword('');
          setNewPassword('');
        }else{
          Alert.alert('Something went wrong');
        }
      }else{
        Alert.alert('Something went wrong');
      }
    }else if(response?.status===400){
     setOldPasswordErrMsg('Incorrect current password');
     
    }
  };


  const checkFields = () => {
    let hasErrors = false;
    const newErrors = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    };

    // Check current password
    if (!currentPassword.trim()) {
      newErrors.oldPassword = 'Please enter current password';
      hasErrors = true;
    }

    // Check new password
    if (!newPassword.trim()) {
      newErrors.newPassword = 'Please enter new password';
      hasErrors = true;
    }

    // Check confirm password
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm new password';
      hasErrors = true;
    }

    // Check password match
    if (newPassword !== confirmPassword && confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasErrors = true;
    }


    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (newPassword && !passwordRegex.test(newPassword)) {
      newErrors.newPassword = 'Password does not meet requirements';
      hasErrors = true;
    }

    // Update state with errors
    setOldPasswordErrMsg(newErrors.oldPassword);
    setNewPasswordErrMsg(newErrors.newPassword);
    setConfirmPasswordErrMsg(newErrors.confirmPassword);

    return hasErrors;
  }




  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Change Password</Text>
        </View>

        <View style={styles.card}>
          {/* Current Password Input */}
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color="#3b82f6" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              secureTextEntry={!showCurrentPassword}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholderTextColor="#94a3b8"
            />
            <TouchableOpacity
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              style={styles.eyeIcon}
            >
              <FontAwesome
                name={showCurrentPassword ? 'eye' : 'eye-slash'}
                size={20}
                color="#94a3b8"
              />
            </TouchableOpacity>
          </View>
          <ErrMessage message={oldPasswordErrMsg} />
          {/* New Password Input */}
          <View style={styles.inputContainer}>
            <FontAwesome name="key" size={20} color="#3b82f6" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholderTextColor="#94a3b8"
            />
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
              style={styles.eyeIcon}
            >
              <FontAwesome
                name={showNewPassword ? 'eye' : 'eye-slash'}
                size={20}
                color="#94a3b8"
              />
            </TouchableOpacity>
          </View>
          <ErrMessage message={newPasswordErrMsg} />

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <FontAwesome name="key" size={20} color="#3b82f6" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor="#94a3b8"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <FontAwesome
                name={showConfirmPassword ? 'eye' : 'eye-slash'}
                size={20}
                color="#94a3b8"
              />
            </TouchableOpacity>
          </View>
          <ErrMessage message={confirmPasswordErrMsg} />

          {/* Password Requirements */}
          <View style={styles.requirementsContainer}>
            <Text style={styles.requirementsText}>Password must contain:</Text>
            <Text style={styles.requirementItem}>• At least 8 characters</Text>
            <Text style={styles.requirementItem}>• One uppercase letter</Text>
            <Text style={styles.requirementItem}>• One number</Text>
            <Text style={styles.requirementItem}>• One special character</Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleChangePassword}
          >
            <View style={styles.solidButton}>
              <Text style={styles.buttonText}>Change Password</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#1e293b',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  requirementsContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  requirementsText: {
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 8,
  },
  requirementItem: {
    color: '#94a3b8',
    fontSize: 14,
    marginLeft: 5,
    marginVertical: 2,
  },
  button: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 15,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  solidButton: {
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default ChangePasswordScreen;