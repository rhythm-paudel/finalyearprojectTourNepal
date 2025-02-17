import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

import React, { useEffect, useState } from 'react'

import { PaperProvider } from 'react-native-paper';

//importing context providers
import { DataProvider } from './src/context/DataProvider';

import { getToken } from './src/utils/TokenStorage';

//importing stacks
import RootNavigator from './src/navigations/RootNavigator';
import AuthenticationProvider from './src/context/AuthenticationProvider';
import { AuthServices } from './src/context/AuthServices';

const App = () => {

  return (

    <PaperProvider>
      <AuthenticationProvider>
        <DataProvider>
          <AuthServices>
            <RootNavigator />
          </AuthServices>
        </DataProvider>
      </AuthenticationProvider>

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