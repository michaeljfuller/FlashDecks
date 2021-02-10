import React from "react";
import {StyleSheet} from "react-native";
import Row from "../../layout/Row";
import Button from "../../button/Button";
import {FormTextInput, FormTextInputProps} from "./FormTextInput";

export interface FormPasswordInputProps extends FormTextInputProps {
    existingPassword: boolean;
    showPassword: boolean;
    toggleShowPassword?: () => void;
}

export const FormPasswordInput = React.memo(function FormPasswordInput(props: FormPasswordInputProps) {
    const {style, existingPassword, showPassword, toggleShowPassword, ...otherProps} = props;
    return <Row style={style}>
        <FormTextInput
            secureTextEntry={!showPassword}
            textContentType={existingPassword ? "password" : "newPassword"}
            {...otherProps}
        />
        <Button
            title={showPassword ? 'hide' : 'show'}
            onClick={toggleShowPassword}
            square flat
            width={70}
            style={[styles.toggle, !toggleShowPassword && styles.hidden]}
        />
    </Row>;
});

const styles = StyleSheet.create({
    toggle: {
        borderWidth: 1,
        borderLeftWidth: 0,
    },
    hidden: {
        opacity: 0,
    },
});
