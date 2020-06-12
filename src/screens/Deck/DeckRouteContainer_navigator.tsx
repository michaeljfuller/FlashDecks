import {routeConfig, routes} from "./DecksRouteContainer_routes";
import {createSwitchNavigator} from "react-navigation";

export const DeckRouteNavigator = createSwitchNavigator(routes, routeConfig);
export default DeckRouteNavigator;
