import React, {PropsWithChildren} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from "react-native";
import Box from '@material-ui/core/Box';
import {FullScreenProps} from "./FullScreen.common";

export const getTestIDs = (testID: string|undefined) => ({
    root: testID ? testID : "",
    background: testID ? testID+":fs-background" : "",
    contents: testID ? testID+":fs-contents" : "",
});

/**
 * Fill the screen with a clickable background, and place children.
 * @TODO Let it cover the header too.
 */
export default function FullScreen(props: PropsWithChildren<FullScreenProps>) {
    const testIDs = getTestIDs(props.testID);
    return <Box data-testid={testIDs.root||undefined} position="fixed" display="flex" top={0} bottom={0} left={0} right={0}>
        <TouchableWithoutFeedback style={styles.touchable} onPress={props.onPress}>
            <View testID={testIDs.background||undefined} style={[styles.backdrop, props.style]} />
        </TouchableWithoutFeedback>
        <View testID={testIDs.contents||undefined} style={[styles.content, props.contentStyle]}>
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
