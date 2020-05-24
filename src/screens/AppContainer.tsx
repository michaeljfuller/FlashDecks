import React, {Component} from "react";
import {Button, View} from "react-native";
import {Auth} from "aws-amplify";
import AppNavigator from './AppContainer_navigator';
import AppDrawer from './AppDrawer';
import NavigationContainer from "../navigation/NavigationContainer";
import {NavigationScreenProps} from "../navigation/navigation_types";

export interface AppContainerProps extends NavigationScreenProps {}
export interface AppContainerState {}

/**
 * Container for most of the App's functionality after AppRoot.
 */
export class AppContainer extends Component<AppContainerProps, AppContainerState> {
    static router = AppNavigator.router;

    componentDidMount() {
        console.log(this);
    }

    handleToggleSidebar = () => this.props.navigation.toggleDrawer();
    handleSignOut = () => Auth.signOut().catch(e => console.warn('Error signing out', e));

    render() {
        return <NavigationContainer>
            <View style={{ display: 'flex', flexDirection: 'row',  }}>
                <View style={{flex: 1, paddingRight: 1 }}><Button title="Sidebar" onPress={this.handleToggleSidebar} /></View>
                <View style={{flex: 1, paddingLeft: 1 }}><Button title="Sign Out" onPress={this.handleSignOut} /></View>
            </View>
            <AppDrawer navigation={this.props.navigation} />
        </NavigationContainer>;
    }
}
