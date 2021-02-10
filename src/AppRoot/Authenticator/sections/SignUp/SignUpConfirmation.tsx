import React from "react";
import {Subscription} from "rxjs";
import Column from "../../../../components/layout/Column";
import {StyleSheet, Text} from "react-native";
import Button from "../../../../components/button/Button";
import {Color} from "../../../../styles/Color";
import {FormTextInput} from "../../ui/FormTextInput";

export interface SignUpConfirmationProps {
    username?: string;
    onSubmit: (username: string, code: string) => void;
    disabled?: boolean;
}
interface SignUpConfirmationState {
    username: string;
    code: string;
}

/**
 * @link https://docs.amplify.aws/lib/auth/customui/q/platform/js#composing-your-own-authenticator
 */
export class SignUpConfirmation extends React.PureComponent<SignUpConfirmationProps, SignUpConfirmationState> {
    state = {
        username: '',
        code: '',
    } as SignUpConfirmationState;

    private confirmSignUpSub?: Subscription;

    componentDidMount() {
        this.setState({ username: this.props.username || '' })
    }
    componentWillUnmount() {
        this.confirmSignUpSub?.unsubscribe();
    }

    onInputUsername = (username: string) => this.setState({ username });
    onInputCode = (code: string) => this.setState({ code });

    onSubmit = () => {
        this.props.onSubmit(this.state.username, this.state.code);
    };

    render() {
        return <Column>
            <Text style={styles.title}>Enter Confirmation Code</Text>

            <Text>Username</Text>
            <FormTextInput
                value={this.state.username}
                onChangeText={this.onInputUsername}
                disabled={this.props.disabled}
            />

            <Text>Code</Text>
            <FormTextInput
                value={this.state.code}
                onChangeText={this.onInputCode}
                disabled={this.props.disabled}
            />

            <Button
                title="Submit"
                onClick={this.onSubmit}
                disabled={this.props.disabled || !this.state.username || !this.state.code}
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
    submit: {
        marginTop: 10,
    },
});
