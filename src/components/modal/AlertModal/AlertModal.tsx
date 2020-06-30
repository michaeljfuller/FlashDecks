import React from "react";
import {Text, View, ScrollView} from "react-native";
import Button from "../../button/Button";
import Modal, {ModalProps} from "../core/Modal";
import styles from "./AlertModal.styles";

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

        return <View style={styles.root} >

            {title && <View style={styles.titleView}>
                <Text style={styles.titleText}>{title}</Text>
            </View>}

            <ScrollView style={styles.contents}>
                {message && <Text>{message}</Text>}
                {children && <View>{children}</View>}
            </ScrollView>

            <Button title="Close" onClick={onClose}/>

        </View>;
    }
}
