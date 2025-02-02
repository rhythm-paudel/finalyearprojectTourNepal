import { StyleSheet, Text, View } from 'react-native'

import React from 'react'

import {PaperProvider } from 'react-native-paper';



//importing stacks
import RootNavigator from './src/navigations/RootNavigator';


const App = () => { 
  return (

      <PaperProvider>
       <RootNavigator/>
      </PaperProvider>

  )
}

export default App

const styles = StyleSheet.create({})