import React from "react";
import {StyleProp, StyleSheet, Text, ViewStyle} from "react-native";
import {Visibility} from "../../layout/Visibility";
import {Color} from "../../../styles/Color";

export interface ValidationTextProps {
    text: string;
    visible?: boolean;
    type?: "standard"|"error"|"success";
    style?: StyleProp<ViewStyle>;
    testID?: string;
}
export const FormValidationText = React.memo(function FormValidationText ({
    text, visible=true, type, style, testID
}: ValidationTextProps) {
    return <Visibility visible={visible} style={style} testID={testID}>
        <Text style={[
            styles.base,
            type === "success" && styles.success,
            type === "error" && styles.error,
        ]}>{text || ' '}</Text>
    </Visibility> ;
});

const styles = StyleSheet.create({
    base: {
        color: "grey",
    },
    error: {
        color: Color.Red,
        fontWeight: 'bold',
    },
    success: {
        color: Color.Green,
        fontWeight: 'bold',
    },
});
