import React, {Component} from "react";
import {Text, View} from "react-native";
import ScreenContainer from "../ScreenContainer";
import {NavigationScreenProps} from "../../navigation/navigation_types";

export default class DashboardScreen extends Component<NavigationScreenProps>
{
    render() {
        return (
            <ScreenContainer>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{this.constructor.name}</Text>
            </ScreenContainer>
        );
    }
}
