import React from "react";
import Modal, {ModalProps} from "../../modal/core/Modal";
import {CardModel} from "../../../models";
import ToastStore from "../../../store/toast/ToastStore";
import {ModalBody, ModalContainer, ModalFooter, ModalHeader} from "../../modal/parts";
import {StyleSheet, Text, TextInput, View} from "react-native";
import {castDraft} from "immer";
import Button from "../../button/Button";

export type EditCardModalProps = {
    card?: CardModel;
    editable?: boolean;
    onChange?: (card: CardModel) => void;
    onCancel?: () => void;
} & ModalProps;

export interface EditCardModalState {
    modifiedCard?: CardModel;
    saving: boolean;
}

export class CardInfoModal extends Modal<EditCardModalProps, EditCardModalState> {
    state = {
        saving: false,
    } as EditCardModalState;

    toast = new ToastStore(this);

    get card() {
        return this.state.modifiedCard || this.props.card || new CardModel;
    }

    componentDidUpdate(prevProps: Readonly<EditCardModalProps>/*, prevState: Readonly<EditCardModalState>, snapshot?: {}*/) {
        if (CardModel.different(prevProps.card, this.props.card)) {
            this.setStateTo({ modifiedCard: undefined });
        }
    }
    componentWillUnmount() {
        this.toast.removeByRef();
    }

    save() {
        this.props.onChange && this.props.onChange(this.card);
        this.close();
    }
    close() {
        this.setStateTo({ modifiedCard: null, saving: false });
        this.props.onClose && this.props.onClose();
    }

    onPressSave = () => {
        this.save();
    }
    onPressCancel = () => {
        this.props.onCancel && this.props.onCancel();
        this.close();
    }

    onChangeTitle = (title: string) => {
        this.setStateTo(draft => {
            draft.modifiedCard = castDraft( this.card.update({ title }) );
        });
    }

    renderModal() {
        return this.props.editable ? this.renderEditModal() : this.renderInfoModal();
    }

    renderInfoModal() {
        return <ModalContainer>

            <ModalHeader title={this.card.nameOrPlaceholder()} />

            <ModalBody>
                <Text>Tags: TODO</Text>
            </ModalBody>

            <ModalFooter style={styles.footer}>
                <Button title="Close" onClick={this.props.onClose} square />
            </ModalFooter>

        </ModalContainer>;
    }

    renderEditModal() {  // TODO Add edit tags
        return <ModalContainer>

            <ModalHeader title={'Edit Card'} />

            <ModalBody>
                <View style={styles.row}>
                    <Text style={styles.titleLabel}>Title:</Text>
                    <TextInput
                        editable
                        focusable
                        autoFocus
                        style={styles.titleInput}
                        value={this.card.title}
                        onChangeText={this.onChangeTitle}
                    />
                </View>

                <Text>Tags: TODO</Text>
            </ModalBody>

            <ModalFooter style={styles.footer}>
                <Button
                    title="Save"
                    style={styles.footerItem}
                    onClick={this.onPressSave}
                    disabled={this.state.saving || !this.state.modifiedCard}
                    square
                />
                <Button
                    title="Cancel"
                    style={styles.footerItem}
                    onClick={this.onPressCancel}
                    disabled={this.state.saving}
                    square
                />
            </ModalFooter>

        </ModalContainer>;
    }

}

const titleInputHeight = 25;
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        marginBottom: 2,
    },
    titleLabel: {
        lineHeight: titleInputHeight,
    },
    titleInput: {
        padding: 2,
        marginLeft: 5,
        flex: 1,
        height: titleInputHeight,
        borderWidth: 1,
    },

    footer: {
        flexDirection: "row",
        width: "100%",
    },
    footerItem: {
        flex: 1,
    },
});
