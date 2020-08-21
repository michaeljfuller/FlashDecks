import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {Provider as ReduxProvider} from 'react-redux';
import {AppRootBase} from './AppRootBase';
import AppAuthenticator from './Authenticator/AppAuthenticator';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import AppNavigation from "../screens/AppNavigation";
import store from '../store/store';
import Toast from "../components/toast/Toast";

export class AppRoot extends AppRootBase {

    render() {
        return <ErrorBoundary>
            <ReduxProvider store={store}>
                {this.renderAuth() || this.renderApp()}
            </ReduxProvider>
            <Toast
                show={!!this.state.errorMessage}
                text={this.state.errorMessage||''}
                onClose={this.closeErrorToast}
                type="warning"
                duration={3000}
            />
        </ErrorBoundary>;
    }

    closeErrorToast = () => this.clearErrorMessage();

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
        return <AppNavigation />;
    }

}
export default AppRoot;

const styles = StyleSheet.create({
    centerContents: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
