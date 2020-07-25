import React, {useRef, useState} from "react";
import {StyleSheet, Text, View, PanResponder, ViewStyle} from "react-native";
import globalStyles from "../../../styles/globalStyleSheet";
import {isPlatformWeb} from "../../../platform";

interface CardContentResizerProps {
    editing: boolean;
    text?: string;
    onStart?: () => void;
    onMove?: (offsetY: number) => void;
    onFinished?: (canceled: boolean) => void;
    style?: ViewStyle;
}

/** A draggable bar to identify what to resize the content to. */
export function CardContentResizer(props: CardContentResizerProps) {
    const [isDragging, setIsDragging] = useState(false);
    const panResponder = useRef(
        PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (/*event, state*/) => true,
            onStartShouldSetPanResponderCapture: (/*event, state*/) => true,
            onMoveShouldSetPanResponder: (/*event, state*/) => true,
            onMoveShouldSetPanResponderCapture: (/*event, state*/) => true,

            // The gesture has started.
            // gestureState.d{x,y} will be set to zero now.
            onPanResponderGrant: (/*event, state*/) => {
                setIsDragging(true);
                props.onStart && props.onStart();
            },

            // The most recent move distance is `gestureState.move{X,Y}`.
            // The accumulated gesture distance since becoming responder is `gestureState.d{x,y}`.
            onPanResponderMove: (event, state) => {
                props.onMove && props.onMove(state.dy);
            },

            // The user has released all touches while this view is the responder.
            // This typically means a gesture has succeeded.
            onPanResponderRelease: (/*event, state*/) => {
                setIsDragging(false);
                props.onFinished && props.onFinished(false);
            },

            // Another component has become the responder, so this gesture should be cancelled.
            onPanResponderTerminate: (/*event, state*/) => {
                setIsDragging(false);
                props.onFinished && props.onFinished(true);
            },
        })
    ).current;

    if (props.editing) {
        return <View
            {...panResponder.panHandlers}
            style={[
                styles.root,
                isDragging ? styles.rootDragging : null,
                globalStyles.verticalResize,
                props.style
            ]}
        >
            <View style={styles.line} />
            <Text style={styles.text}>{props.text}</Text>
            <View style={styles.line} />
        </View>;
    } else {
        return null;
    }
}
export default CardContentResizer;

const height = isPlatformWeb ? 20 : 35;
const padding = 2;
const marginHorizontal = 10;
const lineThickness = 2;
const innerHeight = height - padding * 2;
const backgroundColor = "#DDD";
const activeColor = "#EEE";
const lineColor = "#000";
const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        backgroundColor,
        borderColor: backgroundColor,
        borderWidth: padding,
        marginHorizontal,
        position: 'relative',
        top: -height/2 - lineThickness/2,
    },
    rootDragging: {
        backgroundColor: activeColor,
        borderColor: activeColor,
    },
    line: {
        backgroundColor: lineColor,
        marginVertical: (innerHeight - lineThickness)/2,
        height: lineThickness,
        flex: 1,
    },
    text: {
        lineHeight: innerHeight,
        paddingHorizontal: padding,
    },
});
