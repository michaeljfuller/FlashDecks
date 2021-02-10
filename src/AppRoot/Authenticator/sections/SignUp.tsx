import React from "react";
import {Subscription} from "rxjs";
import Column from "../../../components/layout/Column";
import {StyleSheet, Text} from "react-native";
import Button from "../../../components/button/Button";
import {Color} from "../../../styles/Color";
import {FormTextInput} from "../ui/FormTextInput";
import {FormPasswordInput} from "../ui/FormPasswordInput";
import authApi from "../../../api/AuthApi";
import {SignUpError} from "../../../api/AuthApi.types";
import {getErrorText} from "../../../utils/string";
import ProgressBar from "../../../components/progress/ProgressBar";
import {Visibility} from "../../../components/layout/Visibility";
import {
    validateUsername,
    validatePassword,
    validateEmail,
    validateEmailConfirm,
    validatePasswordConfirm
} from "../../../api/validation/authValidation";

export interface SignUpProps {}
interface SignUpState {
    username: string;
    password1: string;
    password2: string;
    email1: string;
    email2: string;
    hidePassword: boolean;
    processing: boolean;
    success: string;
    error: string;
}

/**
 * @link https://docs.amplify.aws/lib/auth/customui/q/platform/js#composing-your-own-authenticator
 */
export class SignUp extends React.PureComponent<SignUpProps, SignUpState> {
    state = {
        username: '',
        password1: '',
        password2: '',
        email1: '',
        email2: '',
        hidePassword: true,
        processing: false,
        success: '',
        error: '',
    } as SignUpState;

    private signUpSub?: Subscription;

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

    componentWillUnmount() {
        this.signUpSub?.unsubscribe();
    }

    onInputUsername = (username: string) => this.setState({ username, success: '', error: '' });
    onInputPassword1 = (password1: string) => this.setState({ password1, success: '', error: '' });
    onInputPassword2 = (password2: string) => this.setState({ password2, success: '', error: '' });
    onInputEmail1 = (email1: string) => this.setState({ email1, success: '', error: '' });
    onInputEmail2 = (email2: string) => this.setState({ email2, success: '', error: '' });
    toggleHidePassword = () => this.setState({ hidePassword: !this.state.hidePassword });

    clearInput() {
        this.setState({
            username: '',
            email1: '',
            email2: '',
            password1: '',
            password2: '',
        });
    }

    signUp = () => {
        if (!this.valid) return;
        this.setState({error: '', processing: true, success: ''});
        const {username, password1, email1} = this.state;
        const {subscription, promise} = authApi.signUp(username, password1, email1);

        this.signUpSub?.unsubscribe();
        this.signUpSub = subscription;
        promise.then(console.log.bind(console, 'onSignUp')).then(
            () => {
                this.setState({ success: `Registered ${username}.` });
                this.clearInput();
            },
            (e: SignUpError) => this.setState({ error: getErrorText(e?.message, 'Error signing up.') }),
        ).finally(() => this.setState({ processing: false }));
    };

    render() {
        const {
            usernameValidation, password1Validation, password2Validation, email1Validation, email2Validation,
        } = this;
        const {
            processing, hidePassword, success, error, username, password1, password2, email1, email2,
        } = this.state;

        return <Column>
            <Text style={styles.title}>Sign Up</Text>

            <Text>Username</Text>
            <FormTextInput
                value={username}
                onChangeText={this.onInputUsername}
                disabled={processing}
                textContentType={"username"}
            />
            <Visibility visible={Boolean(!usernameValidation.valid)}>
                <Text style={styles.rule}>{usernameValidation.reason || 'Invalid username'}</Text>
            </Visibility>

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
            <Visibility visible={Boolean(!password1Validation.valid || !password2Validation.valid)}>
                <Text style={styles.rule}>{password1Validation.reason || password2Validation.reason || 'Invalid password.'}</Text>
            </Visibility>

            <Text>E-mail</Text>
            <FormTextInput
                value={email1}
                onChangeText={this.onInputEmail1}
                textContentType="newPassword"
                keyboardType="email-address"
                disabled={processing}
            />
            <FormTextInput
                value={email2}
                onChangeText={this.onInputEmail2}
                textContentType="newPassword"
                keyboardType="email-address"
                disabled={processing}
                style={styles.confirmInput}
            />
            <Visibility visible={Boolean(!email1Validation.valid || !email2Validation.valid)}>
                <Text style={styles.rule}>{email1Validation.reason || email2Validation.reason || 'Invalid email.'}</Text>
            </Visibility>

            <Button
                title="Submit"
                onClick={this.signUp}
                disabled={processing || !this.valid}
                square style={styles.submit}
            />

            <ProgressBar visible={processing} style={styles.progress} />

            {success ? <Text style={styles.success}>{success}</Text> : null}
            {error ? <Text style={styles.error}>{error}</Text> : null}

        </Column>;
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        textAlign: "center",
    },
    rule: {
        color: "grey",
    },
    confirmInput: {
        marginTop: 2,
    },
    success: {
        color: Color.Green,
        fontWeight: 'bold',
        lineHeight: 24,
        minWidth: 24,
    },
    error: {
        color: Color.Red,
        fontWeight: 'bold',
        lineHeight: 24,
        minWidth: 24,
    },
    submit: {
        marginTop: 10,
    },
    progress: {
        marginTop: 2,
    },
});
