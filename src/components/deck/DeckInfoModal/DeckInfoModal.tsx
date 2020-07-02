import React from "react";
import {Text} from "react-native";
import Button from "../../button/Button";
import Modal, {ModalProps} from "../../modal/core/Modal";
import ModalContainer from "../../modal/parts/ModalContainer/ModalContainer";
import ModalHeader from "../../modal/parts/ModalHeader/ModalHeader";
import ModalFooter from "../../modal/parts/ModalFooter/ModalFooter";
import ModalBody from "../../modal/parts/ModalBody/ModalBody";
import {repeat} from "../../../utils/array";

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
