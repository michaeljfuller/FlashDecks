import React, {SyntheticEvent} from "react";
import {View, StyleSheet} from "react-native";
import {supportedVideoTypes, VideoPlayerProps} from "./VideoPlayer.common";
import VideoPlayerError from "./VideoPlayerError";
import ImmutablePureComponent from "../ImmutablePureComponent";
import {Color} from "../../styles/Color";

export interface VideoPlayerState {
    error?: string;
}

export class VideoPlayer extends ImmutablePureComponent<VideoPlayerProps, VideoPlayerState> {
    readonly state = {} as Readonly<VideoPlayerState>;

    get sourceType(): HTMLSourceElement['type']|undefined {
        const result = this.props.sourceUri;
        if (result) {
            // Extract from source
            return result.startsWith('data:')
                ? result.substr('data:'.length).split(';')[0]   // Local file
                : "video/" + result.split('.').pop();           // Remote URL
        }
        return undefined;
    }

    componentDidUpdate(prevProps: Readonly<VideoPlayerProps>/*, prevState: Readonly<{}>, snapshot?: {}*/) {
        if (prevProps.sourceUri !== this.props.sourceUri) { // URI changed
            this.setStateTo({ error: undefined });
        }
    }

    onError = (_: SyntheticEvent<HTMLVideoElement, Event>) => {
        const error = `Failed to load ${this.sourceType || 'video'}.`; //e.currentTarget.error?.message;
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
        const {error} = this.state;

        // If a video isn't supported, try as mp4.
        // Unsupported: "video/quicktime" (mov), "video/x-matroska" (mkv), ...
        let type = this.sourceType || '';
        if (type.startsWith('video/') && supportedVideoTypes.indexOf(type) < 0) {
            type = "video/mp4";
        }

        if (error) {
            return <VideoPlayerError message={error} />;
        }
        if (!sourceUri) {
            return <View />;
        }

        return <View style={styles.root}>
            <video
                autoPlay={autoplay}
                loop={loop}
                muted={muted}
                controls={controls}
                key={sourceUri}
                onError={this.onError}
                height="100%"
                width="100%"
            >
                <source src={sourceUri} type={type} />
            </video>
        </View>;
    }

}

const styles = StyleSheet.create({
    root: {
        backgroundColor: Color.OffBlack,
        flex: 1,
    },
});
