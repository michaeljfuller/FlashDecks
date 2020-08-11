import React from "react";
import {Text, View, ViewStyle} from "react-native";
import Button from "../../button/Button";
import Modal, {ModalProps} from "../core/Modal";
import {ModalContainer, ModalHeader, ModalBody, ModalFooter} from "../parts";

export type PromptModalProps = {
    /** A title to add to the modal. */
    title?: string;
    /** The message to add to the modal. */
    message?: string;
    onOk: () => boolean|void;
    onCancel?: () => boolean|void;
    onClose: () => void;
    enabledOk?: boolean;
    style?: ViewStyle;
} & ModalProps;

/**
 * A simple modal with "OK and "Cancel" buttons.
 */
export class PromptModal extends Modal<PromptModalProps> {

    onPressOk = () => {
        const close = this.props.onOk() !== false;
        if (close) {
            this.props.onClose();
        }
    };

    onPressCancel = () => {
        const close = !this.props.onCancel || this.props.onCancel() !== false;
        if (close) {
            this.props.onClose();
        }
    };

    renderModal() {
        const {title, message, children, style, enabledOk=true} = this.props;

        return <ModalContainer style={style}>

            <ModalHeader title={title || 'Alert'} />

            <ModalBody>
                {message && <Text>{message}</Text>}
                {children && <View>{children}</View>}
            </ModalBody>

            <ModalFooter style={{
                flexDirection: "row", width: "100%",
            }}>
                <View style={{flex:1}}>
                    <Button title="OK" onClick={this.onPressOk} square disabled={!enabledOk} />
                </View>
                <View style={{flex:1}}>
                    <Button title="Cancel" onClick={this.onPressCancel} square />
                </View>
            </ModalFooter>

        </ModalContainer>;
    }
}
export default PromptModal;
