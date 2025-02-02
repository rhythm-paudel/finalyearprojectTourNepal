import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';


//a thing to note here is if the notificationscreen is not in a stack then navigate.navigate('NotificatioNScreen') wont work
//the screen has to be on a stack for the screen to redirect
const Header = () => {
    const navigate = useNavigation();
    const redirectPage = ()=>{
        navigate.navigate('NotificationScreen')
    }
  return (
    <View style={styles.headerContainer}>
          <Image
            source={require('../assets/logo.png')} 
            style={styles.logo}
          />
          <Text style={styles.headerText}>TourNepal</Text>

          <TouchableOpacity onPress={redirectPage}>
            <Text>
              <FontAwesome name="bell" size={24} color="#000" /> 
            </Text>
          </TouchableOpacity>
        </View>
  )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    logo: {
      width: 40,
      height: 40,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
    }
  });