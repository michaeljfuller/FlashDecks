import React, {Component} from 'react';
import {View, Text} from "react-native";
import {NavigationState, NavigationRoute, SceneView} from "react-navigation";
import {NavigationDrawerState} from "react-navigation-drawer";
import Drawer from '@material-ui/core/Drawer';
import MaterialUiDrawerItem from './MaterialUiDrawerItem';
import {DrawerNavigatorConfig} from '../createNavigatorDrawer_types';
import {NavigatorComponentProps} from "../../navigator_types";

export interface MaterialUiDrawerProps extends NavigatorComponentProps<NavigationDrawerState> {
    navigationConfig: DrawerNavigatorConfig & {
        drawerBackgroundColor: string;
        overlayColor: string;
    };
}
export interface MaterialUiDrawerState {
    isOpen: boolean;
}

/**
 * The Drawer component that displays an Item for each route.
 * @link https://github.com/react-navigation/drawer/blob/master/src/views/DrawerView.tsx
 */
export class MaterialUiDrawer extends Component<MaterialUiDrawerProps, MaterialUiDrawerState> {
    state: MaterialUiDrawerState = {
        isOpen: false
    };

    /** Shortcut accessor to the `navigation` property. */
    get navigation() {
        return this.props.navigation;
    }

    /**
     * Get the available routes.
     * @TODO Respect this.props.navigationConfig.order: string[]
     * @TODO Ignore some routes?
     */
    get routes(): NavigationRoute[] {
        return Object.values(this.props.descriptors).map(descriptor => descriptor.state);
    }

    /** The selected route in the navigation. */
    get activeRoute(): NavigationRoute {
        return this.navigation.state.routes[this.navigation.state.index];
    }

    componentDidMount() {
        console.log('Mounted', this);
    }

    componentDidUpdate(
        prevProps: Readonly<MaterialUiDrawerProps>,
    ): void {
        // Update state of drawer based on change to navigation state.
        const oldDrawerState = prevProps.navigation.state;
        const newDrawerState = this.navigation.state;
        if (newDrawerState.isDrawerOpen !== oldDrawerState.isDrawerOpen) {
            this.setState({ isOpen: newDrawerState.isDrawerOpen });
        }
    }

    /** Update the navigation state. */
    setDrawerOpen(isOpen = true) {
        isOpen ? this.navigation.openDrawer() : this.navigation.closeDrawer(); // Update navigation state
    }

    /** Navigate to the given route */
    navigateTo(route: NavigationState) {
        this.navigation.navigate(route.key, route.params);
    }

    /** Render the page contents and the drawer. */
    render() {
        return <View>
            <Text style={{backgroundColor: 'darkorange'}}>src/components/navigators/DrawerNavigator/views/DrawerView.tsx</Text>
            {this.renderContents()}
            {this.renderDrawer()}
        </View>
    }

    /** Render the drawer. */
    renderDrawer() {
        const {drawerBackgroundColor, overlayColor, drawerWidth} = this.props.navigationConfig;
        const width = typeof drawerWidth === 'function' ? drawerWidth() : drawerWidth;

        return <Drawer
            open={this.state.isOpen}
            onClose={this.handleClose}
            style={{ backgroundColor: overlayColor }}
        >
            <View style={{
                flex: 1,
                backgroundColor: drawerBackgroundColor,
                width
            }}>
                {this.renderButtons()}
            </View>
        </Drawer>
    }
    handleClose = () => this.setDrawerOpen(false);

    /** Render a DrawerNavigatorItem for each route. */
    renderButtons() {
        return this.routes.map(route => this.renderButton(route));
    }

    /** Render a DrawerNavigatorItem for a route. */
    renderButton(route: NavigationRoute) {
        const isActive = this.activeRoute.key === route.key;
        return <MaterialUiDrawerItem
            key={route.key}
            title={route.routeName}
            disabled={isActive}
            onClick={() => this.navigateTo(route)}
        >{route.routeName}</MaterialUiDrawerItem>;
    }

    /**
     * Render the page contents.
     * @TODO handle unmountInactiveRoutes - https://github.com/react-navigation/drawer/blob/master/src/views/DrawerView.tsx#L146
     */
    renderContents() {
        const descriptor = this.props.descriptors[this.activeRoute.key];
        return <SceneView
            navigation={descriptor.navigation}
            component={descriptor.getComponent()}
            screenProps={this.props.screenProps}
        />;
    }
}
export default MaterialUiDrawer;
