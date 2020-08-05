import React from "react";
import {Text, View, StyleSheet} from "react-native";

import Button from "../../button/Button";
import Modal, {ModalProps} from "../../modal/core/Modal";
import {ModalContainer, ModalHeader, ModalBody} from "../../modal/parts";
import {ModalFooter} from "../../modal/parts";
import {CardContentModel, CardContentType, cardContentTypes} from "../../../models";
import {CardContentForm} from "../CardContent/CardContentForm";

export type AddContentModalProps = {
    onOk: () => boolean|void;
    onCancel?: () => boolean|void;
    onClose: () => void;
} & ModalProps;

export interface AddContentModalState {
    content: CardContentModel;
}

/**
 * A simple modal with "OK and "Cancel" buttons.
 */
export class AddContentModal extends Modal<AddContentModalProps, AddContentModalState> {
    state = {
        content: new CardContentModel,
    } as AddContentModalState;

    componentDidMount() {
        this.setState({ content: new CardContentModel });
    }

    onPressOk = () => {
        const close = this.props.onOk() !== false;
        if (close) this.props.onClose();
    };

    onPressCancel = () => {
        const close = !this.props.onCancel || this.props.onCancel() !== false;
        if (close) this.props.onClose();
    };

    onChange = (content: CardContentModel) => this.setState({ content });

    setType = (type: CardContentType) => {
        this.setState({
            content: this.state.content.update({ type, value: '' })
        });
    }

    renderModal() {
        return <ModalContainer>
            <ModalHeader title="Add Content" />
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
        const {content} = this.state;
        if (content.validType) {
            return <CardContentForm content={content} onChange={this.onChange} preview />;
        } else {
            return <Text>Please select a content type.</Text>;
        }
    }

    renderContentTypeButton(contentType: CardContentType) {
        return <View key={contentType} style={styles.typeButton}>
            <Button
                title={contentType}
                onClick={() => this.setType(contentType)}
                disabled={this.state.content?.type === contentType}
            />
        </View>;
    }

    renderFooter() {
        return <ModalFooter style={styles.footer}>
            <View style={styles.footerItem}>
                <Button title="OK" onClick={this.onPressOk} square disabled={!this.state.content.valid} />
            </View>
            <View style={styles.footerItem}>
                <Button title="Cancel" onClick={this.onPressCancel} square />
            </View>
        </ModalFooter>
    }

}
export default AddContentModal;

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
