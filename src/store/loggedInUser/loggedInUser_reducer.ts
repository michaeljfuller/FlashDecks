import {ActionType, IAction} from '../store_actions';
import {LoggedInUserSet} from './loggedInUser_actions';
import {UserModel} from "../../models";

export interface LoggedInUserState {
    value: UserModel|null;
}
const initialState: LoggedInUserState = {
    value: null
};

export function loggedInUser_reducer(state: LoggedInUserState = initialState, action: IAction): LoggedInUserState {
    switch (action.type) {
        case ActionType.LOGGED_IN_USER_SET: return { ...state, value: (action as LoggedInUserSet).value };
        case ActionType.LOGGED_IN_USER_REMOVE: return { ...state, value: null };
    }
    return state;
}
