import React, {useCallback} from "react";
import {Text, TextInput, View, StyleSheet} from "react-native";
import {Color} from "../../../../styles/Color";
import {CardContentModel} from "../../../../models";

export interface CardMediaTextProps {
    content: CardContentModel;
    height?: number;
}

export function CardMediaText(props: CardMediaTextProps) {
    const { content, height } = props;
    return <View style={{minHeight: height}}>
        <Text style={styles.text} selectable={false}>{content.value}</Text>
    </View>;
}

const styles = StyleSheet.create({
    text: {
        marginVertical: "auto",
    },
    textInput: {
        marginVertical: "auto",
        borderWidth: 2,
        borderColor: Color.Green,
        paddingHorizontal: 2,
    },
});
