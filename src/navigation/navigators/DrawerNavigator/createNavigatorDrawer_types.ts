import { CreateNavigatorConfig, NavigationRouteConfigMap } from "react-navigation";

type TODO = any;

export interface DrawerNavigatorConfig {
    drawerWidth?: number | (() => number);
}

export type DrawerRouteConfigMap = NavigationRouteConfigMap<
    TODO, // Options
    TODO  // NavigationScreenPropType
>;
export type CreateDrawerNavigatorConfig = CreateNavigatorConfig<
    DrawerNavigatorConfig,  // NavigatorConfig
    TODO,                   // RouterConfig
    TODO,                   // Options
    TODO                    // NavigationScreenPropType
>;
