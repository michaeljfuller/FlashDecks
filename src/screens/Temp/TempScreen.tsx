import * as React from "react";
import {Text, View} from "react-native";
import {NavigationScreenProps} from "../../navigation/navigation_types";
import {reduxConnector, TempScreenStoreProps} from "./TempScreen_redux";
import {envName} from "../../env";

export enum TestIds {
    User='TempScreen_User',
    Env='TempScreen_Env'
}

export type TempScreenProps = NavigationScreenProps;

export class TempScreen extends React.Component<TempScreenProps & TempScreenStoreProps>
{
    render() {
        const {loggedInUser} = this.props;
        return (
            <View>
                <Text>Temp</Text>
                <Text testID={TestIds.User}>User: {loggedInUser && loggedInUser.displayName || '?'}</Text>
                <Text testID={TestIds.Env}>Environment: &quot;{envName}&quot;</Text>
            </View>
        );
    }
}

export default reduxConnector(TempScreen);
