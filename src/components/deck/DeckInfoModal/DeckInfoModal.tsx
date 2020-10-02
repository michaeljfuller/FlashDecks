import React from "react";
import {Text, TextInput, View, StyleSheet} from "react-native";
import Button from "../../button/Button";
import Modal, {ModalProps} from "../../modal/core/Modal";
import {ModalContainer, ModalHeader, ModalFooter, ModalBody} from "../../modal/parts";
import {DeckModel} from "../../../models";
import {DeckInfoModelTags} from "./DeckInfoModalTags";
import {castDraft} from "immer";
import deckApi from "../../../api/DeckApi";
import ToastStore from "../../../store/toast/ToastStore";
import ApiRequest from "../../../api/util/ApiRequest";

export type DeckInfoModalProps = {
    deck: DeckModel;
    editable?: boolean;
    onChange?: (deck: DeckModel) => void;
    onCancel?: () => void;
} & ModalProps;

export interface DeckInfoModalState {
    modifiedDeck?: DeckModel;
    saving: boolean;
}

/**
 * A simple modal with a close button.
 */
export class DeckInfoModal extends Modal<DeckInfoModalProps, DeckInfoModalState> {
    state = {
        saving: false,
    } as DeckInfoModalState;

    toast = new ToastStore(this);
    saveRequest?: ApiRequest<DeckModel>;

    get deck(): DeckModel {
        return this.state.modifiedDeck || this.props.deck;
    }

    componentDidUpdate(prevProps: Readonly<DeckInfoModalProps>/*, prevState: Readonly<DeckInfoModalState>, snapshot?: any*/) {
        if (DeckModel.different(prevProps.deck, this.props.deck)) {
            this.setStateTo({ modifiedDeck: undefined });
        }
    }
    componentWillUnmount() {
        this.toast.removeByRef();
        this.saveRequest?.drop();
    }

    save() {
        const deck = this.state.modifiedDeck;
        if (deck) {
            // TODO Disable, Save, Toast, Success=Close / Error=Enable.
            this.setStateTo({saving: true});

            const input = {
                title: deck.title,
                description: deck.description,
                tags: deck.tags
            };
            const request = deck.id ? deckApi.update({...input, id: deck.id}) : deckApi.create(input);

            request.wait(false).then(response => {

                if (response.error) {
                    this.toast.addError(response.error, `Failed to save ${deck.title}`, {ref: 'DeckInfoModal.save'});
                } else {
                    this.toast.add({ type: "success", text: `Saved ${deck.title}`, duration: 3000 });
                }

                if (!response.dropped) {
                    this.setStateTo({ saving: false });
                    if (!response.error) {
                        this.props.onChange && this.props.onChange(response.payload || deck);
                        this.props.onClose && this.props.onClose();
                    }
                }

            });
        } else {
            this.toast.add({ type: "warning", text: "No changes to save.", duration: 3000 });
        }
    }

    onPressSave = () => {
        this.save();
    }
    onPressCancel = () => {
        this.props.onCancel && this.props.onCancel();
        this.props.onClose && this.props.onClose();
    }

    onChangeTitle = (title: string) => {
        this.setStateTo(draft => {
            draft.modifiedDeck = castDraft( this.deck.update({ title }) );
        });
    }

    onChangeDescription = (description: string) => {
        this.setStateTo(draft => {
            draft.modifiedDeck = castDraft( this.deck.update({ description }) );
        });
    }

    onChangeTags = (tags: string[]) => {
        this.setStateTo(draft => {
            draft.modifiedDeck = castDraft( this.deck.update({ tags }) );
        });
    }

    renderModal() {
        return this.props.editable ? this.renderEditModal() : this.renderInfoModal();
    }

    renderInfoModal() {
        return <ModalContainer>

            <ModalHeader title={this.deck.title} user={this.deck.owner} />

            <ModalBody>
                <DeckInfoModelTags tags={this.deck.tags} />
                <Text>{this.deck.description}</Text>
            </ModalBody>

            <ModalFooter>
                <Button title="Close" onClick={this.props.onClose} square />
            </ModalFooter>

        </ModalContainer>;
    }

    renderEditModal() {
        const numberOfDescriptionLines = Math.max(12, (this.deck.description || '').split('\n').length);
        const focusTitle = !this.deck.title;

        return <ModalContainer>

            <ModalHeader title="Deck Details" user={this.deck.owner} />

            <ModalBody>
                <View style={styles.titleInputRow}>
                    <Text style={styles.titleLabel}>Title:</Text>
                    <TextInput
                        editable
                        focusable
                        autoFocus={focusTitle}
                        style={styles.titleInput}
                        value={this.deck.title}
                        onChangeText={this.onChangeTitle}
                    />
                </View>
                <DeckInfoModelTags editable tags={this.deck.tags} onChange={this.onChangeTags} />
                <Text style={styles.titleLabel}>Description</Text>
                <TextInput
                    editable
                    multiline
                    focusable
                    autoFocus={!focusTitle}
                    numberOfLines={numberOfDescriptionLines}
                    style={styles.descriptionInput}
                    value={this.deck.description}
                    onChangeText={this.onChangeDescription}
                />
            </ModalBody>

            <ModalFooter style={styles.footer}>
                <Button
                    title="Save"
                    style={styles.footerItem}
                    onClick={this.onPressSave}
                    disabled={this.state.saving || !this.state.modifiedDeck}
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
    titleInputRow: {
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
    descriptionInput: {
        padding: 2,
        margin: 2,
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
