import React from "react";
import {VideoPlayer} from "../../../video/VideoPlayer";
import {BaseCardMedia} from "./core/BaseCardMedia";
import {CardMediaError} from "./CardMediaError";
import {StyleSheet, View} from "react-native";
import Center from "../../../layout/Center";
import ProgressCircle from "../../../progress/ProgressCircle";
import {Color} from "../../../../styles/Color";
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
        const height = this.props.height || 200;

        if (error) {
            return <CardMediaError message={error} />;
        }

        return <View style={[styles.root, {height}]}>
            {!this.mediaUri
            ?   <Center><ProgressCircle /></Center>
            :   <CardVideoPlayer sourceUri={this.mediaUri} onError={this.onError} />
            }
        </View>;
    }

}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    error: {
        color: Color.White,
        backgroundColor: Color.Red,
        textAlign: "center",
    },
});
