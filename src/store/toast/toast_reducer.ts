import {ActionType} from '../store_actions';
import {createReducer, Draft} from "../reducerHelpers";
import {ToastAdd, ToastQueueItem, ToastRemoveByRef} from './toast_actions';

export interface ToastState {
    queue: ToastStateQueueItem[];
    nextQueueId: number;
}
export interface ToastStateQueueItem extends ToastQueueItem {
    id: number;
}

export const toast_reducer = createReducer<ToastState>(
    (draft, action) => {
        switch (action.type) {
            case ActionType.TOAST_ADD: return addToast(draft, action as ToastAdd);
            case ActionType.TOAST_SHIFT: return shiftToast(draft);
            case ActionType.TOAST_REMOVE_BY_REF: return removeToastByRef(draft, action as ToastRemoveByRef);
        }
    }, { queue: [], nextQueueId: 0 }
);

function addToast(draft: Draft<ToastState>, action: ToastAdd) {
    draft.queue.push({ ...action.item, id: draft.nextQueueId++ });
}
function shiftToast(draft: Draft<ToastState>) {
    draft.queue.shift();
}
function removeToastByRef(draft: Draft<ToastState>, action: ToastRemoveByRef) {
    draft.queue = draft.queue.filter(item => item.ref !== action.ref);
}
