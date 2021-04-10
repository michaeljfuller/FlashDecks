import React, {PropsWithChildren} from "react";
import {StyleProp, Text, View, ViewStyle} from "react-native";
import Button from "../../button/Button";
import Modal, {ModalProps, extractModalProps} from "../core/Modal";
import {ModalHeader, ModalBody, ModalFooter} from "../parts";

export type AlertModalProps = {
    /** A title to add to the modal. */
    title?: string;
    /** The message to add to the modal. */
    message?: string;
    /** If there should be a close button. */
    closeButton?: boolean;
    /** Text on the close button. */
    closeButtonText?: string;
    /** ViewStyle applied to the body. */
    bodyStyle?: StyleProp<ViewStyle>;
} & ModalProps;
export type AlertModalPropsWithChildren = PropsWithChildren<AlertModalProps>;

/**
 * A simple modal with a close button.
 */
export const AlertModal = React.memo<AlertModalPropsWithChildren>(function AlertModal(props: AlertModalPropsWithChildren) {
    const {
        title,
        message,
        onClose,
        children,
        bodyStyle,
        closeButton=true,
        closeButtonText="Close",
    } = props;
    return <Modal {...extractModalProps(props)}>
        <ModalHeader title={title || 'Alert'} />

        <ModalBody style={bodyStyle}>
            {message && <Text>{message}</Text>}
            {children && <View>{children}</View>}
        </ModalBody>

        {closeButton ? <ModalFooter><Button title={closeButtonText} onClick={onClose} square /></ModalFooter> : null}
    </Modal>;
});
