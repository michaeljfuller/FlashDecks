import React from "react";
import {Text, View, StyleSheet} from "react-native";

export interface CardMediaTextProps {
    content: CardContent;
    height?: number;
}

export function CardMediaText(props: CardMediaTextProps) {
    return <View style={{ minHeight: props.height }}>
        <Text style={styles.text} selectable={false}>{props.content.value}</Text>
    </View>;
}

const styles = StyleSheet.create({
    text: {
        marginVertical: "auto",
    },
});
