import React from "react";
import {Text} from "react-native";
import {AppNavigator} from './AppContainer_navigator';
import {StandardNavigator, setNavigator} from "../navigation/navigators/StandardNavigator/StandardNavigator";
import NavigatorContainer from "../navigation/NavigationContainer";
import {Content} from 'native-base';

@setNavigator(AppNavigator)
export class AppDrawer extends StandardNavigator {
    render() {
        return <NavigatorContainer>
            <Text style={{backgroundColor: 'orange'}}>AppDrawer</Text>
            <Content>{super.render()}</Content>
        </NavigatorContainer>;
    }
}
export default AppDrawer;
