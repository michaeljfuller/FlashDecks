import React from "react";
import {View} from "react-native";
import HR from "../../../components/ui/HR";
import {VideoPicker} from "../../../components/media-picker/VideoPicker";
import {ImagePicker} from "../../../components/media-picker/ImagePicker";

export function TempScreenMediaPickers() {
    return <View style={{ borderWidth: 1, padding: 2 }}>
        <VideoPicker
            label="Video Picker"
            onChange={data => console.log('VideoPicker >', data)}
            preview
        />

        <HR spacing={3} />

        <ImagePicker
            label="Image Picker"
            onChange={data => console.log('ImagePicker >', data)}
            preview
        />
    </View>;
}
export default TempScreenMediaPickers;
