import React from "react";
import {Text, View, StyleSheet} from "react-native";

import Button from "../../button/Button";
import Modal, {ModalProps, extractModalProps} from "../../modal/core/Modal";
import {ModalHeader, ModalBody} from "../../modal/parts";
import {ModalFooter} from "../../modal/parts";
import {CardContentModel, CardContentType, cardContentTypes} from "../../../models";
import {CardContentForm} from "./CardContentForm";

export type AddContentModalProps = {
    title?: string;
    content: CardContentModel;
    onChange: (content: CardContentModel) => void;
    onOk: () => boolean|void;
    onCancel?: () => boolean|void;
    onClose: () => void;
} & ModalProps;

/**
 * A simple modal with "OK and "Cancel" buttons.
 */
export class ModifyContentModal extends React.PureComponent<AddContentModalProps> {

    onPressOk = () => {
        const close = this.props.onOk() !== false;
        if (close) this.props.onClose();
    };

    onPressCancel = () => {
        const close = !this.props.onCancel || this.props.onCancel() !== false;
        if (close) this.props.onClose();
    };

    onChange = (content: CardContentModel) => {
        this.props.onChange(content.update({ size: undefined }));
    };

    setType = (type: CardContentType) => {
        this.props.onChange(
            this.props.content.update({ type, value: '' })
        );
    }

    render(): JSX.Element {
        return <Modal {...extractModalProps(this.props)}>
            <ModalHeader title={this.props.title || "Modify Content"} />

            <ModalBody style={styles.body}>
                <View style={styles.typeButtonRow}>{ // Type Buttons
                    cardContentTypes.map(
                        contentType => <Button
                            key={contentType}
                            title={contentType}
                            onClick={() => this.setType(contentType)}
                            disabled={this.props.content.type === contentType}
                            style={styles.typeButton}
                        />
                    )
                }</View>
                {   // Form
                    this.props.content.validType
                    ? <CardContentForm content={this.props.content} onChange={this.onChange} preview />
                    : <Text>Please select a content type.</Text>
                }
            </ModalBody>

            <ModalFooter style={styles.footer}>
                <Button title="OK"     style={styles.footerItem} onClick={this.onPressOk}     square disabled={!this.props.content.valid} />
                <Button title="Cancel" style={styles.footerItem} onClick={this.onPressCancel} square />
            </ModalFooter>
        </Modal>;
    }

}
export default ModifyContentModal;

const styles = StyleSheet.create({
    body: {
        minWidth: 500,
        padding: 5,
    },
    typeButtonRow: {
        flexDirection: "row",
        paddingBottom: 5,
    },
    typeButton: {
        flex: 1,
        paddingHorizontal: 1
    },
    footer: {
        flexDirection: "row",
        width: "100%",
    },
    footerItem: {
        flex: 1
    },
});
