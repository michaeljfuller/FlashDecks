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
    onChange?: (card: CardInfo) => void;
    onCancel?: () => void;
} & ModalProps;

export interface EditCardModalState {
    modifiedCard?: CardModel;
}

export interface CardInfo {
    title: CardModel['title'];
}

export class CardInfoModal extends Modal<EditCardModalProps, EditCardModalState> {
    state = {} as EditCardModalState;
    toast = new ToastStore(this);

    get card() {
        return this.state.modifiedCard || this.props.card || new CardModel;
    }
    get info(): CardInfo {
        return {
            title: this.card.title,
        };
    }
    get changed(): boolean {
        return this.info.title !== this.props.card?.title;
    }
    get valid(): boolean {
        return Boolean(this.info.title);
    }

    componentDidUpdate(prevProps: Readonly<EditCardModalProps>, prevState: Readonly<EditCardModalState>, snapshot?: {}) {
        if (CardModel.different(prevProps.card, this.props.card)) {
            this.setStateTo({ modifiedCard: undefined });
        }
        super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState, snapshot);
    }
    componentWillUnmount() {
        this.toast.removeByRef();
    }

    apply() {
        this.props.onChange && this.props.onChange(this.info);
        this.close();
    }
    close() {
        this.setStateTo({ modifiedCard: null });
        this.props.onClose && this.props.onClose();
    }

    onPressOK = () => {
        this.apply();
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

            {/*<ModalBody>*/}
            {/*    <Text>Tags: TODO</Text>*/}
            {/*</ModalBody>*/}

            <ModalFooter style={styles.footer}>
                <Button title="Close" onClick={this.props.onClose} square />
            </ModalFooter>

        </ModalContainer>;
    }

    renderEditModal() {
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
            </ModalBody>

            <ModalFooter style={styles.footer}>
                <Button
                    title="OK"
                    style={styles.footerItem}
                    onClick={this.onPressOK}
                    disabled={!this.changed && this.valid}
                    square
                />
                <Button
                    title="Cancel"
                    style={styles.footerItem}
                    onClick={this.onPressCancel}
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
