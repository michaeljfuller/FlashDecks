import {IAction, ActionType} from '../store_actions';
import {DeckModel} from "../../models";

export interface DecksAdd extends IAction {
    type: ActionType.DECKS_ADD;
    deck: DeckModel;
}
export interface DecksRemove extends IAction {
    type: ActionType.DECKS_REMOVE;
    id: DeckModel['id'];
}
export interface DecksClear extends IAction {
    type: ActionType.DECKS_CLEAR;
}
