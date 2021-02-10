import React from "react";
import {StyleSheet, Text} from "react-native";
import {Visibility} from "../../layout/Visibility";
import {Color} from "../../../styles/Color";

export interface ValidationTextProps {
    text: string;
    visible?: boolean;
    type?: "standard"|"error"|"success";
}
export const ValidationText = React.memo(function ({
    text, visible=true, type
}: ValidationTextProps) {
    return <Visibility visible={visible}>
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
        lineHeight: 24,
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
