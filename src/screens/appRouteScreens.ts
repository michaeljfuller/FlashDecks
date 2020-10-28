import React from "react";
import AppRoutes from "./AppRoutes";

import DashboardScreen from "./Dashboard/DashboardScreen";
import TempScreen from "./Temp/TempScreen";
import ApiTempScreen from "./ApiTemp/ApiTempScreen";
import DeckRouteContainer from "./Deck/DeckRouteContainer";

export interface AppRouteScreenData {
    routeName: AppRoutes;
    component: React.ComponentType<any>;
    options?: object;
}
export const appRouteScreens: AppRouteScreenData[] = [
    { routeName: AppRoutes.Home, component: DashboardScreen },
    { routeName: AppRoutes.Temp, component: TempScreen },
    { routeName: AppRoutes.ApiTemp, component: ApiTempScreen },
    { routeName: AppRoutes.Decks, component: DeckRouteContainer },
];
export default appRouteScreens;
