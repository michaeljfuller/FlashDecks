import React from "react";
import {Text, ScrollView} from "react-native";
import {AppNavigator} from './AppContainer_navigator';
import {StandardNavigator, setNavigator} from "../navigation/navigators/StandardNavigator/StandardNavigator";
import NavigatorContainer from "../navigation/NavigationContainer";

@setNavigator(AppNavigator)
export class AppDrawer extends StandardNavigator {
    render() {
        return <NavigatorContainer>
            <Text style={{backgroundColor: 'orange'}}>AppDrawer</Text>
            {super.render()}
        </NavigatorContainer>;
    }
}
export default AppDrawer;
