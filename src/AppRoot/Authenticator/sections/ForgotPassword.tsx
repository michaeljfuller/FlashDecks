import React from "react";
import {StyleSheet, Text} from "react-native";
import {Subscription} from "rxjs";
import Column from "../../../components/layout/Column";
import {FormTextInput} from "../ui/FormTextInput";
import Button from "../../../components/button/Button";
import ProgressBar from "../../../components/progress/ProgressBar";
import {Color} from "../../../styles/Color";
import {
    validateUsername,
    validatePassword,
    validatePasswordConfirm,
    validateForgotPasswordCode,
    flattenValidation
} from "../../../api/validation/authValidation";
import {Visibility} from "../../../components/layout/Visibility";
import {FormPasswordInput} from "../ui/FormPasswordInput";
import authApi from "../../../api/AuthApi";
import {getErrorText} from "../../../utils/string";
import {ValidationText} from "../../../components/ui/form/ValidationText";

export interface ForgotPasswordProps {
    onComplete: (username: string, password: string) => void;
    username?: string;
}
interface ForgotPasswordState {
    username: string;
    password1: string;
    password2: string;
    code: string;

    enterCode: boolean;
    hidePassword: boolean;
    processing: boolean;
    success: string;
    error: string;
}

export class ForgotPassword extends React.PureComponent<ForgotPasswordProps, ForgotPasswordState> {
    state = {
        username: '',
        password1: '',
        password2: '',
        code: '',

        enterCode: false,
        hidePassword: true,
        processing: false,
        success: '',
        error: '',
    } as ForgotPasswordState;

    private forgotPasswordSub?: Subscription;

    get valid() {
        if (this.state.enterCode) {
            return this.usernameValidation.valid
                && this.password1Validation.valid
                && this.password2Validation.valid
                && this.codeValidation.valid;
        }
        return this.usernameValidation.valid;
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
    get codeValidation() {
        return validateForgotPasswordCode(this.state.code);
    }

    componentDidMount() {
        this.setState({ username: this.props.username || '' });
    }
    componentWillUnmount() {
        this.forgotPasswordSub?.unsubscribe();
    }

    onInputUsername = (username: string) => this.setState({ username, success: '', error: '' });
    onInputPassword1 = (password1: string) => this.setState({ password1, success: '', error: '' });
    onInputPassword2 = (password2: string) => this.setState({ password2, success: '', error: '' });
    onInputCode = (code: string) => this.setState({ code, success: '', error: '' });
    toggleHidePassword = () => this.setState({ hidePassword: !this.state.hidePassword });

    submitForgotPassword() {
        const {subscription, promise} = authApi.forgotPassword(this.state.username);
        this.forgotPasswordSub?.unsubscribe();
        this.forgotPasswordSub = subscription;
        promise.then(
            () => this.setState({
                success: 'Sending email.',
                enterCode: true,
            }),
            e => this.setState({
                error: getErrorText(e?.message, 'Error'),
            }),
        ).finally(() => this.setState({ processing: false }));
    }

    submitNewPassword() {
        const {subscription, promise} = authApi.forgotPasswordSubmit(this.state.username, this.state.password1, this.state.code);
        this.forgotPasswordSub?.unsubscribe();
        this.forgotPasswordSub = subscription;
        promise.then(
            () => this.props.onComplete(this.state.username, this.state.password1),
            e => this.setState({
                error: getErrorText(e?.message, 'Error'),
                processing: false,
            }),
        );
    }

    onSubmit = () => {
        if (!this.state.enterCode) {
            this.submitForgotPassword();
        } else {
            this.submitNewPassword();
        }
    };
    onEnterCode = () => {
        this.setState({ enterCode: true });
    }

    render() {
        const {
            usernameValidation, password1Validation, password2Validation, codeValidation,
        } = this;
        const {
            processing, hidePassword, success, error, username, password1, password2, code,
        } = this.state;

        return <Column>

            <Text style={styles.title}>Forgot Password</Text>

            <Text>Username</Text>
            <FormTextInput
                value={username}
                onChangeText={this.onInputUsername}
                disabled={processing}
                textContentType={"username"}
            />
            <ValidationText
                visible={!usernameValidation.valid}
                type={username ? "error" : "standard"}
                text={usernameValidation.reason}
            />

            <Visibility render={this.state.enterCode}>

                <Text>Password</Text>
                <FormPasswordInput
                    value={password1}
                    onChangeText={this.onInputPassword1}
                    existingPassword={false}
                    disabled={processing}
                    showPassword={!hidePassword}
                    toggleShowPassword={this.toggleHidePassword}
                />
                <FormPasswordInput
                    value={password2}
                    onChangeText={this.onInputPassword2}
                    existingPassword={false}
                    disabled={processing}
                    showPassword={!hidePassword}
                    style={styles.confirmInput}
                />
                <ValidationText
                    visible={Boolean(!password1Validation.valid || !password2Validation.valid)}
                    type={(password1 && !password1Validation.valid) || (password2 && !password2Validation.valid) ? "error" : "standard"}
                    text={flattenValidation([password1Validation, password2Validation], 0).reason}
                />

                <Text>Verification Code</Text>
                <FormTextInput
                    value={code}
                    onChangeText={this.onInputCode}
                    disabled={processing}
                    textContentType={"oneTimeCode"}
                    keyboardType={"number-pad"}
                />
                <ValidationText
                    visible={!codeValidation.valid}
                    type={code ? "error" : "standard"}
                    text={codeValidation.reason}
                />

            </Visibility>

            <Button
                title="Submit"
                onClick={this.onSubmit}
                disabled={processing || !this.valid}
                square style={styles.submit}
            />

            {!this.state.enterCode ? <Button title="Enter Code" onClick={this.onEnterCode} square transparent /> : null }

            <ProgressBar visible={processing} style={styles.progress} />

            <ValidationText
                visible={Boolean(success || error)}
                text={error || success}
                type={error ? "error" : "success"}
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
    progress: {
        marginTop: 2,
    },
});
