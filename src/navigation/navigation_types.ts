import {
    NavigationScreenProp,
    NavigationOpenDrawerAction,
    NavigationCloseDrawerAction,
    NavigationToggleDrawerAction,
    NavigationParams,
    NavigationState
} from "react-navigation";
import {NavigationState as NavigationRouteState} from '@react-navigation/routers';
import {Descriptor} from "@react-navigation/native";
export {NavigationRoute} from "react-navigation";

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

export interface NavigationRouteDescriptors<
    State extends NavigationRouteState = NavigationRouteState,
    ScreenOptions extends object = any
> {
    [routeKey: string]: Descriptor<
        Record<string, object | undefined>, // ParamList extends ParamListBase
        string,                             // RouteName extends keyof ParamList = string
        State,                              // State extends NavigationState = NavigationState
        ScreenOptions,                      // ScreenOptions extends object = {}
        {}                                  // EventMap extends EventMapBase = {}
    >;
}

/**
 * Collection of router details.
 */
export interface NavigationRouterDetails<
    Nav extends Navigation = Navigation,
    State extends NavigationRouteState = NavigationRouteState,
    Descriptors extends NavigationRouteDescriptors = NavigationRouteDescriptors
> {
    navigation: Nav;
    state: State;
    descriptors: Descriptors;
}
