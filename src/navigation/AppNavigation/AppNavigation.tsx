import React from "react";
import * as Linking from 'expo-linking';
import {NavigationContainer, LinkingOptions, DrawerActions} from '@react-navigation/native';
import {RootNavigation} from "./RootNavigation/RootNavigation";
import {BackHandler, NativeEventSubscription} from "react-native";
import {appNavigationRef} from "./appNavigationRef";

/**
 * A component defining the root navigation for the app.
 */
export class AppNavigation extends React.PureComponent<any, any> {
    /**
     * https://reactnavigation.org/docs/deep-linking/
     * https://docs.expo.io/workflow/linking/
     */
    linking = {
        prefixes: [
            Linking.makeUrl('/')
        ],
    } as LinkingOptions;

    hardwareBackPress?: NativeEventSubscription;

    componentDidMount() {
        this.hardwareBackPress = BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        this.hardwareBackPress?.remove();
    }

    /**
     * On back press (while no other back options), open the drawer.
     * https://reactnavigation.org/docs/custom-android-back-button-handling/
     */
    onBackPress = () => {
        if (appNavigationRef.current) {
            appNavigationRef.current.dispatch(DrawerActions.toggleDrawer());
            return true; // Block default behavior
        }
        return false; // Use default behavior
    }

    render() {
        return <NavigationContainer ref={appNavigationRef} linking={this.linking}>
            <RootNavigation />
        </NavigationContainer>;
    }
}
export default AppNavigation;
