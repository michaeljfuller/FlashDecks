import {ActionType} from '../store_actions';
import {createReducer, castDraft, Draft} from "../reducerHelpers";
import {CardsAdd, CardsRemove} from './cards_actions';
import {CardModel} from "../../models";

export interface CardsState {
    collection: Record<CardModel['id'], CardModel>;
}

export const cards_reducer = createReducer<CardsState>(
    (draft, action) => {
        switch (action.type) {
            case ActionType.CARDS_ADD: return addDeck(draft, action as CardsAdd);
            case ActionType.CARDS_REMOVE: return removeDeck(draft, action as CardsRemove);
            case ActionType.CARDS_CLEAR: return draft.collection = {};
        }
    }, { collection: {} }
);

function addDeck(draft: Draft<CardsState>, action: CardsAdd) {
    draft.collection[action.card.id] = castDraft(action.card);
}
function removeDeck(draft: Draft<CardsState>, action: CardsRemove) {
    delete draft.collection[action.id];
}
