import React from 'react';
import {Image, ImageStyle, StyleSheet, View, ViewStyle} from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import {ImageInfo} from "expo-image-picker/src/ImagePicker.types";
import ToastStore from "../../store/toast/ToastStore";
import Button from "../button/Button";

export interface ImagePickerProps {
    label?: string;
    preview?: boolean;
    style?: ViewStyle;
    buttonStyle?: ViewStyle;
    previewStyle?: ImageStyle;
    onChange: (data: ImagePickerData) => void;
}
export interface ImagePickerState {
    image?: ImageInfo;
}
export interface ImagePickerData {
    uri: string;
    width?: number;
    height?: number;
}

/**
 * @link https://docs.expo.io/versions/latest/sdk/imagepicker/
 */
export class ImagePicker extends React.PureComponent<ImagePickerProps, ImagePickerState> {
    state: ImagePickerState = {};
    toast = new ToastStore(this);

    async requestPermission() {
        const {status} = await ExpoImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
            this.toast.add({ type: "default", title: "Image Picker", text: "Permission denied." });
        }
    }

    async pick() {
        const image = await ExpoImagePicker.launchImageLibraryAsync({
            mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        });
        if (!image.cancelled) {
            this.setState({image});
            this.props.onChange && this.props.onChange(image);
        }
    }

    onPressPick = async () => {
        await this.requestPermission();
        await this.pick();
    }

    render() {
        const {
            label = 'Select Image',
            preview = false,
            style,
            buttonStyle,
            previewStyle,
        } = this.props;

        return <View style={[styles.root, style]}>
            <Button title={label} onClick={this.onPressPick} square style={buttonStyle} />
            {
                preview
                ? <Image
                    source={{ uri: this.state.image?.uri }}
                    style={[styles.previewImage, previewStyle]}
                    resizeMode="contain"
                />
                : null
            }
        </View>;
    }
}

export const styles = StyleSheet.create({
    root: {
        width: '100%',
    },
    previewImage: {
        marginTop: 3,
        width: '100%',
        flex: 1,
    },
});
