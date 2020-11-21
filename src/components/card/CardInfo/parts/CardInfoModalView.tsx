import React from "react";
import {ModalFooter, ModalHeader} from "../../../modal/parts";
import {CardModel} from "../../../../models";
import Button from "../../../button/Button";
import {styles} from "./cardInfoModalStyle";

interface CardInfoModalViewProps {
    card: CardModel;
    onClose: () => void;
}

export const CardInfoModalView = React.memo(function CardInfoModalView(props: CardInfoModalViewProps) {
    return <React.Fragment>

        <ModalHeader title={props.card.nameOrPlaceholder()} />

        {/*<ModalBody>*/}
        {/*    <Text>Tags: TODO</Text>*/}
        {/*</ModalBody>*/}

        <ModalFooter style={styles.footer}>
            <Button title="Close" onClick={props.onClose} square />
        </ModalFooter>

    </React.Fragment>;
});
