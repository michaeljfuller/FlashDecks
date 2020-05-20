import {createNavigator, NavigationNavigator, NavigationProp, NavigationState} from "react-navigation";
import {
    CreateDrawerNavigatorConfig,
    DrawerRouteConfigMap,
    DrawerNavigatorConfig
} from "./createNavigatorDrawer_types";
import DrawerNavigator, {DrawerNavigatorViewProps} from './components/DrawerNavigator';
import {DrawerRouter} from "react-navigation-drawer";

/**
 * Turn the `DrawerNavigator` component into a navigator.
 * @link https://github.com/react-navigation/drawer/blob/master/src/navigators/createDrawerNavigator.tsx
 */
export function createNavigatorDrawer(
    routes: DrawerRouteConfigMap,
    routeConfig: CreateDrawerNavigatorConfig = {}
): NavigationNavigator<
    DrawerNavigatorViewProps,
    NavigationProp<NavigationState>
> {
    const DefaultDrawerConfig: DrawerNavigatorConfig = {};
    const mergedConfig = { ...DefaultDrawerConfig, ...routeConfig };
    const drawerRouter = DrawerRouter(routes, mergedConfig); // TODO Custom router

    // TODO: "don't have time to fix it right now" - From react-navigation-drawer, on typings.
    return createNavigator(DrawerNavigator as any, drawerRouter, mergedConfig);
}

// export * from './createCustomDrawerNavigator.native'; // Uncomment to use Native implementation.
