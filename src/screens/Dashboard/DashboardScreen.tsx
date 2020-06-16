import React, {Component} from "react";
import {Text} from "react-native";
import ScreenContainer from "../ScreenContainer";
import {NavigationScreenProps} from "../../navigation/navigation_types";

export default class DashboardScreen extends Component<NavigationScreenProps>
{
    render() {
        return (
            <ScreenContainer>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{this.constructor.name}</Text>
                <Text style={{
                    padding: 2, margin: 5, borderWidth: 1, backgroundColor: 'white'
                }}>{JSON.stringify(this.props, null, 2)}</Text>
            </ScreenContainer>
        );
    }
}
