//<editor-fold desc="Imports">

import React, {PropsWithChildren} from "react";
import {Button, Text, View} from "react-native";
import {
    createNavigatorFactory,
    DefaultNavigatorOptions,
    DrawerActions,
    DrawerNavigationState as DrawerRouterState,
    DrawerRouter,
    DrawerRouterOptions,
    NavigationHelpersContext,
    useNavigationBuilder,
    DrawerActionType,
} from '@react-navigation/native';
import {DrawerView, DrawerNavigationOptions} from '@react-navigation/drawer';
import {DrawerNavigationConfig} from "@react-navigation/drawer/lib/typescript/src/types";
import {Navigation, NavigationRouteDescriptors, NavigationRouterDetails} from "../../navigation_types";

//</editor-fold>
//<editor-fold desc="Types">

export type ExtendableDrawerRouterDetails = NavigationRouterDetails<
    ExtendableDrawerNavigation, DrawerRouterState, ExtendableDrawerNavigationRouteDescriptors
>;

/** Properties for the component, extending DrawerNavigationOptions. */
export type ExtendableDrawerProps = DefaultNavigatorOptions<DrawerNavigationOptions>
    & DrawerRouterOptions
    & DrawerNavigationConfig
    & {
        /** Returns a wrapper around the passed contents. */
        render?: ExtendableDrawerRender;
    };

/** Definition of the render function. */
export interface ExtendableDrawerRender {
    (contents: React.ReactElement, routerDetails: ExtendableDrawerRouterDetails): React.ReactElement;
}

/** The Navigation type for the Drawer. */
export type ExtendableDrawerNavigation = Navigation & {
    dispatch(action: DrawerActionType | ((state: DrawerRouterState) => DrawerActionType)): void;
}

/** The descriptors for the Drawer routes. */
export type ExtendableDrawerNavigationRouteDescriptors = NavigationRouteDescriptors<DrawerRouterState, DrawerNavigationOptions>

 /** Copied from source, since it's not exported. */
type DrawerNavigationEventMap = {
    drawerOpen: { data: undefined };
    drawerClose: { data: undefined };
};

//</editor-fold>

/**
 * A Drawer navigator that allows you to pass in a `render` function to wrap around the contents.
 * @link https://reactnavigation.org/docs/custom-navigators/
 */
export function ExtendableDrawerNavigator(props: PropsWithChildren<ExtendableDrawerProps>) {
    const { render = defaultRender } = props;
    const attr = useNavigationBuilder<
        DrawerRouterState,
        DrawerRouterOptions,
        DrawerNavigationOptions,
        DrawerNavigationEventMap
    >(DrawerRouter, {
        backBehavior: props.backBehavior,
        children: props.children,
        initialRouteName: props.initialRouteName,
        openByDefault: props.openByDefault,
        screenOptions: props.screenOptions,
    });
    const {navigation, state, descriptors} = attr;

    return <NavigationHelpersContext.Provider value={navigation}>
        {render(
            <DrawerView {...attr} />,
            {navigation: navigation as any, state, descriptors}
        )}
    </NavigationHelpersContext.Provider>;
}
export const createExtendableDrawerNavigator = createNavigatorFactory(ExtendableDrawerNavigator);

const defaultRender: ExtendableDrawerRender = (contents, {navigation, state, descriptors}) => {
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
