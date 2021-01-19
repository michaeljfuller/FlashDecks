import React from "react";
import {StyleProp, StyleSheet, View, ViewProps, ViewStyle} from "react-native";

export interface VisibilityProps extends ViewProps {
    render?: boolean; // Keep size while not displaying
    visible?: boolean; // Set false to prevent children from being constructed
}

/** A view that can either hide its children, or stop them being created. */
export function Visibility(props: React.PropsWithChildren<VisibilityProps>) {
    const { render=true, visible=true, style, ...viewProps } = props;
    if (!render) return null;

    const viewStyles: StyleProp<ViewStyle> = [];
    if (props.style) Array.isArray(style) ? viewStyles.push(...style) : viewStyles.push(style);
    if (!visible) viewStyles.push(styles.invisible);

    return <View {...viewProps} style={viewStyles}>
        {props.children}
    </View>;
}

const styles = StyleSheet.create({
    invisible: {
        opacity: 0,
    },
});
