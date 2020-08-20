import {ActionType} from '../store_actions';
import {createReducer, castDraft, Draft} from "../reducerHelpers";
import {DecksAdd, DecksRemove} from './decks_actions';
import {ApiDeck, DeckModel} from "../../models";
import {repeat} from "../../utils/array";

export interface DecksState {
    collection: Record<DeckModel['id'], DeckModel>;
}

const initialState: DecksState = { collection: {} };
repeat(7, index => DeckModel.fromApi({
    id: `deck-${index+1}`,
    name: `Deck #${index+1}`,
    description: `Sample deck`,
    ownerId: `user-${index+1}`,
    owner: { id: `user-${index}`, displayName: `User${index+1}` },
} as ApiDeck)).forEach(mock => initialState.collection[mock.id] = mock);

export const decks_reducer = createReducer<DecksState>(
    (draft, action) => {
        switch (action.type) {
            case ActionType.DECKS_ADD: return addDeck(draft, action as DecksAdd);
            case ActionType.DECKS_REMOVE: return removeDeck(draft, action as DecksRemove);
            case ActionType.DECKS_CLEAR: return draft.collection = {};
        }
    }, initialState
);

function addDeck(draft: Draft<DecksState>, action: DecksAdd) {
    draft.collection[action.deck.id] = castDraft(action.deck);
}
function removeDeck(draft: Draft<DecksState>, action: DecksRemove) {
    delete draft.collection[action.id];
}
