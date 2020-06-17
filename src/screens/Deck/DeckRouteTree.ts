import DeckRoutes from './DeckRoutes';

export const DeckRoutesTree = {
    base: DeckRoutes.List,
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
