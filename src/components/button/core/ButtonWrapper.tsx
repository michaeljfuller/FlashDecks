import React, {PropsWithChildren} from 'react';
import {StyleProp, TouchableWithoutFeedback, View, ViewStyle, StyleSheet} from "react-native";

export interface ButtonWrapperProps {
    style?: StyleProp<ViewStyle>;
}

/**
 * Add Touchable to block touch event bubbling.
 */
export function ButtonWrapper(props: PropsWithChildren<ButtonWrapperProps>) {
    return <TouchableWithoutFeedback>
        <View style={[ styles.view, props.style ]}>
            {props.children}
        </View>
    </TouchableWithoutFeedback>;
}
export default ButtonWrapper;

const styles = StyleSheet.create({
    view: {
        flexBasis: "auto",
        flexDirection: "row",
        minWidth: 10,
    },
});
