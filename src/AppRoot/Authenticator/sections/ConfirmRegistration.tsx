import React from "react";
import {Subscription} from "rxjs";
import authApi from "../../../api/AuthApi";
import Column from "../../../components/layout/Column";
import {StyleSheet, Text} from "react-native";
import Button from "../../../components/button/Button";
import {Color} from "../../../styles/Color";
import {FormTextInput} from "../ui/FormTextInput";
import ProgressBar from "../../../components/progress/ProgressBar";
import {ConfirmSignUpError, SignInError} from "../../../api/AuthApi.types";
import {getErrorText} from "../../../utils/string";

export interface SignInProps {}
interface SignInState {
    username: string;
    code: string;
    processing: boolean;
    success: string;
    error: string;
}

/**
 * @link https://docs.amplify.aws/lib/auth/customui/q/platform/js#composing-your-own-authenticator
 */
export class ConfirmRegistration extends React.PureComponent<SignInProps, SignInState> {
    state = {
        username: '',
        code: '',
        processing: false,
        success: '',
        error: '',
    } as SignInState;

    private confirmSignUpSub?: Subscription;

    componentWillUnmount() {
        this.confirmSignUpSub?.unsubscribe();
    }

    onInputUsername = (username: string) => this.setState({ username });
    onInputCode = (code: string) => this.setState({ code });

    submit = () => {
        this.setState({error: '', processing: true});
        const {subscription, promise} = authApi.confirmSignUp(this.state.username, this.state.code);

        this.confirmSignUpSub?.unsubscribe();
        this.confirmSignUpSub = subscription;
        promise.then(
            () => this.setState({ success: `You can now log in.` }),
            (e: ConfirmSignUpError) => this.setState({ error: getErrorText(e?.message, 'Error confirming registration.') }),
        ).finally(() => this.setState({ processing: false }));
    };

    render() {
        const {processing} = this.state;
        return <Column>
            <Text style={styles.title}>Enter Confirmation Code</Text>

            <Text>Username</Text>
            <FormTextInput
                value={this.state.username}
                onChangeText={this.onInputUsername}
                disabled={processing}
            />

            <Text>Code</Text>
            <FormTextInput
                value={this.state.code}
                onChangeText={this.onInputCode}
                disabled={processing}
            />

            <Button
                title="Submit"
                onClick={this.submit}
                disabled={processing || !this.state.username || !this.state.code}
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
    input: {
        borderWidth: 1,
        paddingHorizontal: 6,
        paddingVertical: 4,
        backgroundColor: Color.White,
        flex: 1,
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
