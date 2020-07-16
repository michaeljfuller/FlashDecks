import React from "react";
import {Text, View, LayoutChangeEvent} from "react-native";
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
        displaySize: { width: 0, height: 0 },
    } as CardMediaVideoState;

    onViewLayout = (event: LayoutChangeEvent) => {
        const viewWidth = event.nativeEvent.layout.width;
        const {videoSize} = this.state;
        this.setState({
            viewWidth,
            displaySize: CardMediaVideo.calculateDisplaySize(viewWidth, videoSize),
        });
    }
    onVideoReadyForDisplay = (event: VideoReadyForDisplayEvent) => {
        const videoSize = event.naturalSize;
        const {viewWidth} = this.state;
        this.setState({
            videoSize,
            displaySize: CardMediaVideo.calculateDisplaySize(viewWidth, videoSize),
        });
    }

    static calculateDisplaySize(viewWidth: number, videoSize: VideoNaturalSize): Dimensions {
        let width = viewWidth;
        let height = videoSize.height;
        if (videoSize.width > viewWidth && videoSize.height > 0) {
            const videoAspectRatio = videoSize.width / videoSize.height;
            width = viewWidth;
            height = Math.round(viewWidth / videoAspectRatio);
        }
        return {width, height};
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
                isMuted={true}
                resizeMode="contain"
                useNativeControls={true}
            />
        </View>;
    }
}
export default CardMediaVideo;
