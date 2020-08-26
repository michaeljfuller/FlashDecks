import React from "react";
import {Button, Text, View} from "react-native";
import {DrawerActions} from '@react-navigation/native';
import {ExtendableDrawerRouterDetails} from "./ExtendableDrawerNavigator";

/** Definition of the render function. */
export type ExtendableDrawerRender = (
    contents: React.ReactElement,
    routerDetails: ExtendableDrawerRouterDetails
) => React.ReactElement;

export const defaultRender: ExtendableDrawerRender = (
    contents,
    {navigation, state, descriptors}
) => {
    const breadcrumbs = state.history.map(item => item.type === 'route' && descriptors[item.key]?.options.title).filter(v => v);

    const logSettings = () => {
        console.group('ExtendableDrawerNavigator.defaultRender');
        console.log('contents', contents);
        console.log('navigation', navigation);
        console.log('state', state);
        console.log('descriptors', descriptors);
        console.groupEnd();
    };
    const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());

    return <React.Fragment>
        <View style={{ flexDirection: 'row', backgroundColor: 'red', paddingHorizontal: 2 }}>
            <Text style={{ color: 'white', flexGrow: 1 }}>ExtendableDrawerNavigator.defaultRender</Text>
            <Text style={{ color: 'white', flexGrow: 1, textAlign: 'right' }}>[{breadcrumbs.join('] > [')}]</Text>
        </View>
        <View style={{ flexDirection: 'row', backgroundColor: 'lightblue' }}>
            <View style={{ flexGrow: 1, paddingHorizontal: 1 }}><Button title="Toggle Drawer" onPress={toggleDrawer} /></View>
            <View style={{ flexGrow: 1, paddingHorizontal: 1 }}><Button title="Log Settings" onPress={logSettings}   /></View>
        </View>
        {contents}
    </React.Fragment>;
};
