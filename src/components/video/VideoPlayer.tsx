import React, {SyntheticEvent} from "react";
import {VideoPlayerProps} from "./VideoPlayer.common";
import VideoPlayerError from "./VideoPlayerError";
import ImmutablePureComponent from "../ImmutablePureComponent";

export interface VideoPlayerState {
    error?: string;
}

export class VideoPlayer extends ImmutablePureComponent<VideoPlayerProps, VideoPlayerState> {
    readonly state = {} as Readonly<VideoPlayerState>;

    componentDidUpdate(prevProps: Readonly<VideoPlayerProps>/*, prevState: Readonly<{}>, snapshot?: {}*/) {
        if (prevProps.sourceUri !== this.props.sourceUri) { // URI changed
            this.setStateTo({ error: undefined });
        }
    }

    onError = (_: SyntheticEvent<HTMLVideoElement, Event>) => {
        const error = 'Failed to load video'; //e.currentTarget.error?.message;
        this.setStateTo({ error });
        this.props.onError && this.props.onError(error);
    }

    render() {
        const {
            autoplay=true,
            loop=false,
            muted=false,
            controls=true,
            height=100,
            sourceUri,
        } = this.props;
        const {error} = this.state;

        if (error) {
            return <VideoPlayerError message={error} height={height} />;
        }
        return <video
            autoPlay={autoplay}
            loop={loop}
            muted={muted}
            controls={controls}
            height={height}
            key={sourceUri}
            onError={this.onError}
        >
            <source src={sourceUri} type={"video/"+sourceUri.split('.').pop()} />
        </video>;
    }

}

