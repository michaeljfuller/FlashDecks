import React from "react";
import {View, LayoutChangeEvent} from "react-native";
import {Video, VideoNaturalSize, VideoReadyForDisplayEvent} from 'expo-av';
import ImmutablePureComponent from "../../../ImmutablePureComponent";
import {CardMediaVideoProps} from "./CardMediaVideo.common";
import {CardMediaError} from "./CardMediaError";

export interface CardMediaVideoState {
    error?: string;
    videoSize: VideoNaturalSize;
    viewWidth: number;
    displaySize: Dimensions;
}

interface Dimensions {
    width: number;
    height: number;
}

export class CardMediaVideo extends ImmutablePureComponent<CardMediaVideoProps, CardMediaVideoState> {
    readonly state = {
        videoSize: { width: 0, height: 0, orientation: "landscape" },
        viewWidth: 0,
        displaySize: { width: 0, height: 0 },
    } as Readonly<CardMediaVideoState>;

    componentDidUpdate(prevProps: Readonly<CardMediaVideoProps>/*, prevState: Readonly<CardMediaVideoState>, snapshot?: any*/) {
        if (prevProps.content.value !== this.props.content.value) { // URI changed
            this.setStateTo({ error: undefined });
        }
    }

    onViewLayout = (event: LayoutChangeEvent) => {
        const viewWidth = event.nativeEvent.layout.width;
        const {videoSize} = this.state;
        this.setStateTo(draft => {
            draft.viewWidth = viewWidth;
            draft.displaySize = CardMediaVideo.calculateDisplaySize(viewWidth, videoSize);
        });
    }

    onVideoReadyForDisplay = (event: VideoReadyForDisplayEvent) => {
        const videoSize = event.naturalSize;
        const {viewWidth} = this.state;
        this.setStateTo(draft => {
            draft.videoSize = videoSize;
            draft.displaySize = CardMediaVideo.calculateDisplaySize(viewWidth, videoSize);
        });
    }

    onError = (error: string) => {
        this.setStateTo({ error });
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
        const {error} = this.state;
        const height = this.props.height || this.state.displaySize.height || undefined;

        if (error) {
            return <CardMediaError message={error} height={height} />;
        }

        return <View onLayout={this.onViewLayout}>
            <Video isLooping shouldPlay isMuted useNativeControls
                source={{ uri: this.props.content.value }}
                onReadyForDisplay={this.onVideoReadyForDisplay}
                onError={this.onError}
                style={{ height }}
                resizeMode="contain"
            />
        </View>;
    }
}
export default CardMediaVideo;
