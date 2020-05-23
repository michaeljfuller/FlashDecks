import {Navigation, NavigationRoute} from "../../src/navigation/navigation_types";
export {Navigation, NavigationRoute} from "../../src/navigation/navigation_types";

interface PartialNavigationRoute {
    routeName: string;
    key: string;
    routes?: PartialNavigationRoute[];
    index?: number;
}
export type TestNavigationRoute = PartialNavigationRoute | NavigationRoute;

export const defaultMockNavigationRoute: NavigationRoute = Object.freeze({
    key: 'defaultMockNavigationRoute-KEY',
    routeName: 'defaultMockNavigationRoute-ROUTE_NAME',
    index: 0,
    routes: [],
    isTransitioning: false
});
export function createMockNavigation(
    routes?: TestNavigationRoute[],
    stateParams?: object,
    index = 0
): Navigation {
    routes = routes || [defaultMockNavigationRoute];
    stateParams = stateParams || {};
    const noop = (()=>{}) as any;
    return {
        toggleDrawer: noop,
        navigate: noop,
        state: {
            routes,
            index,
            params: stateParams
        },
        router: { }
    } as Navigation;
}
