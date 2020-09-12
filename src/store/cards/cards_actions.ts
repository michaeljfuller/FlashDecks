import {IAction, ActionType} from '../store_actions';
import {CardModel} from "../../models";

export interface CardsAdd extends IAction {
    type: ActionType.CARDS_ADD;
    card: CardModel;
}
export interface CardsRemove extends IAction {
    type: ActionType.CARDS_REMOVE;
    id: CardModel['id'];
}
export interface CardsClear extends IAction {
    type: ActionType.CARDS_CLEAR;
}
