import {ActionType} from '../store_actions';
import {createReducer} from "../reducerHelpers";
import {LoggedInUserSet} from './loggedInUser_actions';
import {UserModel} from "../../models";

export interface LoggedInUserState {
    value: UserModel|null;
}

export const loggedInUser_reducer = createReducer<LoggedInUserState>(
    (draft, action) => {
        switch (action.type) {
            case ActionType.LOGGED_IN_USER_SET: return draft.value = (action as LoggedInUserSet).value;
            case ActionType.LOGGED_IN_USER_REMOVE: return draft.value = null;
        }
    }, { value: null }
);

