import React from "react";
import {Text, TextInput, View, StyleSheet} from "react-native";
import Button from "../../button/Button";
import Modal, {ModalProps} from "../../modal/core/Modal";
import {ModalContainer, ModalHeader, ModalFooter, ModalBody} from "../../modal/parts";
import {DeckModel} from "../../../models";
import {DeckInfoModelTags} from "./DeckInfoModalTags";

export type DeckInfoModalProps = {
    deck: DeckModel;
    editable?: boolean;
    onChange?: (deck: DeckModel) => void;
} & ModalProps;

export interface DeckInfoModalState {
    modifiedDeck?: DeckModel;
}

/**
 * A simple modal with a close button.
 */
export class DeckInfoModal extends Modal<DeckInfoModalProps, DeckInfoModalState> {
    state = {} as DeckInfoModalState;

    get deck(): DeckModel {
        return this.state.modifiedDeck || this.props.deck;
    }

    componentDidUpdate(prevProps: Readonly<DeckInfoModalProps>/*, prevState: Readonly<DeckInfoModalState>, snapshot?: any*/) {
        if (prevProps.deck.id !== prevProps.deck.id) {
            this.setState({ modifiedDeck: undefined });
        }
    }

    onSave = () => {
        if (this.props.onChange && this.state.modifiedDeck) {
            this.props.onChange(this.state.modifiedDeck);
        }
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    onChangeName = (name: string) => {
        this.setState({
            modifiedDeck: this.deck.update({ name })
        });
    }

    onChangeDescription = (description: string) => {
        this.setState({
            modifiedDeck: this.deck.update({ description })
        });
    }

    onChangeTags = (tags: string[]) => {
        this.setState({
            modifiedDeck: this.deck.update({ tags })
        });
    }

    renderModal() {
        return this.props.editable ? this.renderEditModal() : this.renderInfoModal();
    }

    renderInfoModal() {
        return <ModalContainer>

            <ModalHeader title={this.deck.name} user={this.deck.owner} />

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

        return <ModalContainer>

            <ModalHeader title={this.deck.name} user={this.deck.owner} />

            <ModalBody>
                <View style={styles.titleInputRow}>
                    <Text style={styles.titleLabel}>Title:</Text>
                    <TextInput
                        editable
                        style={styles.titleInput}
                        value={this.deck.name}
                        onChangeText={this.onChangeName}
                    />
                </View>
                <DeckInfoModelTags editable tags={this.deck.tags} onChange={this.onChangeTags} />
                <TextInput
                    editable
                    multiline
                    focusable
                    autoFocus
                    numberOfLines={numberOfDescriptionLines}
                    style={styles.descriptionInput}
                    value={this.deck.description}
                    onChangeText={this.onChangeDescription}
                />
            </ModalBody>

            <ModalFooter style={styles.footer}>
                <View style={styles.footerItem}>
                    <Button title="OK" onClick={this.onSave} square disabled={!this.state.modifiedDeck} />
                </View>
                <View style={styles.footerItem}>
                    <Button title="Cancel" onClick={this.props.onClose} square />
                </View>
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
})
