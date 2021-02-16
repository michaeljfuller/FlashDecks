import React from "react";
import {Subscription} from "rxjs";
import {isProduction, testPassword, testUsername} from "../../../env";
import authApi from "../../../api/AuthApi";
import Column from "../../../components/layout/Column";
import {StyleSheet, Text, View} from "react-native";
import Row from "../../../components/layout/Row";
import Button from "../../../components/button/Button";
import {FormTextInput} from "../../../components/ui/form/FormTextInput";
import {FormPasswordInput} from "../../../components/ui/form/FormPasswordInput";
import {SignInError} from "../../../api/AuthApi.types";
import ProgressBar from "../../../components/progress/ProgressBar";
import {getErrorText, removeWhitespace} from "../../../utils/string";

export interface SignInProps {
    username?: string;
    password?: string;
    onCredentials: (username: string, password: string) => void;
    onError: (message: string) => void;
}
interface SignInState {
    hidePassword: boolean;
    processing: boolean;
}

/**
 * @link https://docs.amplify.aws/lib/auth/customui/q/platform/js#composing-your-own-authenticator
 */
export class SignIn extends React.PureComponent<SignInProps, SignInState> {
    state = {
        hidePassword: true,
        processing: false,
    } as SignInState;

    private signInSub?: Subscription;

    get username() {
        return this.props.username || '';
    }
    get password() {
        return this.props.password || '';
    }

    componentWillUnmount() {
        this.signInSub?.unsubscribe();
    }

    onInputUsername = (username: string) => this.props.onCredentials(removeWhitespace(username), this.password);
    onInputPassword = (password: string) => this.props.onCredentials(this.username, removeWhitespace(password))
    toggleHidePassword = () => this.setState({ hidePassword: !this.state.hidePassword });

    signIn = () => {
        this.props.onError('');
        this.setState({ processing: true });
        const {subscription, promise} = authApi.signIn(this.username, this.password);

        this.signInSub?.unsubscribe();
        this.signInSub = subscription;
        promise.catch(
            (e: SignInError) => {
                this.props.onError(
                    getErrorText(e?.message, 'Error signing in.')
                );
                this.setState({ processing: false });
            },
        );
    };

    render() {
        const {processing} = this.state;
        return <Column>
            <Text style={styles.title}>Sign In</Text>

            {!isProduction && (testUsername || testPassword) ? <View style={{marginBottom: 10}}>
                <Row><Text style={{fontWeight:"bold", width:80}}>Test User: </Text><Text>{testUsername}</Text></Row>
                <Row><Text style={{fontWeight:"bold", width:80}}>Password:  </Text><Text>{testPassword}</Text></Row>
            </View> : null}

            <Text>Username</Text>
            <FormTextInput
                value={this.username}
                onChangeText={this.onInputUsername}
                disabled={processing}
                textContentType={"username"}
            />

            <Text>Password</Text>
            <FormPasswordInput
                value={this.password}
                onChangeText={this.onInputPassword}
                existingPassword={true}
                disabled={processing}
                showPassword={!this.state.hidePassword}
                toggleShowPassword={this.toggleHidePassword}
            />

            <Button
                title="Submit"
                onClick={this.signIn}
                disabled={processing || !this.username || !this.password}
                square style={styles.submit}
            />

            <ProgressBar visible={processing} style={styles.progress} />

            {/*<Button title="Continue as Guest (TODO)" flat square disabled style={{marginVertical: 10}} color="Green" />*/}

        </Column>;
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        textAlign: "center",
    },
    submit: {
        marginTop: 10,
    },
    progress: {
        marginTop: 2,
    },
});
