import { createRouteConfig } from "../../navigation/navigation_utils";
import DeckRoutes from "./DeckRoutes";
import DeckEditScreen from "./DeckEdit/DeckEditScreen";
import DeckListScreen from "./DeckList/DeckListScreen";
import DeckViewScreen from "./DeckView/DeckViewScreen";

export const routes = {
    [DeckRoutes.List]: createRouteConfig(DeckListScreen, 'list'),
    [DeckRoutes.Edit]: createRouteConfig(DeckEditScreen, 'edit/:deckId'),
    [DeckRoutes.View]: createRouteConfig(DeckViewScreen, 'view/:deckId'),
};

export const routeConfig = {
    initialRouteName: DeckRoutes.List,
    defaultNavigationOptions: {}
};
