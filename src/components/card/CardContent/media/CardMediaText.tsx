import React, {useCallback} from "react";
import {Text, TextInput, View, StyleSheet} from "react-native";
import {Color} from "../../../../styles/Color";

export interface CardMediaTextProps {
    content: CardContent;
    height?: number;
    editing?: boolean;
    onChange?: (content: CardContent) => void;
}

export function CardMediaText(props: CardMediaTextProps) {
    const { content, height, editing, onChange } = props;

    const onChangeText = useCallback(
        (value: string) => {
            onChange && onChange({ ...content, value });
        },
        [onChange, content]
    );

    if (editing) {
        const numberOfLines = Math.max(6, (content.value || '').split('\n').length);

        return <View style={{ height }}>
            <TextInput
                editable
                multiline
                focusable
                autoFocus
                numberOfLines={numberOfLines}
                style={styles.textInput}
                value={content.value}
                onChangeText={onChangeText}
            />
        </View>;
    } else {
        return <View style={{minHeight: height}}>
            <Text style={styles.text} selectable={false}>{content.value}</Text>
        </View>;
    }
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
