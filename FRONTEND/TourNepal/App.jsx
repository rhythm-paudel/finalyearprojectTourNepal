import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'

import React,{useEffect, useState} from 'react'

import { PaperProvider } from 'react-native-paper';

//importing context providers
import { DataProvider } from './src/context/DataProvider';

import { getToken } from './src/utils/TokenStorage';

//importing stacks
import RootNavigator from './src/navigations/RootNavigator';
import AutheticationProvider from './src/context/AutheticationProvider';


const App = () => {

  return (

    <PaperProvider>
      <DataProvider>
        <AutheticationProvider>
        <RootNavigator />
        </AutheticationProvider>
      </DataProvider>
    </PaperProvider>

  )
}

export default App

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})