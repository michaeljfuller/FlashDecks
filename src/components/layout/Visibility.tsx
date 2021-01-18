import React from "react";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";

export type VisibilityProps = React.PropsWithChildren<{
    render?: boolean; // Keep size while not displaying
    visible?: boolean; // Set false to prevent children from being constructed
    style?: StyleProp<ViewStyle>;
}>;

/** A view that can either hide its children, or stop them being created. */
export function Visibility(props: VisibilityProps) {
    const { render=true, visible=true } = props;
    if (!render) return null;
    
    const style: StyleProp<ViewStyle> = [];
    if (props.style) Array.isArray(props.style) ? style.push(...props.style) : style.push(props.style);

    return <View style={[...style, visible ? null : styles.invisible]}>
        {props.children}
    </View>;
}

const styles = StyleSheet.create({
    invisible: {
        opacity: 0,
    },
});
