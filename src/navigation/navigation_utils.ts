import { NavigationRouteConfig } from 'react-navigation';

export function createRouteConfig(component: Function, path: string, navigationOptions = {}, params = {}): NavigationRouteConfig<{}, {}> {
    return {
        screen: component as any,
        path,
        navigationOptions,
        params
    };
}
