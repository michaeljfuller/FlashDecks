import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {Color} from "../../../../styles/Color";
import {BaseCardMediaProps} from "./core/BaseCardMedia";

export type CardMediaTextProps = BaseCardMediaProps;

export const CardMediaText = React.memo(function CardMediaText(props: CardMediaTextProps) {
    let {height} = props;
    const { content, minHeight, maxHeight } = props;
    if (height !== undefined) {
        if (minHeight) height = Math.max(height, minHeight);
        if (maxHeight) height = Math.min(height, maxHeight);
    }

    return <View style={{minHeight: height || minHeight, maxHeight}}>
        <Text style={styles.text} selectable={false}>{content.value}</Text>
    </View>;
});
export default CardMediaText;

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
