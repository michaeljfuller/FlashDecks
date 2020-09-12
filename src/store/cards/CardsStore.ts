import AStoreHelper from "../AStoreHelper";
import {ActionType, CardsAdd, CardsRemove, CardsClear} from "../store";
import {CardsState} from "./cards_reducer";
import {CardModel} from "../../models";
import {simpleFilter} from "../../utils/array";

type OneOrMany<Type> = Type|Type[];
type CardFilter = Partial<Omit<CardModel, 'owner'|'cards'>>;

export class CardsStore extends AStoreHelper<CardsState> {
    constructor() {
        super('cards');
    }

    //<editor-fold desc="Add">

    /** Add cards to the store. */
    add(card: CardModel): void;
    add(cards: CardModel[]): void;
    add(card: OneOrMany<CardModel>): void {
        if (Array.isArray(card)) return card.forEach(this.add.bind(this));
        const action: CardsAdd = {type: ActionType.CARDS_ADD, card};
        this.store.dispatch(action);
    }

    //</editor-fold>
    //<editor-fold desc="Remove">

    /** Remove cards from the store. */
    remove(id: CardModel['id']): void;
    remove(ids: CardModel['id'][]): void;
    remove(id: OneOrMany<CardModel['id']>): void {
        if (Array.isArray(id)) return id.forEach(this.remove.bind(this));
        const action: CardsRemove = {type: ActionType.CARDS_REMOVE, id};
        this.store.dispatch(action);
    }

    //</editor-fold>

    /** Clear the store. */
    clear() {
        const action: CardsClear = {type: ActionType.CARDS_CLEAR};
        this.store.dispatch(action);
    }

    /** Return an array based on a passed filter. */
    static list(collection: CardsState['collection'], filter?: CardFilter) {
        console.log('CardsStore.list', {collection, filter});
        return simpleFilter(Object.values(collection), filter);
    }
}
export const cardsStore = new CardsStore;
export default cardsStore;
