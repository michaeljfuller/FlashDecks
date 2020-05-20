import React, {Component} from "react";
import {Button} from "react-native";
import AppNavigator from './AppContainer_navigator';
import AppDrawer from './AppDrawer';
import NavigationContainer from "../navigation/NavigationContainer";
import {NavigationScreenProps} from "../navigation/navigation_types";

export interface AppContainerProps extends NavigationScreenProps {}
export interface AppContainerState {}

/**
 * Container for most of the App's functionality after AppRoot.
 */
export class AppContainer extends Component<AppContainerProps, AppContainerState> {
    static router = AppNavigator.router;

    componentDidMount() {
        console.log(this);
    }

    toggleSidebar = () => this.props.navigation.toggleDrawer();

    render() {
        return <NavigationContainer>
            <h1>AppContainer</h1>
            <Button title="Sidebar" onPress={this.toggleSidebar} />
            <AppDrawer navigation={this.props.navigation} />
        </NavigationContainer>;
    }
}
