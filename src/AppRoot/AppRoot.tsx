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
import {isProduction} from "../env";

logAppInfo();

export class AppRoot extends AppRootBase {

    render() {
        return <ErrorBoundary>
            <ReduxProvider store={store}>
                {this.renderAuth() || this.renderApp()}
            </ReduxProvider>
        </ErrorBoundary>;
    }

    renderAuth() {
        if (!this.state.cognitoUser) {
            return <View style={styles.centerContents}>

                {isProduction ? null : <View>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{fontWeight:"bold", width: 80}}>Test User: </Text>
                        <Text>test_user</Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{fontWeight:"bold", width: 80}}>Password: </Text>
                        <Text>password</Text>
                    </View>
                </View>}

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
