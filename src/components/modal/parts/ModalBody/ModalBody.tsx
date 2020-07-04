import React, {PropsWithChildren} from 'react';
import {ScrollView, ViewStyle, StyleSheet} from "react-native";

export interface ModalBodyProps {
    style?: ViewStyle;
}

export function ModalBody(props: PropsWithChildren<ModalBodyProps>) {
    return <ScrollView style={[styles.root, props.style]}>
        {props.children}
    </ScrollView>;
}
export default ModalBody;

const styles = StyleSheet.create({
    root: {
        padding: 2,
        backgroundColor: 'white',
    },
});
