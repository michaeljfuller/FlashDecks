import React, {Component} from "react";
import {Button, View} from "react-native";
import {Auth} from "aws-amplify";
import AppNavigator from './AppContainer_navigator';
import AppDrawer from './AppDrawer';
import NavigationContainer from "../navigation/NavigationContainer";
import {NavigationScreenProps} from "../navigation/navigation_types";
import AppBanner from "../components/banner/AppBanner";
import InfoBanner from "../components/banner/InfoBanner";

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
            <AppBanner
                navigation={this.props.navigation}
                loggedInUser={{ id: 'test-id', displayName: 'test-user' }}
                onSignOutClick={this.handleSignOut}
                onToggleSidebar={this.handleToggleSidebar}
            />
            <InfoBanner />
            <AppDrawer navigation={this.props.navigation} />
        </NavigationContainer>;
    }
}
