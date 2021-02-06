import React, {useCallback} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
import {CardContentModel} from "../../../../models";
import {Color} from "../../../../styles/Color";
import {CardMediaImage} from "../../CardContent/media/CardMediaImage";
import {ImagePicker, ImagePickerData} from "../../../media-picker/ImagePicker";

interface CardFormImageProps {
    content: CardContentModel;
    onChange: (content: CardContentModel) => void;
    preview?: boolean;
}

const previewHeight = 200;

export const CardFormImage = React.memo(function CardFormImage(props: CardFormImageProps) {
    const { content, onChange, preview } = props;

    const onChangeText = useCallback(
        (value: string) => onChange(content.update({
            value,
            format: "String"
        })),
        [onChange, content]
    );
    const onChangeLocal = useCallback(
        (data: ImagePickerData) => onChange(content.update({
            value: data.dataUri,
            format: "ImageData"
        })),
        [onChange, content]
    );

    return <View>
        <View style={styles.inputRow}>
            <Text>URL</Text>
            <TextInput
                editable
                focusable
                style={styles.input}
                value={content.format === "String" ? content.value : ''}
                onChangeText={onChangeText}
            />
        </View>
        <View style={{marginVertical: 4}}>
            <Text style={{fontWeight:'bold'}}>Example:</Text>
            <Text selectable>https://file-examples-com.github.io/uploads/2017/10/file_example_JPG_100kB.jpg</Text>
            <Text selectable>https://file-examples-com.github.io/uploads/2017/10/file_example_GIF_500kB.gif</Text>
            <Text selectable>https://file-examples-com.github.io/uploads/2017/10/file_example_PNG_500kB.png</Text>
            <Text selectable>https://file-examples-com.github.io/uploads/2020/03/file_example_SVG_20kB.svg</Text>
        </View>
        <View style={styles.inputRow}>
            <ImagePicker label="Pick image from device" onChange={onChangeLocal} />
        </View>
        <View style={styles.preview}>
            {preview && content.validValue && <View style={styles.image}>
                <CardMediaImage content={content} height={previewHeight} />
            </View>}
        </View>
    </View>;
});
export default CardFormImage;

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
        height: previewHeight,
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#DDD",
    },
    image: {
        borderWidth: 1,
        backgroundColor: Color.White,
    },
});
