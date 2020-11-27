import React from "react";
import {LayoutChangeEvent, View} from "react-native";
import {Video, VideoNaturalSize, VideoReadyForDisplayEvent} from 'expo-av';
import ImmutablePureComponent from "../ImmutablePureComponent";
import {VideoPlayerProps} from "./VideoPlayer.common";
import VideoPlayerError from "./VideoPlayerError";

export interface VideoPlayerState {
    error?: string;
    videoSize: VideoNaturalSize;
    viewWidth: number;
    displaySize: Dimensions;
}
interface Dimensions {
    width: number;
    height: number;
}

export class VideoPlayer extends ImmutablePureComponent<VideoPlayerProps, VideoPlayerState> {
    readonly state = {
        videoSize: { width: 0, height: 0, orientation: "landscape" },
        viewWidth: 0,
        displaySize: { width: 0, height: 0 },
    } as Readonly<VideoPlayerState>;

    componentDidUpdate(prevProps: Readonly<VideoPlayerProps>/*, prevState: Readonly<VideoPlayerState>, snapshot?: any*/) {
        if (prevProps.sourceUri !== this.props.sourceUri) { // URI changed
            this.setStateTo({ error: undefined });
        }
    }

    onViewLayout = (event: LayoutChangeEvent) => {
        const viewWidth = event.nativeEvent.layout.width;
        const {videoSize} = this.state;
        this.setStateTo(draft => {
            draft.viewWidth = viewWidth;
            draft.displaySize = calculateDisplaySize(viewWidth, videoSize);
        });
    }

    onVideoReadyForDisplay = (event: VideoReadyForDisplayEvent) => {
        const videoSize = event.naturalSize;
        const {viewWidth} = this.state;
        this.setStateTo(draft => {
            draft.videoSize = videoSize;
            draft.displaySize = calculateDisplaySize(viewWidth, videoSize);
        });
    }

    onError = (error: string) => {
        this.setStateTo({ error });
        this.props.onError && this.props.onError(error);
    }

    render() {
        const {error} = this.state;
        const {
            autoplay=true,
            loop=false,
            muted=false,
            controls=true,
            sourceUri,
        } = this.props;
        const height = this.props.height || this.state.displaySize.height || 100;

        if (error) {
            return <VideoPlayerError message={error} height={height} />;
        }

        return <View onLayout={this.onViewLayout}>
            <Video
                shouldPlay={autoplay}
                isLooping={loop}
                isMuted={muted}
                useNativeControls={controls}
                style={{ height }}
                onError={this.onError}
                source={{ uri: sourceUri }}
                onReadyForDisplay={this.onVideoReadyForDisplay}
                resizeMode="contain"
            />
        </View>;
    }
}

function calculateDisplaySize(viewWidth: number, videoSize: VideoNaturalSize): Dimensions {
    let width = viewWidth;
    let height = videoSize.height;
    if (videoSize.width > viewWidth && videoSize.height > 0) {
        const videoAspectRatio = videoSize.width / videoSize.height;
        width = viewWidth;
        height = Math.round(viewWidth / videoAspectRatio);
    }
    return {width, height};
}
