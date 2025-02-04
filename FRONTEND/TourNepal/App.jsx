import { StyleSheet, Text, View } from 'react-native'

import React from 'react'

import { PaperProvider } from 'react-native-paper';

//importing context providers
import { DataProvider } from './src/context/DataProvider';

//importing stacks
import RootNavigator from './src/navigations/RootNavigator';


const App = () => {
  return (

    <PaperProvider>
      <DataProvider>
        <RootNavigator />
      </DataProvider>
    </PaperProvider>

  )
}

export default App

const styles = StyleSheet.create({})