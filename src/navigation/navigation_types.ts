import {
    NavigationScreenProp,
    NavigationOpenDrawerAction,
    NavigationCloseDrawerAction,
    NavigationToggleDrawerAction,
    NavigationParams,
    NavigationState
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
    State = NavigationState,
    Props = NavigationParams,
    Extras = RootNavigationProperties
> = NavigationScreenProp<State, Props> & Extras;

/**
 * Adds `navigation` to a Screen component's Properties.
 * Can define the state and extra properties (defaulting to root navigator).
 */
export interface NavigationScreenProps<
    State = NavigationScreenState,
    Props = {}
> {
    navigation: Navigation<State & NavigationState, Props & NavigationParams>;
}

export interface NavigationScreenState {
    key: string;
    routeName: string;
}
