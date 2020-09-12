import {Action, Dispatch} from "redux";

export type IAction = Action<ActionType>
export type DispatchAction<T extends IAction = IAction> = Dispatch<T>;

export enum ActionType {
    LOGGED_IN_USER_SET = 'LOGGED_IN_USER_SET',
    LOGGED_IN_USER_REMOVE = 'LOGGED_IN_USER_REMOVE',

    DECKS_ADD = 'DECKS_ADD',
    DECKS_REMOVE = 'DECKS_REMOVE',
    DECKS_CLEAR = 'DECKS_CLEAR',

    CARDS_ADD = 'CARDS_ADD',
    CARDS_REMOVE = 'CARDS_REMOVE',
    CARDS_CLEAR = 'CARDS_CLEAR',

    TOAST_ADD = 'TOAST_ADD',
    TOAST_SHIFT = 'TOAST_SHIFT',
    TOAST_REMOVE_BY_REF = 'TOAST_REMOVE_BY_REF',

    NAVIGATION_BLOCK = 'NAVIGATION_BLOCK',
    NAVIGATION_UNBLOCK = 'NAVIGATION_UNBLOCK',
}
