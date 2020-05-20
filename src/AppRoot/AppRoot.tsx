import React from "react";
import {Text, Button, View} from "react-native";
import {AppRootBase} from './AppRootBase';
import AppAuthenticator from './Authenticator/AppAuthenticator';
import ErrorBoundary from '../utils/hoc/ErrorBoundary/ErrorBoundary';
import NavigationRoot from '../navigation/NavigationRoot';

export class AppRoot extends AppRootBase {

    render() {
        return <ErrorBoundary>
            {this.renderAuth() || this.renderApp()}
        </ErrorBoundary>;
    }

    renderAuth() {
        if (!this.state.cognitoUser) {
            return <AppAuthenticator />;
        }
        if (!this.state.user) {
            return <Text>Getting user data...</Text>;
        }
        return null
    }

    renderApp() {
        const { displayName = 'User' } = this.state.user || {};
        return <View>
            {/* TODO Add user to store, and listen for user being nullified to signOut. */}
            <Button title={`Log out ${displayName}`} onPress={this.handleSignOut}/>
            <NavigationRoot />
        </View>;
    }
    handleSignOut = () => this.signOut();

}
