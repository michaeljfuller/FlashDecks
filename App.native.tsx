import React from 'react';
import {Text, YellowBox} from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Root as NativeBaseRoot, Container as NativeBaseContainer } from "native-base";

// TODO Remove work-around when fix is merged. https://github.com/GeekyAnts/NativeBase/issues/3109
YellowBox.ignoreWarnings(['Animated: `useNativeDriver` was bit specified,']);

import Amplify, {Analytics} from 'aws-amplify';
// @ts-ignore
import config from './aws-exports';
Amplify.configure(config);
Analytics.disable(); // Prevent warning about not being configured.

import AppRoot from './src/AppRoot/AppRoot'

export default class App extends React.Component<any, any> {
    state = {
        loadedFonts: false
    };

    get isReady() {
        return this.state.loadedFonts;
    }

    componentDidMount() {
        // StatusBar.setBackgroundColor('#adf');
        this.loadFonts().catch((err: Error) => console.error('Failed to load fonts', err));
    }

    async loadFonts() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        this.setState({ loadedFonts: true });
    }

    render() {
        return <NativeBaseRoot>
            <NativeBaseContainer>
                {this.isReady ? <AppRoot /> : this.renderLoading()}
            </NativeBaseContainer>
        </NativeBaseRoot>;
    }

    renderLoading() {
        return <Text>Loading...</Text>;
    }
}
