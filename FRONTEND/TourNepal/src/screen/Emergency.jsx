import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import ContactsList from '../components/ContactsList';

const Emergency = () => {
  const [contacts, setContacts] = useState([]); // store emergency contacts
  const [searchInput, setSearchInput] = useState(''); // store search input
  const [filteredContacts, setFilteredContacts] = useState([]); // store filtered contacts

  // initializing contacts (later will be extracted from database)
  useEffect(() => {
    const emergencyContacts = [
      { id: 1, name: 'Police', number: '100' },
      { id: 2, name: 'Ambulance', number: '101' },
      { id: 3, name: 'Fire Brigade', number: '102' },
      { id: 4, name: 'Disaster Management', number: '108' },
      { id: 5, name: 'Tourist Helpline', number: '1363' },
    ];
    setContacts(emergencyContacts);
    setFilteredContacts(emergencyContacts);
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
        <ContactsList key={contact.name} contact={contact}/>
    ));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

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
        <View style={styles.contactsContainer}>{renderContacts()}</View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation />
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