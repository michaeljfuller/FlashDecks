import React, {PropsWithChildren} from 'react';
import {View, StyleSheet, ViewStyle} from "react-native";

export interface ModalContainerProps {
    style?: ViewStyle;
}

export function ModalContainer(props: PropsWithChildren<ModalContainerProps>) {
    return <View style={[styles.root, props.style]}>
        {props.children}
    </View>;
}
export default ModalContainer;

const shadowRadius = 4;
const styles = StyleSheet.create({
    root: {
        // Size
        maxHeight: '100vh',
        maxWidth: '100vw',
        minWidth: '30vw',
        minHeight: '30vh',

        // Border
        borderRadius: 8,
        overflow: "hidden",

        // Shadow
        shadowRadius,
        shadowOpacity: 0.3,
        elevation: shadowRadius * 2,
        shadowOffset: { width: 0, height: shadowRadius }
    },
})
