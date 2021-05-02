import React from "react";
import {VideoPlayer} from "../../../video/VideoPlayer";
import {BaseCardMedia} from "./core/BaseCardMedia";
import {CardMediaError} from "./CardMediaError";
import {View} from "react-native";
import Center from "../../../layout/Center";
import ProgressCircle from "../../../progress/ProgressCircle";
import stopTouchPropagation from "../../../../utils/hoc/stopTouchPropagation";
import withDefaultProps from "../../../../utils/hoc/withDefaultProps/withDefaultProps";

const CardVideoPlayer = withDefaultProps(
    stopTouchPropagation(VideoPlayer),
    { autoplay: true, controls: true, loop: true, muted: true },
    undefined,
    "CardVideoPlayer"
);

export class CardMediaVideo extends BaseCardMedia {
    onError = (error?: string) => {
        this.logger(this.onError).warning(error);
        this.setStateTo({ error: error || 'An error occurred.' });
    }

    render() {
        const {error} = this.state;
        const {minHeight, maxHeight} = this.props;
        const height = this.props.height || 200;

        if (error) {
            return <CardMediaError message={error} />;
        }

        return <View style={{height, minHeight, maxHeight}}>
            {!this.mediaUri
            ?   <Center><ProgressCircle /></Center>
            :   <CardVideoPlayer sourceUri={this.mediaUri} onError={this.onError} />
            }
        </View>;
    }

}
