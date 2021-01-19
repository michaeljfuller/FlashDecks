import React from "react";
import {Text, View, StyleSheet, LayoutChangeEvent} from "react-native";
import {Video} from 'expo-av';
import ImmutablePureComponent from "../ImmutablePureComponent";
import {VideoPlayerProps} from "./VideoPlayer.common";
import VideoPlayerError from "./VideoPlayerError";
import {Visibility} from "../layout/Visibility";
import ProgressCircle from "../progress/ProgressCircle";
import Row from "../layout/Row";
import Column from "../layout/Column";

export interface VideoPlayerState {
    error?: string;
    readyForDisplay: boolean;
    width: number;
    height: number;
}

export class VideoPlayer extends ImmutablePureComponent<VideoPlayerProps, VideoPlayerState> {
    readonly state = {
        readyForDisplay: false,
        width: 0,
        height: 0,
    } as Readonly<VideoPlayerState>;

    componentDidUpdate(prevProps: Readonly<VideoPlayerProps>/*, prevState: Readonly<VideoPlayerState>, snapshot?: any*/) {
        if (prevProps.sourceUri !== this.props.sourceUri) { // URI changed
            this.setStateTo({ error: undefined });
        }
    }

    onLayout = (event: LayoutChangeEvent) => {
        const {width, height} = event.nativeEvent.layout;
        this.setStateTo({ width, height });
    }
    onReadyForDisplay = () => {
        this.setStateTo({ readyForDisplay: true });
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
        const {
            error,
            readyForDisplay,
            width,
            height,
        } = this.state;

        if (error) {
            return <VideoPlayerError message={error} />;
        }

        return <View style={styles.root}>

            <Visibility render={!readyForDisplay && width > 0}>
                <Column center style={[styles.progressView, { width, height }]}>
                    <Row center>
                        <ProgressCircle />
                    </Row>
                    <Text style={styles.progressMessage}>Readying Video...</Text>
                </Column>
            </Visibility>

            <Visibility visible={readyForDisplay}>
                <Video
                    shouldPlay={autoplay}
                    isLooping={loop}
                    isMuted={muted}
                    useNativeControls={controls}
                    source={sourceUri ? { uri: sourceUri } : undefined}
                    style={styles.video}
                    resizeMode="contain"
                    onLayout={this.onLayout}
                    onReadyForDisplay={this.onReadyForDisplay}
                    onError={this.onError}
                />
            </Visibility>

        </View>;
    }
}

export const styles = StyleSheet.create({
    root: {
        width: '100%',
    },
    progressView: {
        position: "absolute",
    },
    progressMessage: {
        textAlign: "center",
    },
    video: {
        width: '100%',
        height: '100%',
    },
});
