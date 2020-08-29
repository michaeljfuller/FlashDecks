import React, {PropsWithChildren} from 'react';
import {View, StyleSheet, Modal, TouchableWithoutFeedback} from "react-native";
import {FullScreenProps} from "./FullScreen.common";

export default function FullScreen(props: PropsWithChildren<FullScreenProps>) {
    return <Modal visible transparent>
        <TouchableWithoutFeedback style={styles.touchable} onPressIn={props.onPress}>
            <View style={[styles.backdrop, props.style]} />
        </TouchableWithoutFeedback>
        <View style={[styles.content, props.contentStyle]}>
            {props.children}
        </View>
    </Modal>;
}

const styles = StyleSheet.create({
    touchable: {
        flex: 1
    },
    backdrop: {
        flexGrow: 1,
        backgroundColor: "grey",
        opacity: 0.3,
    },
    content: {
        position: "absolute"
    },
});
