import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { images } from '../utils/images'
//for each cards to be shown in the home screen
const HomescreenCards = ({place}) => {
    return (
        <View style={styles.placeCard}>
            <Image
                source={images[place.imagePath]}
                style={styles.placeImage}
            />
            <Text style={styles.placeName}>{place.name}</Text>
        </View>
    )
}

export default HomescreenCards

const styles = StyleSheet.create({
    placeCard: {
        width: 150,
        alignItems: 'center',
        marginHorizontal: 10,
      },
      placeImage: {
        width: 185,
        height: 155,
        borderRadius: 10,
        marginBottom: 5,
      },
      placeName: {
        fontSize: 16,
        fontWeight: 'bold',
      }
})