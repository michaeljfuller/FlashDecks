import React from "react";
import {Text} from "react-native";
import {AlertModal, AlertModalProps} from "../../../components/modal/AlertModal/AlertModal";
import {Paragraph} from "../../../components/ui/Paragraph";
import {Heading} from "../../../components/ui/Heading";

export default function DeckViewScreenHelpModal(props: AlertModalProps) {
    const {
        title = "Deck View Screen",
        bodyStyle,
        ...alertProps
    } = props;
    return <AlertModal title={title} bodyStyle={[{paddingHorizontal: 5}, bodyStyle]} {...alertProps}>

        <Paragraph>
            <Text>This screen shows a deck and its cards.</Text>
        </Paragraph>

        <Paragraph>
            <Text>Click the info button next to the deck title to show additional information, such as its description.</Text>
        </Paragraph>

        <Paragraph>
            <Heading>Card Sides</Heading>
            <Text>Each card can have multiple sides to reveal more content.</Text>
            <Text>An example use case is having a question on one side, and an answer on the other.</Text>
            <Text>If the card has multiple "sides" (indicated at the bottom of the card), then clicking the card will flip it.</Text>
        </Paragraph>

        <Paragraph>
            <Heading>Changing Card</Heading>
            <Text>If the deck has multiple cards, there are arrow buttons on the side to cycle through the deck.</Text>
            <Text>On the mobile app, you can also swipe through the deck.</Text>
        </Paragraph>

    </AlertModal>;
}
