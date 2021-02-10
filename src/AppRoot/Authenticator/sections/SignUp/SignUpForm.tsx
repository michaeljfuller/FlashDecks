import React from "react";
import Column from "../../../../components/layout/Column";
import {StyleSheet, Text} from "react-native";
import Button from "../../../../components/button/Button";
import {FormTextInput} from "../../../../components/ui/form/FormTextInput";
import {FormPasswordInput} from "../../../../components/ui/form/FormPasswordInput";
import {
    validateUsername,
    validatePassword,
    validateEmail,
    validateEmailConfirm,
    validatePasswordConfirm, flattenValidation
} from "../../../../api/validation/authValidation";
import {FormValidationText} from "../../../../components/ui/form/FormValidationText";

export interface SignUpFormProps {
    onSubmit: (username: string, password: string, email: string) => void;
    disabled?: boolean;
}
interface SignUpFormState {
    username: string;
    password1: string;
    password2: string;
    email1: string;
    email2: string;
    hidePassword: boolean;
}

/**
 * @link https://docs.amplify.aws/lib/auth/customui/q/platform/js#composing-your-own-authenticator
 */
export class SignUpForm extends React.PureComponent<SignUpFormProps, SignUpFormState> {
    state = {
        username: '',
        password1: '',
        password2: '',
        email1: '',
        email2: '',
        hidePassword: true,
    } as SignUpFormState;

    get valid() {
        return this.usernameValidation.valid
            && this.password1Validation.valid
            && this.password2Validation.valid
            && this.email1Validation.valid
            && this.email2Validation.valid;
    }

    get usernameValidation() {
        return validateUsername(this.state.username);
    }
    get password1Validation() {
        return validatePassword(this.state.password1);
    }
    get password2Validation() {
        return validatePasswordConfirm(this.state.password1, this.state.password2);
    }
    get email1Validation() {
        return validateEmail(this.state.email1);
    }
    get email2Validation() {
        return validateEmailConfirm(this.state.email1, this.state.email2);
    }

    onInputUsername = (username: string) => this.setState({ username });
    onInputPassword1 = (password1: string) => this.setState({ password1 });
    onInputPassword2 = (password2: string) => this.setState({ password2 });
    onInputEmail1 = (email1: string) => this.setState({ email1 });
    onInputEmail2 = (email2: string) => this.setState({ email2 });
    toggleHidePassword = () => this.setState({ hidePassword: !this.state.hidePassword });

    signUp = () => {
        this.props.onSubmit(this.state.username, this.state.password1, this.state.email1);
    };

    render() {
        const { usernameValidation, password1Validation, password2Validation, email1Validation, email2Validation } = this;
        const { disabled } = this.props;
        const { hidePassword, username, password1, password2, email1, email2 } = this.state;

        return <Column>
            <Text style={styles.title}>Enter Confirmation Code</Text>

            <Text>Username</Text>
            <FormTextInput
                value={username}
                onChangeText={this.onInputUsername}
                disabled={disabled}
                textContentType={"username"}
            />
            <FormValidationText
                visible={!usernameValidation.valid}
                type={username ? "error" : "standard"}
                text={usernameValidation.reason}
            />

            <Text>Password</Text>
            <FormPasswordInput
                value={password1}
                onChangeText={this.onInputPassword1}
                existingPassword={false}
                disabled={disabled}
                showPassword={!hidePassword}
                toggleShowPassword={this.toggleHidePassword}
            />
            <FormPasswordInput
                value={password2}
                onChangeText={this.onInputPassword2}
                existingPassword={false}
                disabled={disabled}
                showPassword={!hidePassword}
                style={styles.confirmInput}
            />
            <FormValidationText
                visible={Boolean(!password1Validation.valid || !password2Validation.valid)}
                type={(password1 && !password1Validation.valid) || (password2 && !password2Validation.valid) ? "error" : "standard"}
                text={flattenValidation([password1Validation, password2Validation], 0).reason}
            />

            <Text>E-mail</Text>
            <FormTextInput
                value={email1}
                onChangeText={this.onInputEmail1}
                textContentType="newPassword"
                keyboardType="email-address"
                disabled={disabled}
            />
            <FormTextInput
                value={email2}
                onChangeText={this.onInputEmail2}
                textContentType="newPassword"
                keyboardType="email-address"
                disabled={disabled}
                style={styles.confirmInput}
            />
            <FormValidationText
                visible={Boolean(!email1Validation.valid || !email2Validation.valid)}
                type={(email1 && !email1Validation.valid) || (email2 && !email2Validation.valid) ? "error" : "standard"}
                text={flattenValidation([email1Validation, email2Validation], 0).reason}
            />

            <Button
                title="Submit"
                onClick={this.signUp}
                disabled={disabled || !this.valid}
                square style={styles.submit}
            />

        </Column>;
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        textAlign: "center",
    },
    confirmInput: {
        marginTop: 2,
    },
    submit: {
        marginTop: 10,
    },
});
