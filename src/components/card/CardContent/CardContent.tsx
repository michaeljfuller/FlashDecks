import React from "react";
import {Text, StyleSheet, View} from "react-native";
import {CardMediaImage} from "./media/CardMediaImage";
import {CardMediaLink} from "./media/CardMediaLink";
import {CardMediaText} from "./media/CardMediaText";
import {CardMediaVideo} from "./media/CardMediaVideo";

export interface CardContentProps {
    content: CardContent;
}

export function CardContentView(props: CardContentProps) {
    const media = getMedia(props.content);
    return <View style={styles.root}>
        {media}
    </View>;
}
export default CardContentView;

function getMedia(content: CardContent): JSX.Element {
    switch (content.type) {
        case "Image": return <CardMediaImage content={content} />;
        case "Link": return <CardMediaLink content={content} />;
        case "Text": return <CardMediaText content={content} />;
        case "Video": return <CardMediaVideo content={content} />;
    }
    return <Text selectable={false}>Unhandled type {content.type}</Text>;
}

const styles = StyleSheet.create({
    root: {
        borderWidth: 1,
        margin: 2,
        padding: 2,
    },
});
