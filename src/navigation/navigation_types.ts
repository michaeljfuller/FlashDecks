import {
    NavigationScreenProp,
    NavigationOpenDrawerAction,
    NavigationCloseDrawerAction,
    NavigationToggleDrawerAction,
    NavigationParams
} from "react-navigation";

export {
    NavigationRoute
} from "react-navigation";

/**
 * The actions on the Root navigator (Drawer).
 */
export interface RootNavigationProperties {
    openDrawer: () => NavigationOpenDrawerAction;
    closeDrawer: () => NavigationCloseDrawerAction;
    toggleDrawer: () => NavigationToggleDrawerAction;
}

/**
 * A navigation object with definable state and extra properties (defaulting to root navigator).
 */
export type Navigation<
    State = {},
    Props = RootNavigationProperties & NavigationParams
> = NavigationScreenProp<State, Props>;

/**
 * Adds `navigation` to a Screen component's Properties.
 * Can define the state and extra properties (defaulting to root navigator).
 */
export interface NavigationScreenProps<
    State = NavigationScreenState,
    Props = RootNavigationProperties
> {
    navigation: Navigation<State, Props>;
}

export interface NavigationScreenState {
    key: string;
    routeName: string;
}
