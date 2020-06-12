import {NavigationRoute, NavigationState, NavigationRouteConfig} from 'react-navigation';
import {Navigation} from "./navigation_types";
import {uniq} from 'underscore';

export function createRouteConfig(component: Function, path: string, navigationOptions = {}, params = {}): NavigationRouteConfig<{}, {}> {
    return {
        screen: component as any,
        path,
        navigationOptions,
        params
    };
}

/**
 * Get the active routes from the Navigation object.
 */
export function getCurrentRoutes(navigation: Navigation): NavigationRoute[] {
    return uniq([
        navigation.state.routes[0] // Prepend Home
    ].concat(
        getCurrentRoutesFromNavigationState(navigation.state)
    ));
}
function getCurrentRoutesFromNavigationState(navState: NavigationState): NavigationRoute[] {
    let result: NavigationRoute[] = [];
    if (navState && navState.routes) {
        const route = navState.routes[navState.index];
        if (route) {
            result.push(route);
            const children = getCurrentRoutesFromNavigationState(route);
            result = result.concat(children);
        }
    }
    return result;
}
