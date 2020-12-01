import React from "react";
import {View, StyleSheet} from "react-native";
import {Video} from 'expo-av';
import ImmutablePureComponent from "../ImmutablePureComponent";
import {VideoPlayerProps} from "./VideoPlayer.common";
import VideoPlayerError from "./VideoPlayerError";

export interface VideoPlayerState {
    error?: string;
}

export class VideoPlayer extends ImmutablePureComponent<VideoPlayerProps, VideoPlayerState> {
    readonly state = {} as Readonly<VideoPlayerState>;

    componentDidUpdate(prevProps: Readonly<VideoPlayerProps>/*, prevState: Readonly<VideoPlayerState>, snapshot?: any*/) {
        if (prevProps.sourceUri !== this.props.sourceUri) { // URI changed
            this.setStateTo({ error: undefined });
        }
    }

    onError = (error: string) => {
        this.setStateTo({ error });
        this.props.onError && this.props.onError(error);
    }

    render() {
        const {
            autoplay=true,
            loop=false,
            muted=false,
            controls=true,
            sourceUri,
        } = this.props;

        if (this.state.error) {
            return <VideoPlayerError message={this.state.error} />;
        }

        return <View style={styles.root}>
            <Video
                shouldPlay={autoplay}
                isLooping={loop}
                isMuted={muted}
                useNativeControls={controls}
                onError={this.onError}
                source={sourceUri ? { uri: sourceUri } : undefined}
                style={styles.video}
                resizeMode="contain"
            />
        </View>;
    }
}

export const styles = StyleSheet.create({
    root: {
        width: '100%',
    },
    video: {
        width: '100%',
        height: '100%',
    },
});
