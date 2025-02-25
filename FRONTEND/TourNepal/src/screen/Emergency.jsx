import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ContactsList from '../components/ContactsList';
import { getEmergencyContacts } from '../utils/emegergencyContacts';
import ErrMessage from '../components/ErrMessage';

const Emergency = () => {
  const [contacts, setContacts] = useState([]); // store emergency contacts
  const [searchInput, setSearchInput] = useState(''); // store search input
  const [filteredContacts, setFilteredContacts] = useState([]); // store filtered contacts
  const [errMessage, setErrMessage] = useState('');

  // initializing contacts (later will be extracted from database)
  useEffect(() => {
   
    const getEmegencyContacts = async () => {
      const response = await getEmergencyContacts()
      if(response?.status===200){
        setContacts(response.data);
      setFilteredContacts(response.data);
        console.log(response.data);
        
      }else{
        setErrMessage("No Emergency contacts found")
      }
    }
    getEmegencyContacts();
    
  }, []);

  // filtering the search result based on the search button
  useEffect(() => {
    if (searchInput === '') {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchInput.toLowerCase()) //for ensuring case doesnot matter
      );
      setFilteredContacts(filtered);
    }
  }, [searchInput, contacts]);



  const renderContacts = () => { //component for rendering contacts extracted from database
    return filteredContacts.map((contact) => (
        <ContactsList key={contact._id} contact={contact}/>
    ));
  };

  return (
    <View style={styles.container}>
      {/* Search and Contacts Section */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Emergency Contact List</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Type to search"
            value={searchInput}
            onChangeText={(text) => setSearchInput(text)}
          />
          <FontAwesome name="search" size={20} color="#000" style={styles.searchIcon} />
        </View>

        {/* Contact Cards */}
        {errMessage && <ErrMessage message={errMessage} />}
        <View style={styles.contactsContainer}>{renderContacts()}</View>
      </ScrollView>
    </View>
  );
};

export default Emergency;

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
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#2c3e50',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
  contactsContainer: {
    marginTop: 10,
  }
});