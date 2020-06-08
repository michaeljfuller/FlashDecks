import AppRoutes from './AppRoutes';
import {routeConfig} from './AppContainer_routes';
import DeckRouteTree from './Deck/DeckRouteTree';

export const AppRoutesTree = {
    base: routeConfig.initialRouteName,
    children: {
        [AppRoutes.Home]: null,
        [AppRoutes.Temp]: null,
        [AppRoutes.Decks]: DeckRouteTree,
    }
};

export {AppRoutes};
export * from './Deck/DeckRouteTree';
export default AppRoutesTree;

