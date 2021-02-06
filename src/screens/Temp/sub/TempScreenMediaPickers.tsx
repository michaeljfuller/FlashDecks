import React from "react";
import HR from "../../../components/ui/HR";
import {VideoPicker} from "../../../components/media-picker/VideoPicker";
import {ImagePicker} from "../../../components/media-picker/ImagePicker";
import TempScreenSubsection from "../ui/TempScreenSubsection";

export function TempScreenMediaPickers() {
    return <TempScreenSubsection title="Media Pickers">
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
    </TempScreenSubsection>;
}
export default TempScreenMediaPickers;
