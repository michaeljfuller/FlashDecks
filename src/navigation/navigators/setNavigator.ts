import {NavigationNavigator} from "react-navigation";

/**
 * Sets the base navigator on a TabNavigator
 * @see TabNavigator
 */
export function setNavigator(navigator: NavigationNavigator<any, any>) {
    return (classDescription: any) => {
        classDescription.navigator = navigator;
        classDescription.router = navigator.router; // Required by react-navigation.
        return classDescription;
    }
}
