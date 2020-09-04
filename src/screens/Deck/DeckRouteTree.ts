import DeckRoutes from './DeckRoutes';
import {NavigationTree} from "../screens_types";

export const DeckRoutesTree = {
    base: DeckRoutes.List,
    children: {
        [DeckRoutes.List]: null,
        [DeckRoutes.Edit]: null,
        [DeckRoutes.View]: null,
    }
} as NavigationTree;
export {
    DeckRoutes
}
export default DeckRoutesTree;
