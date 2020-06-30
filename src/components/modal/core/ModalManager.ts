import {BehaviorSubject} from "rxjs";
import {isEqual} from "underscore";
import Modal from "./Modal";

export interface ModalManagerStatusHistory<ModalKey extends string|number = string|number> {
    current: ModalManagerStatus;
    previous?: ModalManagerStatus;
}
export interface ModalManagerStatus {
    modal: Modal|null;
}

/**
 * A manager passed on to Modals to update the state.
 */
export class ModalManager<ModalKey extends string|number = string|number> {
    /** The status history. */
    status = {
        current: { modal: null },
        previous: undefined,
    } as ModalManagerStatusHistory;

    /** The current modal. */
    get currentModal() {
        return this.status.current.modal;
    }

    /** Allows subscription to status history changes. */
    onChange = new BehaviorSubject<
        Readonly<ModalManagerStatusHistory>
    >({
        current: { modal: null },
        previous: undefined,
    });

    /** Change the modal, update the history, and fire an change event. */
    setModal(modal: Modal|null) {
        const previous = this.status.current;
        const current = { modal } as ModalManagerStatus;

        if (!isEqual(current, previous)) {
            this.status = Object.freeze({ previous, current });
            this.onChange.next(this.status);
        }
    }

    /** Open the passed modal. */
    open(modal: Modal) {
        this.setModal(modal);
    }

    /** Close the modal, either specific or any. */
    close(modal?: Modal) {
        if (this.isOpen(modal)) {
            this.setModal(null);
        }
    }

    /** Returns if any (or a specified) modal is open. */
    isOpen(modal?: Modal) {
        return modal === undefined ? this.currentModal !== null : this.currentModal === modal;
    }
}
export default ModalManager;
