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
import {ConfirmRegistration} from "./sections/ConfirmRegistration";
import {AmplifyAuthenticator} from "./amplify-ui/AmplifyAuthenticator";

export interface AppAuthenticatorProps {}
interface AppAuthenticatorState {
    tab: "SignIn"|"SignUp"|"Forgot"|"Amazon"|"Confirm";
    username?: string;
    password?: string;
}

/**
 * @link https://docs.amplify.aws/lib/auth/customui/q/platform/js#composing-your-own-authenticator
 */
export class AppAuthenticator extends React.PureComponent<AppAuthenticatorProps, AppAuthenticatorState> {
    state = {
        tab: "SignIn",
    } as AppAuthenticatorState;

    goToSignIn  = () => this.setState({ tab: "SignIn",  username: undefined, password: undefined });
    goToSignUp  = () => this.setState({ tab: "SignUp",  username: undefined, password: undefined });
    goToForgot  = () => this.setState({ tab: "Forgot",  username: undefined, password: undefined });
    goToConfirm = () => this.setState({ tab: "Confirm", username: undefined, password: undefined });
    goToAmazon  = () => this.setState({ tab: "Amazon",  username: undefined, password: undefined });

    onCredentials = (username?: string, password?: string) => this.setState({ tab: "SignIn", username, password });

    render() {
        const isSignIn  = this.state.tab === "SignIn";
        const isSignUp  = this.state.tab === "SignUp";
        const isForgot  = this.state.tab === "Forgot";
        const isConfirm = this.state.tab === "Confirm";
        const isAmazon  = this.state.tab === "Amazon";

        return <Column center space scroll={!isPlatformWeb} style={styles.root}>
            <Row wrap style={styles.tabRow}>
                <TabButton title="Sign In"         onClick={this.goToSignIn}  disabled={isSignIn}  transparent={isSignIn}  color="Green"  />
                <TabButton title="Register"        onClick={this.goToSignUp}  disabled={isSignUp}  transparent={isSignUp}  color="Green"  />
                <TabButton title="Forgot Password" onClick={this.goToForgot}  disabled={isForgot}  transparent={isForgot}  color="Blue"   />
                <TabButton title="Confirm"         onClick={this.goToConfirm} disabled={isConfirm} transparent={isConfirm} color="Blue"   />
                <TabButton title="Amplify Auth"    onClick={this.goToAmazon}  disabled={isAmazon}  transparent={isAmazon}  color="Orange" />
                {/*<TabButton title="Sign Out"        onClick={authApi.signOut} color="Orange" />*/}
            </Row>
            <Row flex center style={styles.contentsRow}>
                <Column scroll center style={styles.contentsColumn}>
                    {isSignIn  ? <SignIn username={this.state.username} password={this.state.password} onCredentials={this.onCredentials} /> : null}
                    {isSignUp  ? <SignUp /> : null}
                    {isForgot  ? <ForgotPassword onComplete={this.onCredentials} /> : null}
                    {isConfirm ? <ConfirmRegistration onComplete={this.onCredentials} /> : null}
                    {isAmazon  ? <AmplifyAuthenticator /> : null}
                </Column>
            </Row>
        </Column>;
    }
}
export default AppAuthenticator;

const styles = StyleSheet.create({
    root: {
        backgroundColor: Color.OffWhite,
        padding: 20,
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
    }
});

const TabButton = React.memo(function TabButton(props: ButtonProps) {
    return <View style={styles.tabButtonWrapper}>
        <Button square flat {...props} />
    </View>;
});
