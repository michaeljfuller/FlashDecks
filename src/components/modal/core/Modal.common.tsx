import React from 'react';
import ImmutableComponent from "../../ImmutableComponent";

export const modalPortalId = "_MODALS_";

export interface ModalProps {
    /** If the Modal is open */
    open: boolean;
    /** Callback when the Modal is opened */
    onOpen?: () => void;
    /** Callback when the Modal is closed */
    onClose: () => void;
}

export abstract class ModalBase<
    Props extends ModalProps = ModalProps,
    State = any
> extends ImmutableComponent<Props, State>   {
    state = {} as State;

    /** True if the modal is open. */
    get isOpen() {
        return this.props.open;
    }

    /** True if the modal is closed. */
    get isClosed() {
        return !this.props.open;
    }

    // Ensure defined, to make consistent between Web/Native builds.
    componentDidMount() {}
    componentWillUnmount() {}

    componentDidUpdate(prevProps: Readonly<Props>/*, prevState: Readonly<State>, snapshot?: {}*/) {
        if (prevProps.open !== this.props.open) { // If changed
            this.isOpen ? this.open() : this.close(); // Trigger callbacks
        }
    }

    /** Call the onOpen callback which, if set, should open the modal by setting the `open` property to true. */
    open() {
        this.props.onOpen && this.props.onOpen();
    }

    /** Call the onClose callback which should close the modal by setting the `open` property to false. */
    close() {
        this.props.onClose();
    }

    abstract renderModal(): React.ReactElement;
}
