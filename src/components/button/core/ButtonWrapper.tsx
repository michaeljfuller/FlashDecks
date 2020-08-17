import React, {PropsWithChildren} from 'react';
import {TouchableWithoutFeedback, View, ViewStyle} from "react-native";

interface ButtonWrapperProps {
    style?: ViewStyle;
}

/**
 * Add Touchable to block touch event bubbling.
 */
export function ButtonWrapper(props: PropsWithChildren<ButtonWrapperProps>) {
    return <TouchableWithoutFeedback>
        <View style={props.style}>
            {props.children}
        </View>
    </TouchableWithoutFeedback>;
}
export default ButtonWrapper;
