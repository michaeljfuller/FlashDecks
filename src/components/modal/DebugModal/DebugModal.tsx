import {StyleSheet, Text, View} from "react-native";
import React from "react";
import Button from "../../button/Button";
import {Color} from "../../../styles/Color";
import Modal, {ModalProps, extractModalProps} from "../core/Modal";
import {ModalHeader, ModalBody, ModalFooter} from "../parts";

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
export class DebugModal extends React.PureComponent<DebugModalProps> {

    render() {
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

        return <Modal {...extractModalProps(this.props)}>
            <ModalHeader title={title || 'Debug'} />

            <ModalBody>
                {message && <View>{message}</View>}
                {children && <View>{children}</View>}
                {dataElement && <View>{dataElement}</View>}
            </ModalBody>

            <ModalFooter>
                <Button title="Close" onClick={onClose} square />
            </ModalFooter>
        </Modal>;
    }

}

export const styles = StyleSheet.create({
    data: {
        borderWidth: 1,
        padding: 2,
    },
    errorText: {
        color: Color.Red,
    },
});
export default styles;
