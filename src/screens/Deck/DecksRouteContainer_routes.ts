import { createRouteConfig } from "../../navigation/navigation_utils";
import DeckRoutes from "./DeckRoutes";
import DeckEditScreen from "./DeckEdit/DeckEditScreen";
import DeckListScreen from "./DeckList/DeckListScreen";
import DeckViewScreen from "./DeckView/DeckViewScreen";

export const routes = {
    [DeckRoutes.Edit]: createRouteConfig(DeckEditScreen, 'edit'),
    [DeckRoutes.List]: createRouteConfig(DeckListScreen, 'list'),
    [DeckRoutes.View]: createRouteConfig(DeckViewScreen, 'view'),
};

export const routeConfig = {
    initialRouteName: DeckRoutes.List,
    defaultNavigationOptions: {}
};
