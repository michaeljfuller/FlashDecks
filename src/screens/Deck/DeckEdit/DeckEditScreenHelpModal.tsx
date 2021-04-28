import React from "react";
import {Text} from "react-native";
import {AlertModal, AlertModalProps} from "../../../components/modal/AlertModal/AlertModal";
import {Paragraph} from "../../../components/ui/Paragraph";
import {Heading} from "../../../components/ui/Heading";

export default function DeckEditScreenHelpModal(props: AlertModalProps) {
    const {
        title = "Deck Edit Screen",
        bodyStyle,
        ...alertProps
    } = props;
    return <AlertModal title={title} bodyStyle={[{paddingHorizontal: 5}, bodyStyle]} {...alertProps}>

        <Paragraph>
            <Text>This screen shows your deck and its cards, with edit options.</Text>
            <Text>By clicking on the info button next to the deck&apos;s title, you can change it along with the deck&apos;s description.</Text>
        </Paragraph>

        <Paragraph>
            <Text>Next to the cards title there is an edit button that lets you rename the card.</Text>
            <Text>Under that are the Save/Undo buttons, which become enabled when you make a change.</Text>
            <Text>To the right, with the card count, are the add/remove card buttons.</Text>
        </Paragraph>

        <Paragraph>
            <Heading>Editing a Side</Heading>
            <Text>At the top of the card is a menu button which presents you with options to edit/delete the current side, or add a new side to the card.</Text>
            <Text>If the side is empty when you enter edit mode, a button is shown to add the first content item.</Text>
            <Text>When the side isn&apos;t empty, a menu button appears next to each content item, which allows you to edit/resize/remove an item, as well as add another one.</Text>
            <Text>When you&apos;re done, you can click the colored buttons at the top of the card to accept/cancel your discard. These changes are not saved until you click the save button.</Text>
        </Paragraph>

        <Paragraph>
            <Heading>Switching Card</Heading>
            <Text>If the deck has multiple cards, there are arrow buttons on the side to cycle through the deck.</Text>
            <Text>On the mobile app, you can also swipe through the deck.</Text>
        </Paragraph>

        <Paragraph>
            <Heading>Finishing</Heading>
            <Text>When you&apos;ve made changes, the Save/Undo buttons at the top of the screen are enabled.</Text>
        </Paragraph>

    </AlertModal>;
}
