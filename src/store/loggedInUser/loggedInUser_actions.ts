import { IAction, ActionType } from '../store_actions';
import {UserModel} from "../../models";

export interface LoggedInUserSet extends IAction {
    type: ActionType.LOGGED_IN_USER_SET;
    value: UserModel;
}
export interface LoggedInUserRemove extends IAction {
    type: ActionType.LOGGED_IN_USER_REMOVE;
}
