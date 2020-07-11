import {Text, StyleSheet, View} from "react-native";
import React from "react";

export interface CardContentProps {
    content: CardContent;
}

export function CardContent(props: CardContentProps) {
    return <View style={styles.root}>
        <Text selectable={false}>{props.content.type}</Text>
        <Text selectable={false}>{JSON.stringify(props.content.value, null, 2)}</Text>
    </View>;
}

const styles = StyleSheet.create({
    root: {
        borderWidth: 1,
        margin: 2,
        padding: 2,
    },
});
