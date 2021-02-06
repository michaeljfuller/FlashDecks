import {StyleSheet, View, ViewStyle} from "react-native";
import React from "react";

interface HRProps {
    thickness?: number;
    spacing?: number;
    color?: string;
}

/** A horizontal rule */
export function HR(props: HRProps) {
    const overrides: ViewStyle = {};
    if (props.thickness) overrides.borderTopWidth = props.thickness;
    if (props.spacing) overrides.marginVertical = props.spacing;
    if (props.color) overrides.borderColor = props.color;

    return <View style={[ styles.hr, overrides ]} />;
}
export default HR;

const styles = StyleSheet.create({
    hr: {
        borderColor: "black",
        borderTopWidth: 2,
        marginVertical: 4,
        height: 0,
    }
});
