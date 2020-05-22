import {routeConfig, routes} from "./AppContainer_routes";
import {createNavigatorDrawer} from "../navigation/navigators/DrawerNavigator/createNavigatorDrawer";

export const AppNavigator = createNavigatorDrawer(routes, routeConfig);
export default AppNavigator;
