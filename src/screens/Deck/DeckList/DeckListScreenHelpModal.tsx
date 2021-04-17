import React from "react";
import {Text} from "react-native";
import {AlertModal, AlertModalProps} from "../../../components/modal/AlertModal/AlertModal";
import {Paragraph} from "../../../components/ui/Paragraph";

export default function DeckListScreenHelpModal(props: AlertModalProps) {
    const {
        title = "Deck List Screen",
        bodyStyle,
        ...alertProps
    } = props;
    return <AlertModal title={title} bodyStyle={[{paddingHorizontal: 5}, bodyStyle]} {...alertProps}>

        <Paragraph>
            <Text>This screen lists the decks available to the user.</Text>
            <Text>Clicking a deck will take you to it.</Text>
        </Paragraph>

        <Paragraph>
            <Text>At the top of the screen you can select to view your own decks, all decks, or create a new deck.</Text>
        </Paragraph>

        <Paragraph>
            <Text>If you own the deck, there is a burger button that gives you the option to edit or delete the deck.</Text>
        </Paragraph>

    </AlertModal>;
}
