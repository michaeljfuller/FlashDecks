import React from "react";
import {Text, View, StyleSheet} from "react-native";

import Button from "../../button/Button";
import Modal, {ModalProps} from "../../modal/core/Modal";
import {ModalContainer, ModalHeader, ModalBody} from "../../modal/parts";
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
export class ModifyContentModal extends Modal<AddContentModalProps> {

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

    renderModal() {
        return <ModalContainer>
            <ModalHeader title={this.props.title || "Modify Content"} />
            <ModalBody style={styles.body}>
                {this.renderTypeButtons()}
                {this.renderForm()}
            </ModalBody>
            {this.renderFooter()}
        </ModalContainer>;
    }

    renderTypeButtons() {
        return <View style={styles.typeButtonRow}>{
            cardContentTypes.map(
                contentType => this.renderContentTypeButton(contentType)
            )
        }</View>;
    }

    renderForm() {
        const {content} = this.props;
        if (content.validType) {
            return <CardContentForm content={content} onChange={this.onChange} preview />;
        } else {
            return <Text>Please select a content type.</Text>;
        }
    }

    renderContentTypeButton(contentType: CardContentType) {
        return <Button
            key={contentType}
            title={contentType}
            onClick={() => this.setType(contentType)}
            disabled={this.props.content.type === contentType}
            style={styles.typeButton}
        />;
    }

    renderFooter() {
        return <ModalFooter style={styles.footer}>
            <Button title="OK" style={styles.footerItem} onClick={this.onPressOk} square disabled={!this.props.content.valid} />
            <Button title="Cancel" style={styles.footerItem} onClick={this.onPressCancel} square />
        </ModalFooter>;
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
})
