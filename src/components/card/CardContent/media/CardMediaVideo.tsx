import React from "react";
import {VideoPlayer} from "../../../video/VideoPlayer";
import {BaseCardMedia} from "./core/BaseCardMedia";
import {CardMediaError} from "./CardMediaError";
import {StyleSheet, View} from "react-native";
import Center from "../../../layout/Center";
import ProgressCircle from "../../../progress/ProgressCircle";
import {Visibility} from "../../../layout/Visibility";
import {Color} from "../../../../styles/Color";
import {stopTouchPropagation} from "../../../../utils/hoc/stopTouchPropagation";

const CardVideoPlayer = stopTouchPropagation(VideoPlayer);

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
            {this.mediaUri ? undefined : <Center><ProgressCircle /></Center>}
            <Visibility render={!!this.mediaUri} style={[styles.fullSize]}>
                <CardVideoPlayer
                    sourceUri={this.mediaUri||''}
                    autoplay
                    controls
                    loop
                    muted
                    onError={this.onError}
                />
            </Visibility>
        </View>;
    }

}

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
    },
    error: {
        color: Color.White,
        backgroundColor: Color.Red,
        textAlign: "center",
    },
    fullSize: {
        width: '100%',
        height: '100%',
    }
});
