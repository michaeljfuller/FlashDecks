import React from 'react';
import {ImageStyle, LayoutChangeEvent, LayoutRectangle, StyleSheet, Text, View, ViewStyle} from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import {ImageInfo} from "expo-image-picker/src/ImagePicker.types";
import ToastStore from "../../store/toast/ToastStore";
import Button from "../button/Button";
import {VideoPlayer} from "../video/VideoPlayer";

export interface VideoPickerProps {
    label?: string;
    preview?: boolean;
    style?: ViewStyle;
    buttonStyle?: ViewStyle;
    previewStyle?: ImageStyle;
    onChange: (data: VideoPickerData) => void;
}
export interface VideoPickerState {
    video?: ImageInfo;
    error?: string;
}
export interface VideoPickerData {
    uri: string;
    width?: number;
    height?: number;
}

/**
 * @link https://docs.expo.io/versions/latest/sdk/imagepicker/
 */
export class VideoPicker extends React.PureComponent<VideoPickerProps, VideoPickerState> {
    state: VideoPickerState = {};
    toast = new ToastStore(this);

    async requestPermission() {
        const {status} = await ExpoImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
            this.toast.add({ type: "default", title: "Video Picker", text: "Permission denied." });
        }
    }

    async pick(): Promise<ExpoImagePicker.ImagePickerResult|void> {
        this.setState({ error: undefined });
        try {
            const video = await ExpoImagePicker.launchImageLibraryAsync({
                mediaTypes: ExpoImagePicker.MediaTypeOptions.Videos
            });
            console.log('VideoPicker.pick', video);
            if (!video.cancelled) {
                this.setState({video});
                this.props.onChange && this.props.onChange(video);
            }
        } catch (e) {
            console.error('VideoPicker.pick', e.message, e);
            this.setState({ error: e.message || `${e.type || 'Error'} picking video.`})
            throw e;
        }
    }

    onPressPick = async () => {
        await this.requestPermission();
        await this.pick();
    }

    render() {
        const {video, error} = this.state;
        const {
            label = 'Select Video',
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
                    <VideoPlayer sourceUri={video?.uri||''} autoplay loop muted controls />
                </View>
                : null
            }
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>;
    }
}

export const styles = StyleSheet.create({
    root: {
        width: '100%',
    },
    error: {
        backgroundColor: 'red',
        color: 'white',
        padding: 4,
    },
    previewView: {
        flex: 1,
        flexGrow:1,
        marginTop: 3,
        justifyContent: "center",
        flexDirection: "row",
    },
});
