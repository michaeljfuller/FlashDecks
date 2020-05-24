import React, {Component} from 'react';
import {View, Text, Button} from "react-native";
import {NavigationState, NavigationRoute, SceneView} from "react-navigation";
import {NavigationDrawerState} from "react-navigation-drawer";
import {DrawerNavigatorConfig} from '../createNavigatorDrawer_types';
import DrawerNavigatorItem from './DrawerNavigatorItem';
import {NavigatorComponentProps} from '../../navigator_types';

export interface DrawerNavigatorViewProps extends NavigatorComponentProps<NavigationDrawerState> {
    navigationConfig: DrawerNavigatorConfig;
}
export interface DrawerNavigatorViewState {
    isOpen: boolean;
}

/**
 * The Drawer component that displays DrawerNavigatorItems for each route.
 * @link https://github.com/react-navigation/drawer/blob/master/src/views/DrawerView.tsx
 */
class DrawerNavigator extends Component<DrawerNavigatorViewProps, DrawerNavigatorViewState> {
    state: DrawerNavigatorViewState = {
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
        prevProps: Readonly<DrawerNavigatorViewProps>,
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
        isOpen ? this.navigation.openDrawer() : this.navigation.closeDrawer();
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
        return this.state.isOpen && <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: this.props.navigationConfig.drawerWidth as number,
            height: '100vh',
            backgroundColor: '#DEF'
        }}>
            <Button title="Toggle" onPress={this.handleTogglePress} />
            {this.renderButtons()}
        </div>;
    }
    handleTogglePress = () => this.setDrawerOpen(!this.state.isOpen);

    /** Render a DrawerNavigatorItem for each route. */
    renderButtons() {
        return this.routes.map(route => this.renderButton(route));
    }

    /** Render a DrawerNavigatorItem for a route. */
    renderButton(route: NavigationRoute) {
        const isActive = this.activeRoute.key === route.key;
        return <DrawerNavigatorItem
            key={route.key}
            title={route.routeName}
            disabled={isActive}
            onPress={() => this.navigateTo(route)}
        />;
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
export default DrawerNavigator;
