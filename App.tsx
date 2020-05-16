import React from 'react';
import { StyleSheet, View } from 'react-native';

import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

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
