import React from 'react';
import {Image, ImageStyle, StyleSheet, View, ViewStyle} from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import ToastStore from "../../store/toast/ToastStore";
import Button from "../button/Button";

export interface ImagePickerData {
    width?: number;
    height?: number;
    dataUri?: string;
}

export interface ImagePickerProps {
    label?: string;
    preview?: boolean;
    style?: ViewStyle;
    buttonStyle?: ViewStyle;
    previewStyle?: ImageStyle;
    onChange: (data: ImagePickerData) => void;
}
export interface ImagePickerState {
    image?: ImagePickerData;
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
            base64: true,
        });
        if (!image.cancelled) {
            let dataUri = '';
            if (image.base64) { // If has base64 (native build) construct dataUri.
                let type = image.uri?.split('.').pop()?.toLowerCase();
                switch(type) {
                    case 'jpg': type = 'jpeg'; break;
                    default: type = 'jpeg'; break;
                }
                dataUri = `data:image/${type};base64,${image.base64}`;
            } else if (image.uri.startsWith('data:image/')) { // Otherwise (web build), uri is a dataUri
                dataUri = image.uri;
            }

            // Create ImagePickerData
            const data: ImagePickerData = {
                width: image.width,
                height: image.height,
                dataUri
            };
            this.setState({image: data});
            this.props.onChange && this.props.onChange(data);
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
                ? <View style={[styles.previewView, previewStyle]}>
                    <Image
                        source={{ uri: this.state.image?.dataUri }}
                        style={styles.previewImage}
                        resizeMode="contain"
                    />
                </View>
                : null
            }
        </View>;
    }
}

export const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: 200,
    },
    previewView: {
        flex: 1,
        marginTop: 3,
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: 'white',
        width: '100%',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    }
});
