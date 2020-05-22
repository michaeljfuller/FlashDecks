import {createStore, combineReducers} from 'redux';
import {reducerMap} from './store_manifest';

const useReduxDevTools = true;

// Create Store
const rootReducer = combineReducers(reducerMap);
const reduxDevToolsExtension: Function = useReduxDevTools && window['__REDUX_DEVTOOLS_EXTENSION__' as any] as any;
export const store = createStore(
    rootReducer,
    /* preloadedState, */
    reduxDevToolsExtension && reduxDevToolsExtension()
);
export type AppStore = typeof store;
export default store;

// Barrel
export {StoreState} from './store_manifest';
export * from './store_actions';
export * from './loggedInUser/loggedInUser_actions';
