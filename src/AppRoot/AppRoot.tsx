import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {Provider as ReduxProvider} from 'react-redux';
import {AppRootBase} from './AppRootBase';
import AppAuthenticator from './Authenticator/AppAuthenticator';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import AppNavigation from "../navigation/AppNavigation/AppNavigation";
import store from '../store/store';
import RootToast from "./RootToast/RootToast";
import {logAppInfo} from "./logAppInfo";
import ProgressCircle from "../components/progress/ProgressCircle";
import Button from "../components/button/Button";

logAppInfo();

export class AppRoot extends AppRootBase {

    render() {
        return <ErrorBoundary>
            <ReduxProvider store={store}>
                {this.renderStart() || this.renderAuth() || this.renderApp()}
            </ReduxProvider>
        </ErrorBoundary>;
    }

    renderStart() {
        if (this.state.started) return null;
        return <View style={styles.centerContents}>
            <Button width={150} height={50} title="Start" onClick={() => this.start()} />
        </View>;
    }

    renderAuth() {
        if (this.state.user) return null;

        if (!this.state.initialized) {
            return <View style={styles.centerContents}>
                <Text>{this.state.cognitoUser ? 'Getting User Data' : 'Authenticating...'}</Text>
                <ProgressCircle />
            </View>;
        }

        return <View style={styles.centerContents}>
            <AppAuthenticator />
        </View>;
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
