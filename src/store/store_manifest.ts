import {LoggedInUserState, loggedInUser_reducer} from "./loggedInUser/loggedInUser_reducer";

// Store Type Definition.
export interface StoreState {
    loggedInUser: LoggedInUserState;
}

// Map Reducers to keys.
type ReducerMap = { [key in keyof StoreState]: any }; // Same keys as StoreState
export const reducerMap: ReducerMap = {
    loggedInUser: loggedInUser_reducer
};
