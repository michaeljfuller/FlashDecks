import React from "react";
import {Subscription} from "rxjs";
import Column from "../../../components/layout/Column";
import {StyleSheet, Text} from "react-native";
import {Color} from "../../../styles/Color";
import authApi from "../../../api/AuthApi";
import {ConfirmSignUpError, SignUpError} from "../../../api/AuthApi.types";
import {getErrorText} from "../../../utils/string";
import ProgressBar from "../../../components/progress/ProgressBar";
import {SignUpForm} from "./SignUp/SignUpForm";
import Button from "../../../components/button/Button";
import {SignUpConfirmation} from "./SignUp/SignUpConfirmation";

export interface SignUpProps {
    onComplete: (username?: string, password?: string) => void;
}
interface SignUpState {
    enterCode: boolean;
    processing: boolean;
    success: string;
    error: string;
}

/**
 * @link https://docs.amplify.aws/lib/auth/customui/q/platform/js#composing-your-own-authenticator
 */
export class SignUp extends React.PureComponent<SignUpProps, SignUpState> {
    state = {
        enterCode: false,
        processing: false,
        success: '',
        error: '',
    } as SignUpState;

    private registeredUsername?: string;
    private registeredPassword?: string;

    private signUpSub?: Subscription;
    private confirmationSub?: Subscription;

    componentWillUnmount() {
        this.signUpSub?.unsubscribe();
        this.confirmationSub?.unsubscribe();
    }

    onEnterCode = () => this.setState({ enterCode: true, success: '', error: '' });

    onSignUp = (username: string, password: string, email: string) => {
        this.setState({success: '', error: '', processing: true});
        const {subscription, promise} = authApi.signUp(username, password, email);

        this.signUpSub?.unsubscribe();
        this.signUpSub = subscription;
        promise.then(
            () => {
                this.registeredUsername = username;
                this.registeredPassword = password;
                this.setState({ success: `Email sent to ${email}.`, enterCode: true });
            },
            (e: SignUpError) => this.setState({ error: getErrorText(e?.message, 'Error signing up.') }),
        ).finally(() => this.setState({ processing: false }));
    };

    onConfirmation = (username: string, confirmationCode: string) => {
        const password = this.registeredUsername === username ? this.registeredPassword : '';

        this.setState({success: '', error: '', processing: true});
        const {subscription, promise} = authApi.confirmSignUp(username, confirmationCode);

        this.confirmationSub?.unsubscribe();
        this.confirmationSub = subscription;
        promise.then(
            () => this.props.onComplete(username, password),
            (e: ConfirmSignUpError) => this.setState({
                error: getErrorText(e?.message, 'Error confirming registration.'),
                processing: false ,
            }),
        );
    }

    render() {
        const { processing, success, error } = this.state;

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
                title="Enter Confirmation Code"
                onClick={this.onEnterCode}
                disabled={processing}
                square transparent
            /> : null}

            <ProgressBar visible={processing} style={styles.progress} />

            {success ? <Text style={styles.success}>{success}</Text> : null}
            {error ? <Text style={styles.error}>{error}</Text> : null}

        </Column>;
    }
}

const styles = StyleSheet.create({
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
    progress: {
        marginTop: 2,
    },
});
