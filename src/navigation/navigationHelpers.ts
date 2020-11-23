import {Navigation, RouteNameOrOptions} from "./navigation_types";
import {appTree} from "../routes";

/** Go back, but with a fallback in the case of there being nowhere to go (i.e. fresh page load). */
export function goBack(
    navigation: Navigation,
    fallbackRouteNameOrOptions: RouteNameOrOptions = appTree.AppRoutes.Home
) {
    const nav: Navigation|any = navigation;
    if (!nav.canGoBack || nav.canGoBack()) { // If method doesn't exist, or returns true.
        nav.goBack();
    } else if (nav.replace) { // Try to replace history, so going back isn't a step forwards.
        nav.replace(fallbackRouteNameOrOptions);
    } else {
        navigation.navigate(fallbackRouteNameOrOptions);
    }
}
