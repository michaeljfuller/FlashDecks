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
import {passwordMinLength, usernameMinLength} from "../authRules";

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
        return this.usernameValid && this.password1Valid && this.password2Valid && this.email1Valid && this.email2Valid;
    }

    get usernameValid(): boolean {
        return this.state.username.length >= usernameMinLength; // TODO
    }
    get password1Valid(): boolean {
        return this.state.password1.length >= passwordMinLength; // TODO
    }
    get password2Valid(): boolean {
        return this.state.password1 === this.state.password2;
    }
    get email1Valid(): boolean {
        return this.state.email1.length > 0; // TODO
    }
    get email2Valid(): boolean {
        return this.state.email1 === this.state.email2;
    }

    componentWillUnmount() {
        this.signUpSub?.unsubscribe();
    }

    onInputUsername = (username: string) => this.setState({ username });
    onInputPassword1 = (password1: string) => this.setState({ password1 });
    onInputPassword2 = (password2: string) => this.setState({ password2 });
    onInputEmail1 = (email1: string) => this.setState({ email1 });
    onInputEmail2 = (email2: string) => this.setState({ email2 });
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
        const {processing} = this.state;
        return <Column>
            <Text style={styles.title}>Sign Up</Text>

            <Text>Username</Text>
            <FormTextInput
                value={this.state.username}
                onChangeText={this.onInputUsername}
                disabled={processing}
                textContentType={"username"}
            />

            <Text>Password</Text>
            <FormPasswordInput
                value={this.state.password1}
                onChangeText={this.onInputPassword1}
                existingPassword={false}
                disabled={processing}
                showPassword={!this.state.hidePassword}
                toggleShowPassword={this.toggleHidePassword}
            />
            <FormPasswordInput
                value={this.state.password2}
                onChangeText={this.onInputPassword2}
                existingPassword={false}
                disabled={processing}
                showPassword={!this.state.hidePassword}
                style={styles.confirmInput}
            />
            <Text style={styles.rule}>Passwords must be at least {passwordMinLength} characters.</Text>

            <Text>E-mail</Text>
            <FormTextInput
                value={this.state.email1}
                onChangeText={this.onInputEmail1}
                textContentType="newPassword"
                keyboardType="email-address"
                disabled={processing}
            />
            <FormTextInput
                value={this.state.email2}
                onChangeText={this.onInputEmail2}
                textContentType="newPassword"
                keyboardType="email-address"
                disabled={processing}
                style={styles.confirmInput}
            />

            <Button
                title="Submit"
                onClick={this.signUp}
                disabled={processing || !this.valid}
                square style={styles.submit}
            />

            <ProgressBar visible={processing} style={styles.progress} />

            {this.state.success ? <Text style={styles.success}>{this.state.success}</Text> : null}
            {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}

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
    input: {
        borderWidth: 1,
        paddingHorizontal: 6,
        paddingVertical: 4,
        backgroundColor: Color.White,
        flex: 1,
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
