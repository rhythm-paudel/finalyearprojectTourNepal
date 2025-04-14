import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react'

const ContactsList = ({ contact }) => { //retrieving each contact from the main page and returning a single card
    // function that will redirect it to the phone application
    const dialNumber = (number) => {
        Linking.openURL(`tel:${number}`);
    };

    return (
        <TouchableOpacity
            key={contact.id}
            style={styles.contactCard}
            onPress={() => dialNumber(contact.number)}
        >
            <View style={styles.contactDetails}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactNumber}>{contact.number}</Text>
            </View>
            <FontAwesome name="phone" size={24} color="#3498db" />
        </TouchableOpacity>
    )
}

export default ContactsList

const styles = StyleSheet.create({
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 16,
    color: '#64748b',
  },
  phoneIcon: {
    color: '#3b82f6',
  }
});