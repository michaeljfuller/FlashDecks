import React, {PropsWithChildren} from 'react';
import {StyleProp, TouchableWithoutFeedback, View, ViewStyle, StyleSheet} from "react-native";

export interface ButtonWrapperProps {
    style?: StyleProp<ViewStyle>;
    grow?: boolean|number;
    shrink?: boolean|number;
    size?: number;
}

/**
 * Add Touchable to block touch event bubbling.
 */
export function ButtonWrapper(props: PropsWithChildren<ButtonWrapperProps>) {
    let growStyle, shrinkStyle: ViewStyle|undefined;
    if (props.grow) growStyle = typeof props.grow === 'number' ? { flexGrow: props.grow } : styles.grow;
    if (props.shrink) shrinkStyle = typeof props.shrink === 'number' ? { flexShrink: props.shrink } : styles.shrink;

    return <TouchableWithoutFeedback>
        <View style={[
            styles.view,
            growStyle,
            shrinkStyle,
            props.size ? {flexBasis: props.size} : null,
            props.style
        ]}>
            {props.children}
        </View>
    </TouchableWithoutFeedback>;
}
export default ButtonWrapper;

const styles = StyleSheet.create({
    view: {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: "auto",
        flexDirection: "row",
        minWidth: 50,
    },
    grow: {
        flexGrow: 1,
    },
    shrink: {
        flexShrink: 1,
    },
});
