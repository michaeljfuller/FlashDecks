import { createDrawerNavigator } from "react-navigation-drawer";
import { CreateDrawerNavigatorConfig, DrawerRouteConfigMap } from "./createNavigatorDrawer_types";

/**
 * Create a Drawer with `react-navigation-drawer`.
 * @link https://github.com/react-navigation/drawer/blob/master/src/navigators/createDrawerNavigator.tsx
 */
export function createCustomDrawerNavigator(
    routes: DrawerRouteConfigMap,
    routeConfig: CreateDrawerNavigatorConfig = {}
) {
    const defaultRouteConfig = {
        drawerBackgroundColor: 'white',
        overlayColor: 'rgba(180,180,180,0.5)',
        lazy: true,
        unmountInactiveRoutes: true,
        drawerType: 'slide',
        swipeEdgeWidth: 50
    };
    return createDrawerNavigator(
        routes,
        Object.assign(defaultRouteConfig, routeConfig)
    );
}
