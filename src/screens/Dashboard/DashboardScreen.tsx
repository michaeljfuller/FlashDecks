import * as React from "react";
import {Text, View} from "react-native";
import {NavigationScreenProps} from "../../navigation/navigation_types";

export default class DashboardScreen extends React.Component<NavigationScreenProps>
{
    render() {
        return (
            <View>
                <Text>Dashboard</Text>
            </View>
        );
    }
}
