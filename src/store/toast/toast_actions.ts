import {IAction, ActionType} from '../store_actions';
import {ToastType} from "../../components/toast/Toast.common";

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

export interface ToastQueueItem {
    /** A reference to identify the toast by. */
    ref?: any;

    /** Toast message */
    text: string;

    /** Text of the action button */
    actionText?: string;

    /** Determines the style. */
    type?: ToastType;

    /** Duration in milliseconds. Default is indefinite. */
    duration?: number;

    /** Callback on the Toast closing, and if the action button was pressed. */
    onClose?: (action: boolean, timeout: boolean) => void;
}
