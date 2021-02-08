import React from "react";
import {testPassword, testUsername} from "../../../env";
import authApi from "../../../api/AuthApi";
import Column from "../../../components/layout/Column";
import {StyleSheet, Text, View} from "react-native";
import Row from "../../../components/layout/Row";
import Button from "../../../components/button/Button";
import {Color} from "../../../styles/Color";
import {FormTextInput} from "../ui/FormTextInput";
import {FormPasswordInput} from "../ui/FormPasswordInput";
import {SignInError} from "../../../api/AuthApi.types";
import ProgressBar from "../../../components/progress/ProgressBar";

export interface SignInProps {}
interface SignInState {
    username: string;
    password: string;
    hidePassword: boolean;
    processing: boolean;
    error: string;
}

/**
 * @link https://docs.amplify.aws/lib/auth/customui/q/platform/js#composing-your-own-authenticator
 */
export class SignIn extends React.PureComponent<SignInProps, SignInState> {
    state = {
        username: testUsername,
        password: testPassword,
        hidePassword: true,
        processing: false,
        error: '',
    } as SignInState;

    onInputUsername = (username: string) => this.setState({ username });
    onInputPassword = (password: string) => this.setState({ password });
    toggleHidePassword = () => this.setState({ hidePassword: !this.state.hidePassword });

    signIn = () => {
        this.setState({error: '', processing: true})
        authApi.signIn(this.state.username, this.state.password).catch(
            (e: SignInError) => this.setState({error: e?.message || 'Error signing in.', processing: false}),
        );
    };

    render() {
        const {processing} = this.state;
        return <Column>
            <Text style={styles.title}>Sign In</Text>

            {testUsername || testPassword ? <View style={{marginBottom: 10}}>
                <Row><Text style={{fontWeight:"bold", width:80}}>Test User: </Text><Text>{testUsername}</Text></Row>
                <Row><Text style={{fontWeight:"bold", width:80}}>Password:  </Text><Text>{testPassword}</Text></Row>
            </View> : null}

            <Text>Username</Text>
            <FormTextInput
                value={this.state.username}
                onChangeText={this.onInputUsername}
                disabled={processing}
                textContentType={"username"}
            />

            <Text>Password</Text>
            <FormPasswordInput
                value={this.state.password}
                onChangeText={this.onInputPassword}
                existingPassword={true}
                disabled={processing}
                showPassword={!this.state.hidePassword}
                toggleShowPassword={this.toggleHidePassword}
            />

            <Button
                title="Submit"
                onClick={this.signIn}
                disabled={processing || !this.state.username || !this.state.password}
                square style={styles.submit}
            />

            <ProgressBar visible={processing} style={styles.progress} />

            <Text style={styles.error}>{this.state.error}</Text>

            {/*<Button title="Continue as Guest (TODO)" flat square disabled style={{marginVertical: 10}} color="Green" />*/}

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
