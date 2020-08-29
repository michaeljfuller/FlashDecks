import React, {PropsWithChildren} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from "react-native";
import Box from '@material-ui/core/Box';
import {FullScreenProps} from "./FullScreen.common";

/**
 * Fill the screen with a clickable background, and place children.
 * @TODO Let it cover the header too.
 */
export default function FullScreen(props: PropsWithChildren<FullScreenProps>) {
    return <Box position="fixed" display="flex" top={0} bottom={0} left={0} right={0}>
        <TouchableWithoutFeedback style={styles.touchable} onPressIn={props.onPress}>
            <View style={[styles.backdrop, props.style]} />
        </TouchableWithoutFeedback>
        <View style={[styles.content, props.contentStyle]}>
            {props.children}
        </View>
    </Box>;
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
