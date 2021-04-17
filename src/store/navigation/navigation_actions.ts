import {IAction, ActionType} from '../store_actions';

export interface NavigationBlockPayload {
    ref: NavigationBlockRef;
    reason: NavigationBlockReason;
    attemptCallback?: BlockedNavigationAttempt;
}

export type NavigationBlockRef = string;
export type NavigationBlockReason = string;
export type BlockedNavigationAttempt = (reason: NavigationBlockReason, ref: NavigationBlockRef) => void;

export interface NavigationBlock extends IAction {
    type: ActionType.NAVIGATION_BLOCK;
    payload: NavigationBlockPayload;
}
export interface NavigationUnblock extends IAction {
    type: ActionType.NAVIGATION_UNBLOCK;
    ref: NavigationBlockRef;
}
