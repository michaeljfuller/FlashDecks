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
    if (props.editing) {
        const numberOfLines = Math.max(6, (props.content.value || '').split('\n').length);
        const onChangeText = useCallback(
            (value: string) => {
                props.onChange && props.onChange({ ...props.content, value });
            },
            [props.onChange, props.content]
        );

        return <View style={{ height: props.height }}>
            <TextInput
                editable
                multiline
                focusable
                autoFocus
                numberOfLines={numberOfLines}
                style={styles.textInput}
                value={props.content.value}
                onChangeText={onChangeText}
            />
        </View>;
    } else {
        return <View style={{minHeight: props.height}}>
            <Text style={styles.text} selectable={false}>{props.content.value}</Text>
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
