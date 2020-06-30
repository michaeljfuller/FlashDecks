import React from 'react';
import {Subscription} from "rxjs";
import ModalManager, {ModalManagerStatus} from "./ModalManager";
import {ModalContext} from '../ModalRoot';

export interface ModalProps {
    /** If the Modal is open */
    open: boolean;
    /** Callback when the Modal is opened */
    onOpen?: () => void;
    /** Callback when the Modal is closed */
    onClose?: () => void;
}

export abstract class Modal<
    Props extends ModalProps = ModalProps,
    State = any
> extends React.Component<
    Props, State
> {
    state = {} as State;

    /** Holds unsubscribe */
    subscriptionOnChange: Subscription|null = null;

    // Bind ModalManager
    static contextType = ModalContext;
    /** Get the ModalManager from the bound ModalContext */
    get manager(): ModalManager {
        return this.context;
    }

    /** Subscribe to manager. */
    componentDidMount() {
        this.subscribeToManager();
    }

    /** Close modal and unsubscribe from ModalManager .*/
    componentWillUnmount() {
        if (this.manager.currentModal === this) {
            this.manager.close();
        }
        if (this.subscriptionOnChange) {
            this.subscriptionOnChange.unsubscribe();
        }
    }

    /** If `open` changes, inform the manager. */
    componentDidUpdate(prevProps: Readonly<ModalProps>/*, prevState: Readonly<ModalState>, snapshot?: any*/) {
        this.subscribeToManager();
        if (prevProps.open !== this.props.open) {
            if (this.props.open) {
                this.manager.open(this);
            } else {
                this.manager.close(this);
            }
        }
    }

    /** Triggers onModalChange. */
    subscribeToManager() {
        if (!this.subscriptionOnChange && this.manager) {
            this.subscriptionOnChange = this.manager.onChange.subscribe({
                next: state => {
                    if (state.current.modal !== state.previous?.modal) {
                        this.onModalChange(state.current, state.previous);
                    }
                },
            });
        }
    }

    /** Update state and trigger callbacks. */
    onModalChange(current: ModalManagerStatus, previous?: ModalManagerStatus) {
        if (this.props.onOpen && current.modal === this) {
            this.props.onOpen();
        }
        if (this.props.onClose && previous?.modal === this) {
            this.props.onClose();
        }
    }

    /** Never render in-place. Use `renderModal` in another situation instead. */
    render(): null {
        return null;
    }

    /** The deferred render of the modal. */
    abstract renderModal(): React.ReactElement;

}
export default Modal;
