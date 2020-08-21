import {ActionType} from '../store_actions';
import {createReducer, castDraft, Draft} from "../reducerHelpers";
import {DecksAdd, DecksRemove} from './decks_actions';
import {DeckModel} from "../../models";

export interface DecksState {
    collection: Record<DeckModel['id'], DeckModel>;
}

export const decks_reducer = createReducer<DecksState>(
    (draft, action) => {
        switch (action.type) {
            case ActionType.DECKS_ADD: return addDeck(draft, action as DecksAdd);
            case ActionType.DECKS_REMOVE: return removeDeck(draft, action as DecksRemove);
            case ActionType.DECKS_CLEAR: return draft.collection = {};
        }
    }, { collection: {} }
);

function addDeck(draft: Draft<DecksState>, action: DecksAdd) {
    draft.collection[action.deck.id] = castDraft(action.deck);
}
function removeDeck(draft: Draft<DecksState>, action: DecksRemove) {
    delete draft.collection[action.id];
}
