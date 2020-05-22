import React from "react";
import {Text, Button, View, StyleSheet} from "react-native";
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
            return <View style={styles.centerContents}>
                <AppAuthenticator />
            </View>;
        }
        if (!this.state.user) {
            return <View style={styles.centerContents}>
                <Text>Getting user data...</Text>
            </View>;
        }
        return null;
    }

    renderApp() {
        const { displayName = 'User' } = this.state.user || {};
        return <React.Fragment>
            {/* TODO Add user to store, and listen for user being nullified to signOut. */}
            <Button title={`Log out ${displayName}`} onPress={this.handleSignOut}/>
            <NavigationRoot />
        </React.Fragment>;
    }
    handleSignOut = () => this.signOut();

}
export default AppRoot;

const styles = StyleSheet.create({
    centerContents: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
