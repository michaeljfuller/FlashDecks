import React from 'react';
import {ViewStyle} from "react-native";

export const modalPortalId = "_MODALS_";

export interface ModalProps {
    /** If the Modal is open */
    open: boolean;
    /** Callback when the Modal is opened */
    onOpen?: () => void;
    /** Callback when the Modal is closed */
    onClose: () => void;
    /** Style contents */
    style?: ViewStyle;
}

/** Pull only ModalProps members from an object that may have others. */
export function extractModalProps(props: ModalProps): ModalProps {
    const {open, onOpen, onClose, style} = props;
    return {open, onOpen, onClose, style};
}

export abstract class ModalBase extends React.PureComponent<ModalProps> {

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

    /** Call the onOpen callback which, if set, should open the modal by setting the `open` property to true. */
    open() {
        this.props.onOpen && this.props.onOpen();
    }

    /** Call the onClose callback which should close the modal by setting the `open` property to false. */
    close() {
        this.props.onClose();
    }
}
