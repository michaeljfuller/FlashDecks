import React, {PropsWithChildren} from 'react';
import {TouchableOpacity} from "react-native";

interface ButtonWrapperProps {}

/**
 * Add Touchable to block touch event bubbling.
 */
export function ButtonWrapper(props: PropsWithChildren<ButtonWrapperProps>) {
    return <TouchableOpacity>{props.children}</TouchableOpacity>;
}
export default ButtonWrapper;
