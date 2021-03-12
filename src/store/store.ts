import {createStore, combineReducers, Store} from 'redux';
import {reducerMap, StoreState} from './store_manifest';
import {isProduction} from "../env";

const useReduxDevTools = !isProduction;

// Create Store
const rootReducer = combineReducers(reducerMap);
const reduxDevToolsExtension: Function = useReduxDevTools && window['__REDUX_DEVTOOLS_EXTENSION__' as any] as any;
export const store: AppStore = createStore(
    rootReducer,
    /* preloadedState, */
    reduxDevToolsExtension && reduxDevToolsExtension()
);
export type AppStore = Store<StoreState>;
export default store;

// Barrel
export * from './store_manifest';
export * from './store_actions';

export * from './loggedInUser/loggedInUser_actions';
export * from './loggedInUser/loggedInUser_reducer';

export * from './decks/decks_actions';
export * from './decks/decks_reducer';

export * from './cards/cards_actions';
export * from './cards/cards_reducer';

export * from './toast/toast_actions';
export * from './toast/toast_reducer';

export * from './navigation/navigation_actions';
export * from './navigation/navigation_reducer';
