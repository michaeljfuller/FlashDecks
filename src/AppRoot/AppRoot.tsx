import React from "react";
import {Text} from "react-native";
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
import Center from "../components/layout/Center";

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
        return <Center>
            <Button width={150} height={50} title="Start" onClick={() => this.start()} />
        </Center>;
    }

    renderAuth() {
        if (this.state.user) return null;

        if (!this.state.initialized) {
            return <Center>
                <Text>{this.state.cognitoUser ? 'Getting User Data' : 'Authenticating...'}</Text>
                <ProgressCircle />
            </Center>;
        }

        return <Center>
            <AppAuthenticator />
        </Center>;
    }

    renderApp() {
        return <React.Fragment>
            <AppNavigation />
            <RootToast />
        </React.Fragment>;
    }

}
export default AppRoot;
