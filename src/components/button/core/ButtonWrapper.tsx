import React, {PropsWithChildren} from 'react';
import {TouchableOpacity, View, ViewStyle} from "react-native";

interface ButtonWrapperProps {
    style?: ViewStyle;
}

/**
 * Add Touchable to block touch event bubbling.
 */
export function ButtonWrapper(props: PropsWithChildren<ButtonWrapperProps>) {
    return <TouchableOpacity>
        <View style={props.style}>
            {props.children}
        </View>
    </TouchableOpacity>;
}
export default ButtonWrapper;
