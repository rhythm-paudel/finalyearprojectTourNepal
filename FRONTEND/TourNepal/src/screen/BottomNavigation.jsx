import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';

import React,{useState} from 'react'

const BottomNavigation = () => {
    const navigation = useNavigation()

    
    const redirectPage = (pagename) =>{ //to redirect the screen according to the navigation button
        setCurrentPage(pagename) 
        navigation.navigate(pagename) //redirecting to referred page
      }

    const [currentPage,setCurrentPage] = useState('Homescreen')

    const changeCurrentColor = ()=>{

    }

  return (
    //creating buttons for redirecting
    <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navButton} onPress={()=>redirectPage('Homescreen')}>
          <Text style={[styles.navIcon]}>🏠</Text>
          <Text style={[styles.navText, currentPage=='Homescreen'&&{ color: 'orange' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={()=>redirectPage('Search')}>
          <Text style={styles.navIcon}>🔍</Text>
          <Text style={[styles.navText,styles.navText, currentPage=='Search'&&{ color: 'orange' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={()=>redirectPage('Emergency')}>
          <Text style={styles.navIcon}>🚨</Text>
          <Text style={[styles.navText, currentPage=='Emergency'&&{ color: 'orange' }]}>Emergency</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={()=>redirectPage('Profile')}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={[styles.navText, currentPage=='Profile'&&{ color: 'orange' }]}>Profile</Text>
        </TouchableOpacity>
    </View>
  )
}

export default BottomNavigation

const styles = StyleSheet.create({
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#fff',
      },
      navButton: {
        alignItems: 'center',
      },
      navIcon: {
        fontSize: 20,
      },
      navText: {
        fontSize: 12,
        color: '#888',
      }
})