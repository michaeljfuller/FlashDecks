import AStoreHelper from "../AStoreHelper";
import {ActionType, LoggedInUserRemove, LoggedInUserSet} from "../store";
import {LoggedInUserState} from "./loggedInUser_reducer";
import {UserModel} from "../../models";

export class LoggedInUserStore extends AStoreHelper<LoggedInUserState> {
    constructor() {
        super('loggedInUser');
    }

    /** Add user to the store. */
    update(user: UserModel) {
        const action: LoggedInUserSet = {type: ActionType.LOGGED_IN_USER_SET, value: user};
        this.store.dispatch(action);
    }

    /** Remove user from the store. */
    clear() {
        const action: LoggedInUserRemove = {type: ActionType.LOGGED_IN_USER_REMOVE};
        this.store.dispatch(action);
    }
}
export const loggedInUserStore = new LoggedInUserStore;
export default loggedInUserStore;
