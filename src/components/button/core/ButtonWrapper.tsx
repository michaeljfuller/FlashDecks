import React, {PropsWithChildren} from 'react';
import {StyleProp, TouchableWithoutFeedback, View, ViewStyle, StyleSheet} from "react-native";
import {numberOrDefault} from "../../../utils/math";

export interface ButtonWrapperProps {
    style?: StyleProp<ViewStyle>;
    flex?: boolean|number;
    width?: number;
    height?: number;
}

/**
 * Add Touchable to block touch event bubbling.
 */
export function ButtonWrapper(props: PropsWithChildren<ButtonWrapperProps>) {
    const allStyles: StyleProp<ViewStyle> = [styles.view];

    if (props.style) {
        Array.isArray(props.style) ? allStyles.push(...props.style) : allStyles.push(props.style);
    }

    if (typeof props.flex === "number" && !Number.isNaN(props.flex) && props.flex !== 1) {
        allStyles.push({ flex: props.flex });
    } else if (props.flex) {
        allStyles.push(styles.flex);
    }

    allStyles.push({
        width: numberOrDefault(props.width, undefined),
        height: numberOrDefault(props.height, undefined),
    });

    return <TouchableWithoutFeedback>
        <View style={allStyles}>
            {props.children}
        </View>
    </TouchableWithoutFeedback>;
}
export default ButtonWrapper;

const styles = StyleSheet.create({
    view: {
        minWidth: 10,
        flexDirection: "row",
    },
    flex: {
        flex: 1,
    },
});
