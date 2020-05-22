import {LoggedInUserStore} from "./LoggedInUserStore";
import {LoggedInUserState} from "./loggedInUser_reducer";
import {LoggedInUserSet, LoggedInUserRemove} from "./loggedInUser_actions";
import {ActionType} from "../store_actions";
import {mockStoreBuilder, expectStore} from "../../../test/mocks/MockStoreBuilder";

describe('LoggedInUserStore', () => {
    function setup(initialState: LoggedInUserState = {value: null}) {
        const store = mockStoreBuilder.create(initialState);
        const helper = new LoggedInUserStore(store);
        return {store, helper};
    }

    describe('logIn', () => {
        it('dispatches action with user', () => {
            const {helper, store} = setup();
            const user = { id: 'test_id', displayName: 'mock-user' } as User;
            helper.update(user);
            expectStore(store).toOnlyHaveAction<LoggedInUserSet>({
                type: ActionType.LOGGED_IN_USER_SET,
                value: user
            });
        });
    });

    describe('logOut', () => {
        it('dispatches action', () => {
            const {helper, store} = setup({
                value: { id: 'test_id', displayName: 'mock-initial-user' } as User
            });
            helper.clear();
            expectStore(store).toOnlyHaveAction<LoggedInUserRemove>({
                type: ActionType.LOGGED_IN_USER_REMOVE
            });
        });
    });

});
