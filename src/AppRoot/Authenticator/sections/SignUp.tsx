import React from "react";
import Column from "../../../components/layout/Column";
import {StyleSheet, Text} from "react-native";
import Button from "../../../components/button/Button";
import {Color} from "../../../styles/Color";
import {FormTextInput} from "../ui/FormTextInput";
import {FormPasswordInput} from "../ui/FormPasswordInput";

export interface SignUpProps {}
interface SignUpState {
    username: string;
    password1: string;
    password2: string;
    hidePassword: boolean;
    lock: boolean;
}

/**
 * @link https://docs.amplify.aws/lib/auth/customui/q/platform/js#composing-your-own-authenticator
 */
export class SignUp extends React.PureComponent<SignUpProps, SignUpState> {
    state = {
        username: '',
        password1: '',
        password2: '',
        hidePassword: true,
        lock: false,
    } as SignUpState;

    get usernameValid(): boolean {
        return this.state.username.length > 0; // TODO
    }
    get password1Valid(): boolean {
        return this.state.password1.length > 0; // TODO
    }
    get password2Valid(): boolean {
        return this.state.password1 === this.state.password2;
    }

    onInputUsername = (username: string) => this.setState({ username });
    onInputPassword1 = (password1: string) => this.setState({ password1 });
    onInputPassword2 = (password2: string) => this.setState({ password2 });
    toggleHidePassword = () => this.setState({ hidePassword: !this.state.hidePassword });

    signUp = () => {};

    render() {
        const {lock} = this.state;
        return <Column>
            <Text style={styles.title}>Sign Up - TODO</Text>

            <Text>Username</Text>
            <FormTextInput
                value={this.state.username}
                onChangeText={this.onInputUsername}
                disabled={lock}
                textContentType={"username"}
            />

            <Text>Password</Text>
            <FormPasswordInput
                value={this.state.password1}
                onChangeText={this.onInputPassword1}
                existingPassword={false}
                disabled={lock}
                showPassword={!this.state.hidePassword}
                toggleShowPassword={this.toggleHidePassword}
            />
            <FormPasswordInput
                value={this.state.password2}
                onChangeText={this.onInputPassword2}
                existingPassword={false}
                disabled={lock}
                showPassword={!this.state.hidePassword}
                style={styles.password2}
            />

            <Button
                title="Submit"
                onClick={this.signUp}
                disabled={lock || !this.usernameValid || !this.password1Valid || !this.password2Valid}
                square style={styles.submit}
            />

        </Column>;
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        textAlign: "center",
        color: "red",
    },
    input: {
        borderWidth: 1,
        paddingHorizontal: 6,
        paddingVertical: 4,
        backgroundColor: Color.White,
        flex: 1,
    },
    password2: {
        marginTop: 2,
    },
    hidePasswordButton: {
        borderWidth: 1,
        borderLeftWidth: 0,
    },
    submit: {
        marginTop: 10,
    },
});
