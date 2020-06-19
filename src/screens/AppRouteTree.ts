import {AppRoutes} from './AppRoutes';
import DeckRouteTree from './Deck/DeckRouteTree';

export const AppRoutesTree = {
    base: AppRoutes.Home,
    children: {
        [AppRoutes.Home]: null,
        [AppRoutes.Temp]: null,
        [AppRoutes.Decks]: DeckRouteTree,
    }
};

export {AppRoutes};
export * from './Deck/DeckRouteTree';
export default AppRoutesTree;

