import React from "react";
import {Text, View} from "react-native";

import { Authenticator, AmplifyTheme } from 'aws-amplify-react';
import {isProduction, testUsername, testPassword} from "../../../env";

/**
 * @link https://docs.amplify.aws/ui/auth/authenticator/q/framework/react#basic-usage
 */
export function AmplifyAuthenticator(){
    return <Authenticator theme={authenticatorTheme}>
        {!isProduction && <slot name="sign-in">
            <View style={{flexDirection:"row"}}>
                <Text style={{fontWeight:"bold", width: 80}}>Test User: </Text>
                <Text>{testUsername}</Text>
            </View>
            <View style={{flexDirection:"row"}}>
                <Text style={{fontWeight:"bold", width: 80}}>Password: </Text>
                <Text>{testPassword}</Text>
            </View>
        </slot>}
    </Authenticator>;
}

const authenticatorTheme = {
    ...AmplifyTheme,
    button: {
        ...AmplifyTheme.button,
        backgroundColor: '#f90'
    },
    sectionHeader: {
        ...AmplifyTheme.sectionHeader,
        backgroundColor: "var(--squidInk)",
        color: 'black',
    },
    navBar: {
        ...AmplifyTheme.navBar,
        backgroundColor: "#ffc0cb"
    }
};
