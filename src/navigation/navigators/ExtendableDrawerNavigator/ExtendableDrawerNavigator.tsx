//<editor-fold desc="Imports">

import React, {useEffect} from "react";
import {
    createNavigatorFactory,
    DefaultNavigatorOptions,
    DrawerNavigationState,
    DrawerRouter,
    DrawerRouterOptions,
    NavigationHelpersContext,
    useNavigationBuilder,
    DrawerActionType,
} from '@react-navigation/native';
import {DrawerView, DrawerNavigationOptions} from '@react-navigation/drawer';
import {DrawerNavigationConfig} from "@react-navigation/drawer/lib/typescript/src/types";
import {Navigation, NavigationRouteDescriptors, NavigationRouterDetails} from "../../navigation_types";
import ExtendableDrawerContents from "./ExtendableDrawerContents";
import {ExtendableDrawerRender, defaultRender} from "./ExtendableDrawerRenderer";

export * from "./ExtendableDrawerRenderer";

//</editor-fold>
//<editor-fold desc="Types">

export type ExtendableDrawerNavigationState = DrawerNavigationState;
export type ExtendableDrawerRouterDetails = NavigationRouterDetails<
    ExtendableDrawerNavigation, ExtendableDrawerNavigationState, ExtendableDrawerNavigationRouteDescriptors
>;

/** Properties for the component, extending DrawerNavigationOptions. */
export type ExtendableDrawerProps = DefaultNavigatorOptions<DrawerNavigationOptions>
    & DrawerRouterOptions
    & DrawerNavigationConfig
    & {
        /** Returns a wrapper around the passed contents. */
        render?: ExtendableDrawerRender;
        /** Pass on ExtendableDrawerRouterState */
        onChange?: (state: ExtendableDrawerNavigationState) => void;
    };

/** The Navigation type for the Drawer. */
export type ExtendableDrawerNavigation = Navigation & {
    dispatch(action: DrawerActionType | ((state: ExtendableDrawerNavigationState) => DrawerActionType)): void;
}

/** The descriptors for the Drawer routes. */
export type ExtendableDrawerNavigationRouteDescriptors = NavigationRouteDescriptors<ExtendableDrawerNavigationState, DrawerNavigationOptions>

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
export function ExtendableDrawerNavigator(props: ExtendableDrawerProps) {
    const { render = defaultRender, initialRouteName, onChange } = props;
    const navAttributes = useNavigationBuilder<
        ExtendableDrawerNavigationState,
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
    const {navigation, state, descriptors} = navAttributes;

    // Pass on state changes
    useEffect(() => {
        onChange && onChange(state);
    }, [onChange, state]);

    // Render the children
    const children = render(
        <DrawerView {...navAttributes} drawerContent={ExtendableDrawerContents} />,
        {
            navigation: navigation as any,
            state,
            descriptors,
            initialRouteName,
        },
    );
    return <NavigationHelpersContext.Provider value={navigation}>
        {children}
    </NavigationHelpersContext.Provider>;
}
export const createExtendableDrawerNavigator = createNavigatorFactory(ExtendableDrawerNavigator);
