import {LoggedInUserState, loggedInUser_reducer} from "./loggedInUser/loggedInUser_reducer";
import {DecksState, decks_reducer} from "./decks/decks_reducer";

// Store Type Definition.
export interface StoreState {
    loggedInUser: LoggedInUserState;
    decks: DecksState;
}
export type StateName = keyof StoreState;

// Map Reducers to keys.
type ReducerMap = { [key in StateName]: any }; // Same keys as StoreState
export const reducerMap: ReducerMap = {
    loggedInUser: loggedInUser_reducer,
    decks: decks_reducer,
};
