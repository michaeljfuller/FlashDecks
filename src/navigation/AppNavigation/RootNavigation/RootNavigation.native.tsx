import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenNavigation} from "./ScreenNavigation/ScreenNavigation";
import ModalsScreen from "./ModalsScreen/ModalsScreen";
import {SCREENS_ROUTE, MODALS_ROUTE} from "./routes";

const {Navigator, Screen} = createStackNavigator();

/**
 * Component that provides an extra level of navigation for Native builds to add a screen for Modals,
 * following the React-Navigation docs.
 * @see https://reactnavigation.org/docs/modal/
 */
export function RootNavigation() {
    return <Navigator
        headerMode="none"
        mode="modal"
        initialRouteName={SCREENS_ROUTE}
    >
        <Screen name={SCREENS_ROUTE} component={ScreenNavigation} />
        <Screen name={MODALS_ROUTE} component={ModalsScreen} />
    </Navigator>
}
export default RootNavigation;
