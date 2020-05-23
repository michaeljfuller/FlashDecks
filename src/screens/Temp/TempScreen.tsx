import * as React from "react";
import {Text, View} from "react-native";
import {NavigationScreenProps} from "../../navigation/navigation_types";
import {reduxConnector, TempScreenStoreProps} from "./TempScreen_redux";

export class TempScreen extends React.Component<NavigationScreenProps & TempScreenStoreProps>
{
    render() {
        const {loggedInUser} = this.props;
        return (
            <View>
                <Text>Temp</Text>
                <Text>User: {loggedInUser && loggedInUser.displayName || '?'}</Text>
            </View>
        );
    }
}

export default reduxConnector(TempScreen);
