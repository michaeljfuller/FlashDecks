import React from "react";
import * as Linking from 'expo-linking';
import {NativeEventSubscription} from "react-native";
import {LinkingOptions} from '@react-navigation/native';
import {RouteProp} from "@react-navigation/core/lib/typescript/src/types";
import {ParamListBase} from "@react-navigation/routers";

import {
    createExtendableDrawerNavigator, ExtendableDrawerRender, ExtendableDrawerNavigationState,
} from "../../../navigators/ExtendableDrawerNavigator/ExtendableDrawerNavigator";
import {toggleDrawer} from "../../appNavigationRef";

import {toastStore} from "../../../../store/toast/ToastStore";
import {AuthApi} from "../../../../api/AuthApi";

import AppBanner from "../../../../components/banner/AppBanner";
import InfoBanner from "../../../../components/banner/InfoBanner";

import appRouteScreens from "../../../../screens/appRouteScreens";
import AppRoutesTree from "../../../../screens/AppRouteTree";

const DrawerNavigator = createExtendableDrawerNavigator();
const auth = new AuthApi;

export interface ScreenNavigationParams {
    title?: string;
}
export interface ScreenNavigationState {
    navigationState?: ExtendableDrawerNavigationState;
}

/**
 * A component defining the root navigation for the app.
 * Handles the top-level navigation of screens listed in `appRouteScreens.ts`, that will appear in the drawer/sidebar.
 */
export class ScreenNavigation extends React.Component<ScreenNavigationParams, ScreenNavigationState> {
    state = {} as ScreenNavigationState;
    hardwareBackPress?: NativeEventSubscription;

    /**
     * https://reactnavigation.org/docs/deep-linking/
     * https://docs.expo.io/workflow/linking/
     */
    linking = {
        prefixes: [
            Linking.makeUrl('/')
        ],
    } as LinkingOptions;

    signOut = () => {
        auth.signOut().catch(e => toastStore.addError(e, 'Error signing out'));
    }

    renderContents: ExtendableDrawerRender = (contents, routerDetails) => {
        return <React.Fragment>
            <AppBanner routerDetails={routerDetails} onToggleSidebar={toggleDrawer} onSignOutClick={this.signOut} />
            <InfoBanner />
            {contents}
        </React.Fragment>;
    };

    onChange = (navigationState: ExtendableDrawerNavigationState) => {
        this.setState({navigationState});
    };

    getScreenOptions = (props: {
        route: RouteProp<ParamListBase, string>;
    }) => {
        const params: ScreenNavigationParams = props.route.params || {};
        return {
            title: params.title || props.route.name
        };
    }

    /**
     * Create a screen that will be destroyed when navigating away.
     */
    createScreen(name: string, Component: React.ComponentType<any>, options?: any) {
        const {routes, index = 0} = this.state.navigationState || {};
        const currentRoute = routes ? routes[index].name : '';
        const isCurrentRoute = currentRoute === name;
        return <DrawerNavigator.Screen
            key={name}
            name={name}
            component={isCurrentRoute ? Component : () => null}
            options={options}
        />;
    }

    render() {
        return <DrawerNavigator.Navigator
            initialRouteName={AppRoutesTree.base}
            screenOptions={this.getScreenOptions}
            render={this.renderContents}
            onChange={this.onChange}
        >
            {appRouteScreens.map(data => this.createScreen(data.routeName, data.component, data.options))}
        </DrawerNavigator.Navigator>;
    }
}
