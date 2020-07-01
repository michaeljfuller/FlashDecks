import React from "react";
import {Text, View, ScrollView} from "react-native";
import Button from "../../button/Button";
import Modal, {ModalProps} from "../../modal/core/Modal";
import styles from "./DeckInfoModal.styles";
import Avatar from "../../avatar/Avatar";

export type DeckInfoModalProps = {
    deck: Deck;
} & ModalProps;

/**
 * A simple modal with a close button.
 */
export class DeckInfoModal extends Modal<DeckInfoModalProps> {
    renderModal() {
        const {deck, onClose} = this.props;

        return <View style={styles.root} >

            <View style={styles.titleView}>
                <Text style={styles.titleText}>{deck.name}</Text>
                <View style={styles.userView}>
                    <Text style={styles.titleText}>{deck.owner.displayName}</Text>
                    <Avatar user={deck.owner} />
                </View>
            </View>

            <ScrollView style={styles.contents}>
                <Text>{deck.description}</Text>
            </ScrollView>

            <Button title="Close" onClick={onClose}/>

        </View>;
    }
}
