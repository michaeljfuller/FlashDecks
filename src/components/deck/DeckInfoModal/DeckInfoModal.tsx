import React from "react";
import {Text} from "react-native";
import Button from "../../button/Button";
import Modal, {ModalProps} from "../../modal/core/Modal";
import {ModalContainer, ModalHeader, ModalFooter, ModalBody} from "../../modal/parts";

export type DeckInfoModalProps = {
    deck: Deck;
} & ModalProps;

/**
 * A simple modal with a close button.
 */
export class DeckInfoModal extends Modal<DeckInfoModalProps> {
    renderModal() {
        const {deck, onClose} = this.props;

        return <ModalContainer>

            <ModalHeader title={deck.name} user={deck.owner} />

            <ModalBody>
                <Text>{deck.description}</Text>
            </ModalBody>

            <ModalFooter>
                <Button title="Close" onClick={onClose} square />
            </ModalFooter>

        </ModalContainer>;
    }
}
