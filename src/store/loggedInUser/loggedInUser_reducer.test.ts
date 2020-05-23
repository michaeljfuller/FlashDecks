import {loggedInUser_reducer as reducer, LoggedInUserState} from "./loggedInUser_reducer";
import {ActionType} from "../store_actions";
import {LoggedInUserSet, LoggedInUserRemove} from "./loggedInUser_actions";

const initialState: LoggedInUserState = Object.freeze({
    value: null
});

describe('loggedInUser_reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {} as any)).toEqual(initialState);
    });

    it('replaces user on LOGGED_IN_USER_SET', () => {
        const value = { id: 'test_id', displayName: "New User"} as User;
        const action: LoggedInUserSet = { type: ActionType.LOGGED_IN_USER_SET, value };
        expect(reducer(initialState, action)).toEqual({value});
    });

    it('removes user on LOGGED_IN_USER_REMOVE', () => {
        const action: LoggedInUserRemove = { type: ActionType.LOGGED_IN_USER_REMOVE };
        expect(reducer(initialState, action)).toEqual({value: null});
    });

});
