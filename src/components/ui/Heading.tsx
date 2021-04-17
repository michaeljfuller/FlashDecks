import React, {PropsWithChildren} from "react";
import {StyleSheet, Text, TextProps} from "react-native";

export type HeadingProps = PropsWithChildren<TextProps>;

export function Heading(props: HeadingProps) {
    const {style, ...textProps} = props;
    return <Text style={[styles.heading, style]} {...textProps} />;
}
export default Heading;

const styles = StyleSheet.create({
    heading: {
        fontWeight: "bold",
    },
});
