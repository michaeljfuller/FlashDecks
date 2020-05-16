import React from "react";
import {View, Text, Button} from "react-native";
import {AppRootBase, AppRootProps, AppRootState} from './AppRootBase';
import { Authenticator, AmplifyTheme } from 'aws-amplify-react';

export class AppRoot extends AppRootBase {

    handleSignOut = () => {
        return this.signOut();
    }

    render() {
        const { cognitoUser, user } =  this.state;
        if (!cognitoUser) {
            return <Authenticator {...{theme: authenticatorTheme}} />;
        }
        if (!user) {
            return <Text>Getting user data...</Text>;
        }

        return <Button title={`Log out ${user.displayName}`} onPress={this.handleSignOut} />;
    }

}

const authenticatorTheme = {
    ...AmplifyTheme,
    button: {
        ...AmplifyTheme.button,
        backgroundColor: '#f90'
    },
    sectionHeader: {
        ...AmplifyTheme.sectionHeader,
        backgroundColor: "var(--squidInk)"
    },
    navBar: {
        ...AmplifyTheme.navBar,
        backgroundColor: "#ffc0cb"
    }
}
