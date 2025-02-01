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
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    contactDetails: {
        flex: 1,
    },
    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    contactNumber: {
        fontSize: 16,
        color: '#7f8c8d',
    }
})