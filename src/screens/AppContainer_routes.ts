import { createRouteConfig } from "../navigation/navigation_utils";
import AppRoutes from "./AppRoutes";
import DashboardScreen from "./Dashboard/DashboardScreen";
import TempScreen from "./Temp/TempScreen";

/**
 * Map route keys to components & paths.
 */
export const routes = {
    [AppRoutes.Home]: createRouteConfig(DashboardScreen, ''),
    [AppRoutes.Temp]: createRouteConfig(TempScreen, 'temp'),
};

/**
 * The route configuration, specifying the default route and display order.
 */
export const routeConfig = {
    initialRouteName: AppRoutes.Temp,
    order: [
        AppRoutes.Home,
        AppRoutes.Temp,
    ],
    drawerWidth: 300
};
