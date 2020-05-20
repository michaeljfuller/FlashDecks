import React, {Component} from "react";
import {NavigationNavigator, NavigationRouter} from "react-navigation";
import {NavigationScreenProps, NavigationRoute} from "../navigation_types";
export * from './setNavigator';

export type NavigatorBaseProps = NavigationScreenProps
export interface NavigatorBaseState {
    /** Routes that won't appear in the navigator. */
    hiddenRouteKeys: string[];
}

/**
 * @example
 *      @setNavigator(createSwitchNavigator(routes, routeConfig))
 *      class MyNewNavigator extends NavigatorBase {
 *          hiddenRouteKeys = ['some-page'];
 *          render() {
 *              return <View>
 *                  <Text>MyNewNavigator</Text>
 *                  {super.render()}
 *              </View>
 *          }
 *      }
 */
export abstract class NavigatorBase<
    Props = any, State = any, NavigationOptions = any, NavigationPropType = any
> extends Component<Props & NavigatorBaseProps, State & NavigatorBaseState> {
    //<editor-fold desc="Properties">

    /** Routes that won't appear as tabs */
    state = {
        hiddenRouteKeys: [] as string[]
    } as State & NavigatorBaseState;

    //</editor-fold>
    //<editor-fold desc="Accessors">

    /** Get the static navigator defined on the child class. Set by @setNavigator(). */
    get navigator(): NavigationNavigator<NavigationOptions, NavigationPropType> {
        const childClass = (this as any).constructor;
        return childClass.navigator;
    }

    /** Get the static navigator defined on the child class. Set by @setNavigator(). */
    get router(): NavigationRouter<NavigationOptions> {
        const childClass = (this as any).constructor;
        return childClass.router;
    }

    /** Get the routes not excluded by hiddenRouteKeys */
    get visibleRoutes(): NavigationRoute[] {
        let result: NavigationRoute[] = this.props.navigation.state.routes;
        if (this.state.hiddenRouteKeys) {
            result = result.filter(
                route => this.state.hiddenRouteKeys.indexOf(route.key) < 0
            );
        }
        return result;
    }

    //</editor-fold>
    //<editor-fold desc="Actions">

    /** Navigate to the passed route. */
    navigateTo(routeKey: string) {
        this.props.navigation.state.params = {}; // Clear Navigation params
        this.props.navigation.navigate(routeKey);
    }

    //</editor-fold>
}
