import React, {PropsWithChildren} from 'react';
import {View, ViewStyle} from "react-native";
import styles from './ModalContainer.styles';

export interface ModalContainerProps {
    style?: ViewStyle;
}

export function ModalContainer(props: PropsWithChildren<ModalContainerProps>) {
    return <View style={[styles.root, props.style]}>
        {props.children}
    </View>;
}
export default ModalContainer;
