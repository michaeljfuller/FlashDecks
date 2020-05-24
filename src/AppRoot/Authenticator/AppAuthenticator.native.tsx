import React from "react";
// @ts-ignore
import { Authenticator, AmplifyTheme } from 'aws-amplify-react-native';

export function AppAuthenticator(){
    return <Authenticator theme={authenticatorTheme} />
}
export default AppAuthenticator;

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
