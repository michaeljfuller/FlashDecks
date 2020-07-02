import React, {PropsWithChildren} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

export interface ModalFooterProps {
    style?: ViewStyle;
}

export function ModalFooter(props: PropsWithChildren<ModalFooterProps>) {
    return <View style={[styles.root, props.style]}>
        {props.children}
    </View>;
}
export default ModalFooter;

const styles = StyleSheet.create({
    root: {
        width: '100%',
        padding: 0,
    },
});
