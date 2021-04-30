import AStoreHelper from "../AStoreHelper";
import {ActionType, DecksAdd, DecksRemove, DecksClear} from "../store";
import {DecksState} from "./decks_reducer";
import {DeckModel} from "../../models";
import {simpleFilter} from "../../utils/array";

type OneOrMany<Type> = Type|Type[];
type DeckFilter = Partial<Omit<DeckModel, 'owner'|'cards'>>;

export class DecksStore extends AStoreHelper<DecksState> {
    constructor() {
        super('decks');
    }

    //<editor-fold desc="Add">

    /** Add decks to the store. */
    add(deck: DeckModel): void;
    add(decks: DeckModel[]): void;
    add(deck: OneOrMany<DeckModel>): void {
        if (Array.isArray(deck)) return deck.forEach(this.add.bind(this));
        const action: DecksAdd = {type: ActionType.DECKS_ADD, deck};
        this.store.dispatch(action);
    }

    //</editor-fold>
    //<editor-fold desc="Remove">

    /** Remove decks from the store. */
    remove(id: DeckModel['id']): void;
    remove(ids: DeckModel['id'][]): void;
    remove(id: OneOrMany<DeckModel['id']>): void {
        if (Array.isArray(id)) return id.forEach(this.remove.bind(this));
        const action: DecksRemove = {type: ActionType.DECKS_REMOVE, id};
        this.store.dispatch(action);
    }

    //</editor-fold>

    /** Clear the store. */
    clear() {
        const action: DecksClear = {type: ActionType.DECKS_CLEAR};
        this.store.dispatch(action);
    }

    /** Return an array based on a passed filter. */
    static list(collection: DecksState['collection'], filter?: DeckFilter) {
        return simpleFilter(Object.values(collection), filter);
    }
}
export const decksStore = new DecksStore;
export default decksStore;
