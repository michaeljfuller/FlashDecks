import React from "react";
import {Subscription} from "rxjs";
import Column from "../../../components/layout/Column";
import {StyleSheet} from "react-native";
import authApi from "../../../api/AuthApi";
import {ConfirmSignUpError, SignUpError} from "../../../api/AuthApi.types";
import {getErrorText} from "../../../utils/string";
import ProgressBar from "../../../components/progress/ProgressBar";
import Button from "../../../components/button/Button";
import {SignUpForm} from "./SignUp/SignUpForm";
import {SignUpConfirmation} from "./SignUp/SignUpConfirmation";

export interface SignUpProps {
    onSuccess: (message: string) => void;
    onError: (message: string) => void;
    onComplete: (message: string, username?: string, password?: string) => void;
}
interface SignUpState {
    enterCode: boolean;
    processing: boolean;
}

export const TestIDs = Object.freeze({
    Title: "SignIn-Title",
    Username: "SignIn-Username",
    UsernameValidation: "SignIn-UsernameValidation",
    Password: "SignIn-Password",
    PasswordInput: "SignIn-Password-input",
    PasswordToggle: "SignIn-Password-toggle",
    PasswordConfirmation: "SignIn-PasswordConfirmation",
    PasswordConfirmationInput: "SignIn-PasswordConfirmation-input",
    PasswordValidation: "SignIn-PasswordValidation",
    Email: "SignIn-Email",
    EmailConfirmation: "SignIn-EmailConfirmation",
    EmailValidation: "SignIn-EmailValidation",
    VerificationCode: "SignIn-VerificationCode",
    VerificationCodeValidation: "SignIn-VerificationCodeValidation",
    SkipButton: "SignIn-SkipButton",
    Submit: "SignIn-Submit",
    ProgressBar: "SignIn-ProgressBar",
});

/**
 * @link https://docs.amplify.aws/lib/auth/customui/q/platform/js#composing-your-own-authenticator
 */
export class SignUp extends React.PureComponent<SignUpProps, SignUpState> {
    state = {
        enterCode: false,
        processing: false,
    } as SignUpState;

    private registeredUsername?: string;
    private registeredPassword?: string;

    private signUpSub?: Subscription;
    private confirmationSub?: Subscription;

    componentWillUnmount() {
        this.signUpSub?.unsubscribe();
        this.confirmationSub?.unsubscribe();
    }

    clearMessages() {
        this.props.onSuccess('');
        this.props.onError('');
    }
    onEnterCode = () => {
        this.clearMessages();
        this.setState({ enterCode: true });
    };

    onSignUp = (username: string, password: string, email: string) => {
        this.clearMessages();
        this.setState({ processing: true });
        const {subscription, promise} = authApi.signUp(username, password, email);

        this.signUpSub?.unsubscribe();
        this.signUpSub = subscription;
        promise.then(
            () => {
                this.registeredUsername = username;
                this.registeredPassword = password;
                this.props.onSuccess(`Email sent to ${email}.`);
                this.setState({ enterCode: true });
            },
            (e: SignUpError) => this.props.onError(
                getErrorText(e?.message || e, 'Error signing up.')
            ),
        ).finally(() => this.setState({ processing: false }));
    };

    onConfirmation = (username: string, confirmationCode: string) => {
        const password = this.registeredUsername === username ? this.registeredPassword : '';

        this.clearMessages();
        this.setState({ processing: true });
        const {subscription, promise} = authApi.confirmSignUp(username, confirmationCode);

        this.confirmationSub?.unsubscribe();
        this.confirmationSub = subscription;
        promise.then(
            () => this.props.onComplete(
                `You can now sign in as ${username}.`,
                username,
                password
            ),
            (e: ConfirmSignUpError) => this.props.onError(
                getErrorText(e?.message || e, 'Error confirming registration.')
            ),
        ).finally(() => this.setState({ processing: false }));
    }

    render() {
        const { processing } = this.state;

        return <Column>
            {!this.state.enterCode
            ?   <SignUpForm
                    onSubmit={this.onSignUp}
                    disabled={processing}
                />
            :   <SignUpConfirmation
                    onSubmit={this.onConfirmation}
                    disabled={processing}
                    username={this.registeredUsername}
                />
            }

            {!this.state.enterCode ? <Button
                testID={TestIDs.SkipButton}
                title="Enter Confirmation Code"
                onClick={this.onEnterCode}
                disabled={processing}
                square transparent
            /> : null}

            <ProgressBar testID={TestIDs.ProgressBar} visible={processing} style={styles.progress} />

        </Column>;
    }
}

const styles = StyleSheet.create({
    progress: {
        marginTop: 2,
    },
});
