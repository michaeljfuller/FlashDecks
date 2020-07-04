import React from "react";
import {Text, View, StyleSheet} from "react-native";
import Button from "../../button/Button";
import Modal, {ModalProps} from "../../modal/core/Modal";
import {ModalContainer, ModalHeader, ModalFooter, ModalBody} from "../../modal/parts";
import Tag from "../../tag/Tag";

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
                <DeckInfoModelTags deck={deck} />
                <Text>{deck.description}</Text>
            </ModalBody>

            <ModalFooter>
                <Button title="Close" onClick={onClose} square />
            </ModalFooter>

        </ModalContainer>;
    }
}

function DeckInfoModelTags({ deck }: { deck: Deck }) {
    if (deck.tags && deck.tags.length) {
        return <View style={styles.tags}>
            {deck.tags.map(tag => <Tag key={tag} value={tag} />)}
        </View>;
    }
    return null;
}

const styles = StyleSheet.create({
    tags: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
});
