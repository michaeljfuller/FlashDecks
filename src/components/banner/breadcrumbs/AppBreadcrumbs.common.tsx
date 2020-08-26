import {
    Navigation,
    NavigationRouterDetails,
    NavigationRouteState,
    StatefulRoute
} from "../../../navigation/navigation_types";
import {getBaseRouteFromName} from '../../../routes';
import {AppBreadcrumbsStoreProps} from "./AppBreadcrumbs_redux";

export interface AppBreadcrumbsProps {
    routerDetails: NavigationRouterDetails;
}

/** Return the active routes from the given state. */
export function getCurrentRoutes(state: NavigationRouteState, options?: { filterInitial?: boolean }): StatefulRoute[] {
    const { filterInitial = false } = options || {};
    let result = _getCurrentRoutes(state);

    if (filterInitial) { // Don't include if this is the initialRoute of the previous route.
        result = result.filter((route, index) => {
            const previousRoute = index - 1 >= 0 ? result[index - 1] : null;
            return !(previousRoute && getBaseRouteFromName(previousRoute.name) === route.name);
        });
    }

    return result;
}
function _getCurrentRoutes(state: NavigationRouteState): StatefulRoute[] {
    const {index=0, routes} = state;
    const route = routes[index];
    if (!route) return [];
    if (route.state) return [route, ...getCurrentRoutes(route.state as NavigationRouteState)];
    return [route];
}

/**
 * Navigate to a particular route, based on its position in the chain.
 * @param {StatefulRoute[]}        routes     - The route chain, ending with the route we want to end up at.
 * @param {Navigation}             navigation - Navigator to do the action.
 * @param {NavigationBlockPayload} blockers   - Potential navigation blockers.
 * @link https://reactnavigation.org/docs/nesting-navigators/#navigating-to-a-screen-in-a-nested-navigator
 */
export function navigateTo(
    routes: StatefulRoute[],
    navigation: Navigation,
    blockers: AppBreadcrumbsStoreProps['navBlockers']
) {
    if (blockers.length) {
        blockers.forEach(({attemptCallback, reason, ref}) => {
            attemptCallback && attemptCallback(reason, ref);
        });
        return;
    }

    if (routes.length === 0) throw new Error('No routes passed to AppBreadcrumbs navigateTo()');
    const rootRoute = routes[0];
    const subRoutes = routes.slice(1); // Remove rootRoute

    // See if there's a leaf route (i.e. initialRouteName) we should be using.
    const leafRouteName = getBaseRouteFromName(rootRoute.name);
    const rootRoutes = rootRoute.state?.routes as StatefulRoute[];
    if (leafRouteName && rootRoutes) {
        const leafRoute = rootRoutes.find((route: StatefulRoute) => route.name === leafRouteName);
        if (leafRoute) subRoutes.unshift(leafRoute);
    }

    // Create nested NavigateParams.
    // Each object contains the current route's params and, if there's a child screen, the name of its route.
    /* Example:
        "RouteA",
        {
            thing: "Param for RouteA",
            screen: "RouteB",
            params: {
                thing: "Param for RouteB",
                screen: "RouteC",
                params: { thing: "Param for RouteC" }
            }
        }
     */
    const params = Object.assign(
        { screen: leafRouteName } as NavigateParams,
        rootRoute.params,
        subRoutes.reduceRight<NavigateParams|undefined>(
            (result, route) => ({
                screen: getBaseRouteFromName(route.name),
                params: Object.assign({}, route.params, result)
            }),
            undefined
        )
    );

    navigation.navigate(rootRoute.name, params);
}
interface NavigateParams {
    params?: NavigateParams;
    screen?: string;
    [key: string]: any;
}
