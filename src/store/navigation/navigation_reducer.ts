import {ActionType} from '../store_actions';
import {createReducer, Draft} from "../reducerHelpers";
import {NavigationBlockPayload, NavigationBlock, NavigationUnblock} from './navigation_actions';

export interface NavigationState {
    blockers: NavigationBlockPayload[];
}

export const navigation_reducer = createReducer<NavigationState>(
    (draft, action) => {
        switch (action.type) {
            case ActionType.NAVIGATION_BLOCK: return blockNavigation(draft, action as NavigationBlock);
            case ActionType.NAVIGATION_UNBLOCK: return unblockNavigation(draft, action as NavigationUnblock);
        }
    }, {
        blockers: []
    }
);

function blockNavigation(draft: Draft<NavigationState>, action: NavigationBlock) {
    draft.blockers.push(action.payload);
}
function unblockNavigation(draft: Draft<NavigationState>, action: NavigationUnblock) {
    draft.blockers = draft.blockers.filter(block => block.ref !== action.ref);
}
