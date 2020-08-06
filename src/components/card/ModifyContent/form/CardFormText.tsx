import React, {useCallback} from "react";
import {View, TextInput, StyleSheet} from "react-native";
import {CardContentModel} from "../../../../models";
import {Color} from "../../../../styles/Color";

interface CardFormTextProps {
    content: CardContentModel;
    onChange: (content: CardContentModel) => void;
}

export function CardFormText(props: CardFormTextProps) {
    const { content, onChange } = props;

    const onChangeText = useCallback(
        (value: string) => onChange(content.update({value})),
        [onChange, content]
    );

    const numberOfLines = Math.max(12, (content.value || '').split('\n').length);

    return <View>
        <TextInput
            editable
            multiline
            focusable
            autoFocus
            numberOfLines={numberOfLines}
            style={styles.input}
            value={props.content.value}
            onChangeText={onChangeText}
        />
    </View>;

}

const styles = StyleSheet.create({
    input: {
        marginVertical: "auto",
        borderWidth: 2,
        borderColor: Color.Green,
        paddingHorizontal: 2,
    },
});
