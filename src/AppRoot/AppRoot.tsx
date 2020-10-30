import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {Provider as ReduxProvider} from 'react-redux';
import {AppRootBase} from './AppRootBase';
import AppAuthenticator from './Authenticator/AppAuthenticator';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import AppNavigation from "../navigation/AppNavigation/AppNavigation";
import store from '../store/store';
import RootToast from "./RootToast/RootToast";
import {PortalNetwork} from "../components/portal/PortalNetwork";
import {logAppInfo} from "./logAppInfo";

logAppInfo();

export class AppRoot extends AppRootBase {

    render() {
        return <ErrorBoundary>
            <ReduxProvider store={store}>
                <PortalNetwork>
                    {this.renderAuth() || this.renderApp()}
                </PortalNetwork>
            </ReduxProvider>
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
        return <React.Fragment>
            <AppNavigation />
            <RootToast />
        </React.Fragment>;
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
