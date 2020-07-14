import React from "react";
import {View, LayoutChangeEvent} from "react-native";
import {Video, VideoNaturalSize, VideoReadyForDisplayEvent} from 'expo-av';
import {CardContentProps} from "../CardContent";

export interface CardMediaVideoState {
    videoSize: VideoNaturalSize;
    viewWidth: number;
    displaySize: Dimensions;
}
interface Dimensions {
    width: number;
    height: number;
}
export class CardMediaVideo extends React.Component<CardContentProps, CardMediaVideoState> {
    state = {
        videoSize: { width: 0, height: 0, orientation: "landscape" },
        viewWidth: 0,
        displaySize: { width: 0, height: 0 }
    } as CardMediaVideoState;

    onViewLayout = (event: LayoutChangeEvent) => {
        this.setState({ viewWidth: event.nativeEvent.layout.width });
        this.updateDisplaySize();
    }
    onVideoReadyForDisplay = (event: VideoReadyForDisplayEvent) => {
        this.setState({ videoSize: event.naturalSize });
        this.updateDisplaySize();
    }
    updateDisplaySize() {
        const {viewWidth, videoSize} = this.state;
        let width = viewWidth;
        let height = videoSize.height;
        if (videoSize.width > viewWidth && videoSize.height > 0) {
            const videoAspectRatio = videoSize.width / videoSize.height;
            width = viewWidth;
            height = viewWidth / videoAspectRatio;
        }
        this.setState({ displaySize: { width, height } });
    }

    render() {
        const width = this.state.displaySize.width || 100;
        const height = this.state.displaySize.height || 100;

        return <View onLayout={this.onViewLayout}>
            <Video
                source={{ uri: this.props.content.value }}
                onReadyForDisplay={this.onVideoReadyForDisplay} style={{ width, height }}
                isLooping={true}
                shouldPlay={true}
                resizeMode="contain"
                useNativeControls={true}
            />
        </View>;
    }
}
export default CardMediaVideo;
