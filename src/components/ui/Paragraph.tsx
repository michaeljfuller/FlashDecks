import React, {PropsWithChildren} from "react";
import {StyleSheet, View, ViewProps} from "react-native";

export type ParagraphProps = PropsWithChildren<ViewProps>;

export function Paragraph(props: ParagraphProps) {
    const {style, ...viewProps} = props;
    return <View style={[styles.paragraph, style]} {...viewProps} />;
}
export default Paragraph;

const styles = StyleSheet.create({
    paragraph: {
        marginVertical: 4,
    },
});
