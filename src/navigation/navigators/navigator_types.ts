import {NavigationDescriptor, NavigationState} from "react-navigation";
import {NavigationScreenProps, RootNavigationProperties} from "../navigation_types";

export {
    NavigationDescriptor
} from "react-navigation";

/**
 * Properties for a navigator created with `createNavigator()` from `react-navigation`.
 */
export interface NavigatorComponentProps<
    State = NavigationState,
    Props = RootNavigationProperties
> extends NavigationScreenProps<State, Props> {
    descriptors: { [routeKey: string]: NavigationDescriptor };
    screenProps?: object;
}
