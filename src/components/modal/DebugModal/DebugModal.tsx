import {Text, View, ScrollView} from "react-native";
import React from "react";
import Button from "../../button/Button";
import Modal, {ModalProps} from "../core/Modal";
import styles from "./DebugModal.styles";

export type DebugModalProps = {
    /** A title to add to the modal. */
    title?: string;
    /** The message to add to the modal. */
    message?: string;
    /** The data to show. */
    data?: any;
} & ModalProps;

/**
 * A modal that displays the passed `data` as a JSON string.
 */
export class DebugModal extends Modal<DebugModalProps> {
    renderModal() {
        const {title, message, data, children, onClose} = this.props;

        let dataElement;
        if (data) {
            try {
                dataElement = <View style={styles.data}>
                    <Text>{JSON.stringify(data, null, 2)}</Text>
                </View>
            } catch (error) {
                dataElement = <View style={styles.data}>
                    <Text style={styles.errorText}>{error.name}</Text>
                    <Text style={styles.errorText}>{error.message}</Text>
                </View>;
            }
        }

        return <View style={styles.root}>

            {title && <View style={styles.titleView}>
                <Text style={styles.titleText}>{title}</Text>
            </View>}

            <ScrollView style={styles.contents}>
                {message && <View>{message}</View>}
                {children && <View>{children}</View>}
                {dataElement && <View>{dataElement}</View>}
            </ScrollView>

            <Button title="Close" onClick={onClose} square />

        </View>;
    }
}

