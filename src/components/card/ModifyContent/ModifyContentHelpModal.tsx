import React from "react";
import {Text} from "react-native";
import {AlertModal, AlertModalProps} from "../../modal/AlertModal/AlertModal";
import {Paragraph} from "../../ui/Paragraph";
import {Heading} from "../../ui/Heading";

export default function ModifyContentHelpModal(props: AlertModalProps) {
    const {
        title = "Deck Edit Screen",
        bodyStyle,
        ...alertProps
    } = props;
    return <AlertModal title={title} bodyStyle={[{paddingHorizontal: 5}, bodyStyle]} {...alertProps}>

        <Paragraph>
            <Text>Here you can select the type of content you'd like and set its value.</Text>
            <Text>These are the content types available:</Text>
        </Paragraph>

        <Paragraph>
            <Heading>Text</Heading>
            <Text>Displays a block text back to the user.</Text>
        </Paragraph>

        <Paragraph>
            <Heading>Image</Heading>
            <Text>You can provide a URL to an image, or upload an image from your device.</Text>
        </Paragraph>

        <Paragraph>
            <Heading>Video</Heading>
            <Text>You can provide a URL to a video, or upload an image from your device.</Text>
        </Paragraph>

        <Paragraph>
            <Heading>Link</Heading>
            <Text>Displays a button linking to an external site, with a prompt warning the user they're leaving the site and confirming the location.</Text>
        </Paragraph>

    </AlertModal>;
}
