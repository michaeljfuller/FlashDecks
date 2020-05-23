import {Action, Dispatch} from "redux";

export type IAction = Action<ActionType>
export type DispatchAction<T extends IAction = IAction> = Dispatch<T>;

export enum ActionType {
    LOGGED_IN_USER_SET = 'LOGGED_IN_USER_SET',
    LOGGED_IN_USER_REMOVE = 'LOGGED_IN_USER_REMOVE'
}
