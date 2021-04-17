import {LoggedInUserState, loggedInUser_reducer} from "./loggedInUser/loggedInUser_reducer";
import {DecksState, decks_reducer} from "./decks/decks_reducer";
import {ToastState, toast_reducer} from "./toast/toast_reducer";
import {NavigationState, navigation_reducer} from "./navigation/navigation_reducer";
import {PortalState, portal_reducer} from "./portals/portal_reducer";

// Store Type Definition.
export interface StoreState {
    loggedInUser: LoggedInUserState;
    decks: DecksState;
    toast: ToastState;
    navigation: NavigationState;
    portal: PortalState;
}
export type StateName = keyof StoreState;

// Map Reducers to keys.
type ReducerMap = { [key in StateName]: any }; // Same keys as StoreState
export const reducerMap: ReducerMap = {
    loggedInUser: loggedInUser_reducer,
    decks: decks_reducer,
    toast: toast_reducer,
    navigation: navigation_reducer,
    portal: portal_reducer,
};
