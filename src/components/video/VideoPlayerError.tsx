import React from "react";
import {Text, StyleSheet} from "react-native";
import {Color} from "../../styles/Color";

export interface VideoPlayerErrorProps {
    message: string;
    height?: number;
}

export const VideoPlayerError = React.memo(function VideoPlayerError(props: VideoPlayerErrorProps) {
    return <Text style={[
        styles.error,
        { lineHeight: props.height }
    ]}>
        {props.message}
    </Text>;
});
export default VideoPlayerError;

const styles = StyleSheet.create({
    error: {
        color: Color.White,
        backgroundColor: Color.Red,
        textAlign: "center",
    },
});
