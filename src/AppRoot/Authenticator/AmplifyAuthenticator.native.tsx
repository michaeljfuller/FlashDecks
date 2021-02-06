import React from "react";
import {Text, View} from "react-native";
// @ts-ignore
import { Authenticator, AmplifyTheme } from 'aws-amplify-react-native';
import {isProduction, testUsername, testPassword} from "../../env";
import Row from "../../components/layout/Row";

/**
 * @link https://docs.amplify.aws/ui/auth/authenticator/q/framework/react-native#using-withauthenticator-hoc
 */
export function AmplifyAuthenticator(){
    return <View>
        {
            isProduction ? null : <Row space center style={{ marginBottom: 5 }}>
                <Text style={{fontWeight:"bold", width: 80}}>Test Login: </Text>
                <Text>{testUsername}</Text>
                <Text>{testPassword}</Text>
            </Row>
        }
        <Authenticator theme={authenticatorTheme} />
    </View>;
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
};
