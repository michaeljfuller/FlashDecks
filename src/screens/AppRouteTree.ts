import {AppRoutes} from './AppRoutes';
import DeckRouteTree from './Deck/DeckRouteTree';
import {NavigationTree} from "./screens_types";

export const AppRoutesTree = {
    base: AppRoutes.Home,
    children: {
        [AppRoutes.Home]: null,
        [AppRoutes.Temp]: null,
        [AppRoutes.Decks]: DeckRouteTree,
    }
} as NavigationTree;

export {AppRoutes};
export * from './Deck/DeckRouteTree';
export default AppRoutesTree;

