import React, {useCallback} from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import {CardContentModel} from "../../../../models";
import {Color} from "../../../../styles/Color";
import {CardMediaVideo} from "../../CardContent/media/CardMediaVideo";

interface CardFormVideoProps {
    content: CardContentModel;
    onChange: (content: CardContentModel) => void;
    preview?: boolean;
}

export const CardFormVideo = React.memo(function CardFormVideo(props: CardFormVideoProps) {
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
        <View style={styles.preview}>
            {preview && content.validValue && <CardMediaVideo content={content} />}
        </View>
        <Text style={{fontWeight:'bold'}}>Example:</Text>
        <Text selectable>https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4</Text>
    </View>;

});
export default CardFormVideo;

const styles = StyleSheet.create({
    inputRow: {
        flexDirection: "row",
    },
    input: {
        flex: 1,
        marginLeft: 5,
        marginVertical: "auto",
        borderWidth: 2,
        borderColor: Color.Green,
        paddingHorizontal: 2,
    },
    preview: {
        marginTop: 5,
        height: 200,
        overflow: "hidden",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#DDD",
    },
});
