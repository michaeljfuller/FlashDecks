import React from "react";
import {Subscription} from "rxjs";
import Column from "../../../../components/layout/Column";
import {StyleSheet, Text} from "react-native";
import Button from "../../../../components/button/Button";
import {FormTextInput} from "../../../../components/ui/form/FormTextInput";
import {FormValidationText} from "../../../../components/ui/form/FormValidationText";
import {validateRegistrationCode, validateUsername} from "../../../../api/validation/authValidation";
import {TestIDs} from "../SignUp";

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
        const {username, code} = this.state;
        const usernameValidation = validateUsername(username);
        const codeValidation = validateRegistrationCode(code);

        return <Column>
            <Text testID={TestIDs.Title} style={styles.title}>Enter Confirmation Code</Text>

            <Text>Username</Text>
            <FormTextInput
                testID={TestIDs.Username}
                value={username}
                onChangeText={this.onInputUsername}
                disabled={this.props.disabled}
            />
            <FormValidationText
                testID={TestIDs.UsernameValidation}
                visible={!usernameValidation.valid}
                type={username ? "error" : "standard"}
                text={usernameValidation.reason}
            />

            <Text>Code</Text>
            <FormTextInput
                testID={TestIDs.VerificationCode}
                value={code}
                onChangeText={this.onInputCode}
                disabled={this.props.disabled}
                textContentType={"oneTimeCode"}
                keyboardType={"number-pad"}
            />
            <FormValidationText
                testID={TestIDs.VerificationCodeValidation}
                visible={!codeValidation.valid}
                type={code ? "error" : "standard"}
                text={codeValidation.reason}
            />

            <Button
                testID={TestIDs.Submit}
                title="Submit"
                onClick={this.onSubmit}
                disabled={this.props.disabled || !usernameValidation.valid || !codeValidation.valid}
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
