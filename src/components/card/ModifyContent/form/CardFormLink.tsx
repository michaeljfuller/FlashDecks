import React, {useCallback} from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import {CardContentModel} from "../../../../models";
import {Color} from "../../../../styles/Color";
import {CardMediaLink} from "../../CardContent/media/CardMediaLink";

interface CardFormLinkProps {
    content: CardContentModel;
    onChange: (content: CardContentModel) => void;
    preview?: boolean;
}

export function CardFormLink(props: CardFormLinkProps) {
    const { content, onChange, preview } = props;

    const onChangeText = useCallback(
        (value: string) => onChange(content.update({value})),
        [onChange, content]
    );

    return <View>
        <View style={styles.inputRow}>
            <Text>URL</Text>
            <TextInput
                editable
                focusable
                autoFocus
                style={styles.input}
                value={props.content.value}
                onChangeText={onChangeText}
            />
        </View>
        {preview && <CardMediaLink content={content} />}
    </View>;
}

const styles = StyleSheet.create({
    inputRow: {
        flexDirection: "row",
        marginBottom: 10,
    },
    input: {
        flex: 1,
        marginLeft: 5,
        marginVertical: "auto",
        borderWidth: 2,
        borderColor: Color.Green,
        paddingHorizontal: 2,
    },
});
