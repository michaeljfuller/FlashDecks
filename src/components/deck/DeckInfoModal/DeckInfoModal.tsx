import React from "react";
import {Text, TextInput, View, StyleSheet} from "react-native";
import Button from "../../button/Button";
import Modal, {ModalProps} from "../../modal/core/Modal";
import {ModalContainer, ModalHeader, ModalFooter, ModalBody} from "../../modal/parts";
import {DeckModel} from "../../../models";
import {DeckInfoModelTags} from "./DeckInfoModalTags";
import deckApi from "../../../api/DeckApi";
import ToastStore from "../../../store/toast/ToastStore";
import ApiRequest from "../../../api/util/ApiRequest";

export type DeckInfoModalProps = {
    deck: DeckModel;
    editable?: boolean;
    onChange?: (info: DeckInfo) => void;
    onCancel?: () => void;
} & ModalProps;

export interface DeckInfo {
    title: DeckModel['title'];
    description: DeckModel['description'];
    tags: DeckModel['tags'];
}

export interface DeckInfoModalState {
    modifiedInfo?: DeckInfo;
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

    get info(): DeckInfo {
        return this.state.modifiedInfo || {
            title: this.props.deck.title,
            description: this.props.deck.description.trim(),
            tags: this.props.deck.tags,
        };
    }

    get valid(): boolean {
        const info = this.state.modifiedInfo;
        return Boolean(info && info.title && info.description);
    }

    componentDidUpdate(prevProps: Readonly<DeckInfoModalProps>/*, prevState: Readonly<DeckInfoModalState>, snapshot?: any*/) {
        if (DeckModel.different(prevProps.deck, this.props.deck)) {
            this.setStateTo({ modifiedInfo: undefined });
        }
        super.componentDidUpdate(prevProps);
    }
    componentWillUnmount() {
        this.toast.removeByRef();
        this.saveRequest?.drop();
        super.componentWillUnmount();
    }

    save() {
        const deck = this.props.deck;
        const info = this.state.modifiedInfo;
        const title = info?.title || deck.title;

        if (info) {
            // TODO Disable, Save, Toast, Success=Close / Error=Enable.
            this.setStateTo({ saving: true });

            const request = deck.id ? deckApi.update({...info, id: deck.id}) : deckApi.create(info);

            request.wait(false).then(response => {

                if (response.error) {
                    this.toast.addError(response.error, `Failed to save "${title}".`, {ref: 'DeckInfoModal.save'});
                } else {
                    this.toast.add({ type: "success", text: `Saved "${title}".`, duration: 3000 });
                }

                if (!response.dropped) {
                    this.setStateTo({ saving: false });
                    if (!response.error) {
                        this.props.onChange && this.props.onChange(info);
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
        this.setStateTo(draft => draft.modifiedInfo = { ...this.info, title });
    }

    onChangeDescription = (description: string) => {
        this.setStateTo(draft => draft.modifiedInfo = { ...this.info, description });
    }

    onChangeTags = (tags: string[]) => {
        this.setStateTo(draft => draft.modifiedInfo = { ...this.info, tags });
    }

    renderModal() {
        return this.props.editable ? this.renderEditModal() : this.renderInfoModal();
    }

    renderInfoModal() {
        const deck = this.props.deck;
        return <ModalContainer>

            <ModalHeader title={deck.title} user={deck.owner} />

            <ModalBody>
                <DeckInfoModelTags tags={deck.tags} />
                <Text>{deck.descriptionOrPlaceholder}</Text>
            </ModalBody>

            <ModalFooter>
                <Button title="Close" onClick={this.props.onClose} square />
            </ModalFooter>

        </ModalContainer>;
    }

    renderEditModal() {
        const numberOfDescriptionLines = Math.max(12, (this.info.description || '').split('\n').length);
        const focusTitle = !this.info.title;

        return <ModalContainer>

            <ModalHeader title="Deck Details" user={this.props.deck.owner} />

            <ModalBody>
                <View style={styles.titleInputRow}>
                    <Text style={styles.titleLabel}>Title:</Text>
                    <TextInput
                        editable
                        focusable
                        autoFocus={focusTitle}
                        style={styles.titleInput}
                        value={this.info.title}
                        onChangeText={this.onChangeTitle}
                    />
                </View>
                <DeckInfoModelTags editable tags={this.info.tags} onChange={this.onChangeTags} />
                <Text style={styles.titleLabel}>Description</Text>
                <TextInput
                    editable
                    multiline
                    focusable
                    autoFocus={!focusTitle}
                    numberOfLines={numberOfDescriptionLines}
                    style={styles.descriptionInput}
                    value={this.info.description}
                    onChangeText={this.onChangeDescription}
                />
            </ModalBody>

            <ModalFooter style={styles.footer}>
                <Button
                    title="Save"
                    style={styles.footerItem}
                    onClick={this.onPressSave}
                    disabled={this.state.saving || !this.valid}
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
