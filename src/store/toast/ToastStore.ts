import AStoreHelper from "../AStoreHelper";
import {ActionType, ToastAdd, ToastShift, ToastQueueItem, ToastRemoveByRef} from "../store";
import {ToastState} from "./toast_reducer";

/**
 * Facade for adding toast to the store queue.
 * Also stores a ref to tidy up toast with.
 */
export class ToastStore extends AStoreHelper<ToastState> {
    /**
     * @param defaultRef - The default ref to pass to `removeByRef()`. If not set, it uses the ToastStore instance.
     */
    constructor(readonly defaultRef?: ToastQueueItem['ref']) {
        super('toast');
        this.defaultRef = defaultRef || this;
    }

    /** Add item to the queue */
    add(item: ToastQueueItem): void {
        item.ref = item.ref || this.defaultRef;
        const action: ToastAdd = {type: ActionType.TOAST_ADD, item};
        this.store.dispatch(action);
    }

    /** Remove item from start of the queue. */
    shift(): ToastQueueItem|undefined {
        const action: ToastShift = {type: ActionType.TOAST_SHIFT};
        const item = this.state.queue[0];
        this.store.dispatch(action);
        return item;
    }

    /** Remove items by their ref, such as to clear callbacks when a component unmounts. */
    removeByRef(ref = this.defaultRef) {
        const action: ToastRemoveByRef = {type: ActionType.TOAST_REMOVE_BY_REF, ref};
        this.store.dispatch(action);
    }
}
export default ToastStore;
export const toastStore = new ToastStore;
