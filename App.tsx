import React from 'react';
import { StyleSheet, View } from 'react-native';

import Amplify, {Analytics} from 'aws-amplify';
// @ts-ignore
import config from './aws-exports';
Amplify.configure(config);
Analytics.disable(); // Prevent warning about not being configured.

import {AppRoot} from './src/AppRoot/AppRoot'

export default function App() {
  return (
    <View style={styles.container}>
      <AppRoot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
