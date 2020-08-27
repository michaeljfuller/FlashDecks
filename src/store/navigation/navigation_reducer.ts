import {ActionType} from '../store_actions';
import {createReducer, Draft} from "../reducerHelpers";
import {NavigationBlockPayload, NavigationBlock, NavigationUnblock} from './navigation_actions';
import {isPlatformWeb} from "../../platform";

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
    addBrowserBlock(action.payload.reason);
}
function unblockNavigation(draft: Draft<NavigationState>, action: NavigationUnblock) {
    draft.blockers = draft.blockers.filter(block => block.ref !== action.ref);
    if (draft.blockers.length === 0) removeBrowserBlock();
}

//<editor-fold desc="Browser Navigation Block">

function addBrowserBlock(reason: string) {
    if (isPlatformWeb) {
        removeBrowserBlock();
        window.addEventListener('beforeunload', beforeUnload = (e: BeforeUnloadEvent) => {
            if (e) e.returnValue = reason; // Block navigation for some browsers (that may not display our text).
            return reason; // Block navigation for other browsers.
        });
    }
}
function removeBrowserBlock() {
    if (isPlatformWeb && beforeUnload) {
        window.removeEventListener('beforeunload', beforeUnload);
        beforeUnload = null;
    }
}
let beforeUnload: OnBeforeUnloadEventHandler = null;

//</editor-fold>
