import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';

const Header = () => {
    const navigate = useNavigation();
    const redirectPage = ()=>{
        navigate.navigate('Notification')
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