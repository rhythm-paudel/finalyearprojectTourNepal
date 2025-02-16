import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';

const ErrMessage = ({message}) => (
    message ? (
      <Animatable.Text 
        animation="fadeInLeft" 
        duration={300}
        style={styles.errorText}
      >
        {message}
      </Animatable.Text>
    ) : null
  );

export default ErrMessage

const styles = StyleSheet.create({
errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    paddingLeft: 15,
    width: '100%'
  },
  inputContainerError: {
    borderColor: '#e74c3c'
  },
})