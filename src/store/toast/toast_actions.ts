import {IAction, ActionType} from '../store_actions';
import {ToastProps} from "../../components/toast/Toast.common";

export interface ToastAdd extends IAction {
    type: ActionType.TOAST_ADD;
    item: ToastQueueItem;
}
export interface ToastShift extends IAction {
    type: ActionType.TOAST_SHIFT;
}
export interface ToastRemoveByRef extends IAction {
    type: ActionType.TOAST_REMOVE_BY_REF;
    ref: any;
}

export interface ToastQueueItem extends Omit<ToastProps, 'show'> {
    /** A reference to identify the toast by. */
    ref?: any;
}
