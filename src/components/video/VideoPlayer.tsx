import React, {SyntheticEvent} from "react";
import {View} from "react-native";
import {VideoPlayerProps} from "./VideoPlayer.common";
import VideoPlayerError from "./VideoPlayerError";
import ImmutablePureComponent from "../ImmutablePureComponent";

export interface VideoPlayerState {
    error?: string;
}

export class VideoPlayer extends ImmutablePureComponent<VideoPlayerProps, VideoPlayerState> {
    readonly state = {} as Readonly<VideoPlayerState>;

    get sourceType(): HTMLSourceElement['type']|undefined {
        let result = this.props.sourceUri;
        if (result) {
            // Extract from source
            result = result.startsWith('data:')
                ? result.substr('data:'.length).split(';')[0]   // Local file
                : "video/" + result.split('.').pop();           // Remote URL
            // Check if not a video
            if (!result.startsWith('video/')) {
                return result;
            }
            // If a video isn't supported, try as mp4.
            // Unsupported: "video/quicktime" (mov), "video/x-matroska" (mkv), ...
            if (result.startsWith('video/') && ["video/webm", "video/mp4", "video/ogg"].indexOf(result) < 0) {
                result = "video/mp4";
            }
            return result;
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

        if (error) {
            return <VideoPlayerError message={error} />;
        }
        if (!sourceUri) {
            return <View />;
        }

        return <video
            autoPlay={autoplay}
            loop={loop}
            muted={muted}
            controls={controls}
            key={sourceUri}
            onError={this.onError}
            width="100%"
        >
            <source src={sourceUri} type={this.sourceType} />
        </video>;
    }

}
