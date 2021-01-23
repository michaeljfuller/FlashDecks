import React, {useCallback} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
import {CardContentFormat, CardContentModel} from "../../../../models";
import {Color} from "../../../../styles/Color";
import {CardMediaVideo} from "../../CardContent/media/CardMediaVideo";
import {VideoPicker, VideoPickerData} from "../../../media-picker/VideoPicker";

interface CardFormVideoProps {
    content: CardContentModel;
    onChange: (content: CardContentModel) => void;
    preview?: boolean;
}

export const CardFormVideo = React.memo(function CardFormVideo(props: CardFormVideoProps) {
    const { content, onChange, preview } = props;
    const remoteUrl = props.content.format === "String" ? props.content.value : '';

    const onChangeText = useCallback(
        (value: string) => onChange(content.update({value})),
        [onChange, content]
    );

    const onChangeLocal = useCallback(
        (data: VideoPickerData) => {
            let format: CardContentFormat = "String";
            if (data.uri.startsWith('data:')) format = "VideoData";
            else if (data.uri.startsWith('file:')) format = "LocalURI";
            onChange(content.update({ format, value: data.uri }));
        },
        [onChange, content]
    );

    return <View>

        <View style={styles.inputRow}>
            <Text>URL</Text>
            <TextInput
                editable
                focusable
                style={styles.input}
                value={remoteUrl}
                onChangeText={onChangeText}
            />
        </View>

        <Text style={{fontWeight:'bold'}}>Example:</Text>
        <Text selectable>https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4</Text>

        <View style={styles.inputRow}>
            <VideoPicker label="Pick video from device" onChange={onChangeLocal} />
        </View>

        <View style={styles.preview}>
            {preview && content.validValue && <CardMediaVideo content={content} />}
        </View>

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
