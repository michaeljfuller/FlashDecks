import React from "react";
import {StyleSheet, View} from "react-native";
import {isPlatformWeb} from "../../platform";
import {Color} from "../../styles/Color";
import Button, {ButtonProps} from "../../components/button/Button";
import Column from "../../components/layout/Column";
import Row from "../../components/layout/Row";
import {SignIn} from "./sections/SignIn";
import {SignUp} from "./sections/SignUp";
import {ForgotPassword} from "./sections/ForgotPassword";
import {AmplifyAuthenticator} from "./amplify-ui/AmplifyAuthenticator";
import {samplePassword, sampleUsername, showSampleCredentials} from "../../env";
import {FormValidationText} from "../../components/ui/form/FormValidationText";
import InfoBanner from "../../components/banner/InfoBanner";
import Center from "../../components/layout/Center";

export interface AppAuthenticatorProps {}
export interface AppAuthenticatorState {
    tab: "SignIn"|"SignUp"|"Forgot"|"Amazon";
    username?: string;
    password?: string;
    success?: string;
    error?: string;
}

/**
 * @link https://docs.amplify.aws/lib/auth/customui/q/platform/js#composing-your-own-authenticator
 */
export class AppAuthenticator extends React.PureComponent<AppAuthenticatorProps, AppAuthenticatorState> {
    state = {
        tab: "SignIn",
        username: showSampleCredentials ? sampleUsername : '',
        password: showSampleCredentials ? samplePassword : '',
    } as AppAuthenticatorState;

    goToSignIn = () => this.setState({ tab: "SignIn", success: '', error: '' });
    goToSignUp = () => this.setState({ tab: "SignUp", success: '', error: '', username: undefined, password: undefined });
    goToForgot = () => this.setState({ tab: "Forgot", success: '', error: '' });
    goToAmazon = () => this.setState({ tab: "Amazon", success: '', error: '' });

    onSuccess = (message: string) => this.setState({ success: message });
    onError = (message: string) => this.setState({ error: message });

    onCredentials = (username?: string, password?: string) => this.setState({
        success: '', error: '', username, password,
    });
    onSignUpComplete = (message: string, username?: string, password?: string) => this.setState({
        tab: "SignIn", success: message, error: '', username, password,
    });
    onForgotPasswordComplete = (message: string, username?: string, password?: string) => this.setState({
        tab: "SignIn", success: message, error: '', username, password,
    });

    render() {
        const { tab, username, password, success, error } = this.state;
        const isSignIn = tab === "SignIn";
        const isSignUp = tab === "SignUp";
        const isForgot = tab === "Forgot";
        const isAmazon = tab === "Amazon";

        return <Column center space style={styles.root}>
            <InfoBanner style={{margin: 1}} />
            <Row wrap style={styles.tabRow}>
                <TabButton title="Sign In"         onClick={this.goToSignIn} disabled={isSignIn} color="Blue"   />
                <TabButton title="Register"        onClick={this.goToSignUp} disabled={isSignUp} color="Green"  />
                <TabButton title="Forgot Password" onClick={this.goToForgot} disabled={isForgot} color="Orange" />
                <TabButton title="Amplify UI"      onClick={this.goToAmazon} disabled={isAmazon} color="Grey"   />
                {/*<TabButton title="Sign Out"        onClick={authApi.signOut} color="Orange" />*/}
            </Row>
            <Row flex center style={styles.contentsRow}>
                <Column center style={styles.contentsColumn} scroll={!isPlatformWeb}>

                    {isSignIn ? <SignIn
                        username={username}
                        password={password}
                        onError={this.onError}
                        onCredentials={this.onCredentials}
                    /> : null}

                    {isSignUp ? <SignUp
                        onSuccess={this.onSuccess}
                        onError={this.onError}
                        onComplete={this.onSignUpComplete}
                    /> : null}

                    {isForgot ? <ForgotPassword
                        username={username}
                        onSuccess={this.onSuccess}
                        onError={this.onError}
                        onComplete={this.onForgotPasswordComplete}
                    /> : null}

                    {isAmazon ? <AmplifyAuthenticator /> : null}

                    <FormValidationText
                        visible={Boolean(success || error)}
                        text={error || success || ''}
                        type={error ? "error" : "success"}
                        style={styles.validation}
                    />

                </Column>
            </Row>
        </Column>;
    }
}
export default AppAuthenticator;

const styles = StyleSheet.create({
    root: {
        backgroundColor: Color.OffWhite,
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
    validation: {
        marginBottom: 10,
    },
    tabRow: {
        marginBottom: 10,
    },
    tabButtonWrapper: {
        flex: 1,
        marginHorizontal: 1,
        marginBottom: 2,
        minWidth: 125,
    },
    contentsRow: {
        minHeight: 250,
    },
    contentsColumn: {
        width: 300,
    },
});

export const TabButton = React.memo(function TabButton(props: ButtonProps) {
    return <View style={styles.tabButtonWrapper}>
        <Button square flat {...props} />
    </View>;
});
