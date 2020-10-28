import React from "react";
import {Text, View, Button} from "react-native";
import {createStackNavigator} from '@react-navigation/stack';
import {appNavigationRef} from "../appNavigationRef";
import {ScreenNavigation} from "./ScreenNavigation/ScreenNavigation";

const {Navigator, Screen} = createStackNavigator();
const SCREENS_ROUTE = "RootScreens";
const MODALS_ROUTE = "RootModals";

/**
 * Component that provides an extra level of navigation for Native builds to add a screen for Modals,
 * following the React-Navigation docs.
 * @see https://reactnavigation.org/docs/modal/
 */
export function RootNavigation() {
    const proxyScreens = () => { // TODO Remove
        return <React.Fragment>
            <Button title="RootNavigation Modal" onPress={() => navigateToModal({bar:1})} color="purple" />
            <ScreenNavigation />
        </React.Fragment>
    };
    return <Navigator
        headerMode="none"
        mode="modal"
        initialRouteName={SCREENS_ROUTE}
    >
        <Screen name={SCREENS_ROUTE} component={proxyScreens} />
        <Screen name={MODALS_ROUTE} component={ModalsScreen} />
    </Navigator>
}
export default RootNavigation;

export function ModalsScreen(props: any) {
    const jsonStyle = {color:'white', backgroundColor: 'grey', padding: 2};
    return <View style={{ margin:20 }}>
        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>RootNavigation &gt; ModalsScreen</Text>
        <Text>Props</Text>
        <Text style={jsonStyle}>{JSON.stringify(props, null, 2)}</Text>
        <Text>Params</Text>
        <Text style={jsonStyle}>{JSON.stringify(props?.route?.params, null, 2)}</Text>
        <Text>TODO: Create ModalManager</Text>
        <Button title="Close" onPress={navigateToScreens} />
    </View>
}

export function navigateToModal(params: any) {
    appNavigationRef.current?.navigate(MODALS_ROUTE, params);
}
export function navigateToScreens() {
    appNavigationRef.current?.navigate(SCREENS_ROUTE);
}
