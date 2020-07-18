import React from "react";
import {View, LayoutChangeEvent} from "react-native";
import {Video, VideoNaturalSize, VideoReadyForDisplayEvent} from 'expo-av';
import {CardMediaVideoProps} from "./CardMediaVideo.common";

export interface CardMediaVideoState {
    videoSize: VideoNaturalSize;
    viewWidth: number;
    displaySize: Dimensions;
}

interface Dimensions {
    width: number;
    height: number;
}

export class CardMediaVideo extends React.Component<CardMediaVideoProps, CardMediaVideoState> {
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
        const height = this.props.height || this.state.displaySize.height || undefined;

        return <View onLayout={this.onViewLayout}>
            <Video isLooping shouldPlay isMuted useNativeControls
                source={{ uri: this.props.content.value }}
                onReadyForDisplay={this.onVideoReadyForDisplay}
                style={{ height }}
                resizeMode="contain"
            />
        </View>;
    }
}
export default CardMediaVideo;
