import React from "react";
import {Text, Button} from "react-native";
import {AppRootBase} from './AppRootBase';
import AppAuthenticator from './Authenticator/AppAuthenticator';

export class AppRoot extends AppRootBase {

    handleSignOut = () => {
        return this.signOut();
    }

    render() {
        const { cognitoUser, user } =  this.state;
        if (!cognitoUser) {
            return <AppAuthenticator />;
        }
        if (!user) {
            return <Text>Getting user data...</Text>;
        }
        return <Button title={`Log out ${user.displayName}`} onPress={this.handleSignOut} />;
    }

}
