import DeckRoutes from './DeckRoutes';
import {routeConfig} from './DecksRouteContainer_routes';

export const DeckRoutesTree = {
    base: routeConfig.initialRouteName,
    children: {
        [DeckRoutes.List]: null,
        [DeckRoutes.Edit]: null,
        [DeckRoutes.View]: null,
    }
};
export {
    DeckRoutes
}
export default DeckRoutesTree;
