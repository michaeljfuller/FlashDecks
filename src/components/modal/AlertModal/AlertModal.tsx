import React from "react";
import {Text, View} from "react-native";
import Button from "../../button/Button";
import Modal, {ModalProps} from "../core/Modal";
import {ModalContainer, ModalHeader, ModalBody, ModalFooter} from "../parts";

export type AlertModalProps = {
    /** A title to add to the modal. */
    title?: string;
    /** The message to add to the modal. */
    message?: string;
} & ModalProps;

/**
 * A simple modal with a close button.
 */
export class AlertModal extends Modal<AlertModalProps> {
    renderModal() {
        const {title, message, children, onClose} = this.props;

        return <ModalContainer>

            <ModalHeader title={title || 'Alert'} />

            <ModalBody>
                {message && <Text>{message}</Text>}
                {children && <View>{children}</View>}
            </ModalBody>

            <ModalFooter>
                <Button title="Close" onClick={onClose} square />
            </ModalFooter>

        </ModalContainer>;
    }
}
