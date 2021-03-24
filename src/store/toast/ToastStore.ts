import AStoreHelper from "../AStoreHelper";
import {ActionType, ToastAdd, ToastShift, ToastQueueItem, ToastRemoveByRef, AppStore} from "../store";
import {ToastState} from "./toast_reducer";
import {getErrorText, getErrorName} from "../../utils/string";

/**
 * Facade for adding toast to the store queue.
 * Also stores a ref to tidy up toast with.
 */
export class ToastStore extends AStoreHelper<ToastState> {
    /**
     * @param defaultRef - The default ref to pass to `removeByRef()`. If not set, it uses the ToastStore instance.
     * @param store - The store to use.
     */
    constructor(readonly defaultRef?: ToastQueueItem['ref'], store?: AppStore) {
        super('toast', store);
        this.defaultRef = defaultRef || this;
    }

    /** Add item to the queue */
    add(item: ToastQueueItem): void {
        item.ref = item.ref || this.defaultRef;
        const action: ToastAdd = {type: ActionType.TOAST_ADD, item};
        this.store.dispatch(action);
    }

    /**
     * Add error item to the queue.
     * Pass in a custom `options.ref` string for this toast to not be removed when this store instance is cleared up.
     */
    addError(error: Error|string|unknown, title?: string, options?: AddErrorOptions, overrides?: Partial<ToastQueueItem>): void {
        const {
            printDetails = typeof error === 'string',
            log = true,
        } = options || {};
        if (log) {
            console.error(`"${title || 'Error'}" -`, error);
        }
        const text = printDetails ? getErrorText(error) : '';
        title = title || getErrorName(error);

        this.add(
            Object.assign({
                title: text ? title : undefined,
                text: text || title,
                type: "error",
                ref: options?.ref,
            } as ToastQueueItem,  overrides)
        );
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

interface AddErrorOptions {
    printDetails?: boolean;
    log?: boolean;
    ref?: ToastQueueItem['ref'];
}
