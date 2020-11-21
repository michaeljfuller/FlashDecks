import React, {PropsWithChildren} from "react";
import {Text, View} from "react-native";
import Button from "../../button/Button";
import Modal, {ModalProps, extractModalProps} from "../core/Modal";
import {ModalHeader, ModalBody, ModalFooter} from "../parts";

export type AlertModalProps = {
    /** A title to add to the modal. */
    title?: string;
    /** The message to add to the modal. */
    message?: string;
} & ModalProps;
export type AlertModalPropsWithChildren = PropsWithChildren<AlertModalProps>;

/**
 * A simple modal with a close button.
 */
export const AlertModal = React.memo<AlertModalPropsWithChildren>(function AlertModal(props: AlertModalPropsWithChildren) {
    const {title, message, onClose, children} = props;
    return <Modal {...extractModalProps(props)}>
        <ModalHeader title={title || 'Alert'} />

        <ModalBody>
            {message && <Text>{message}</Text>}
            {children && <View>{children}</View>}
        </ModalBody>

        <ModalFooter>
            <Button title="Close" onClick={onClose} square />
        </ModalFooter>
    </Modal>;
});
