import { IAction, ActionType } from '../store_actions';

export interface LoggedInUserSet extends IAction {
    type: ActionType.LOGGED_IN_USER_SET;
    value: User;
}
export interface LoggedInUserRemove extends IAction {
    type: ActionType.LOGGED_IN_USER_REMOVE;
}
