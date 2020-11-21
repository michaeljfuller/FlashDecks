import React from "react";
import {Text} from "react-native";
import {ModalBody, ModalFooter, ModalHeader} from "../../../modal/parts";
import {DeckInfoModelTags} from "../DeckInfoModalTags";
import {DeckModel} from "../../../../models";
import Button from "../../../button/Button";
import {styles} from "./deckInfoModalStyles";
import {ModalProps} from "../../../modal/core/Modal.common";

interface DeckInfoModalViewProps {
    deck: DeckModel;
    onClose: ModalProps['onClose'];
}

export const DeckInfoModalView = React.memo(function DeckInfoModalView(props: DeckInfoModalViewProps) {
    return <React.Fragment>

        <ModalHeader title={props.deck.title} user={props.deck.owner} />

        <ModalBody>
            <DeckInfoModelTags tags={props.deck.tags} />
            <Text>{props.deck.descriptionOrPlaceholder}</Text>
        </ModalBody>

        <ModalFooter style={styles.footer}>
            <Button title="Close" onClick={props.onClose} square />
        </ModalFooter>

    </React.Fragment>
});
