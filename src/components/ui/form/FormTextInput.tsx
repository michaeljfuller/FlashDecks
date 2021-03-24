import React from "react";
import {StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle} from "react-native";
import {Color} from "../../../styles/Color";

export interface FormTextInputProps extends TextInputProps {
    disabled?: boolean;
}
export const FormTextInput = React.memo(function FormTextInput(props: FormTextInputProps) {
    const style: StyleProp<TextStyle> = [styles.base];
    if (props.disabled) style.push(styles.disabled);
    if (props.style) Array.isArray(props.style) ? style.push(...props.style) : style.push(props.style);

    return <TextInput {...props} style={style} data-testid={props.testID} />;
});

const styles = StyleSheet.create({
    base: {
        borderWidth: 1,
        paddingHorizontal: 6,
        paddingVertical: 4,
        backgroundColor: Color.White,
        flex: 1,
    },
    disabled: {
        color: Color.Grey,
    },
});
