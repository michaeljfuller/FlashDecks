import React from "react";
import {ShallowWrapper} from "enzyme";
import {AppAuthenticator, AppAuthenticatorState, TabButton} from './AppAuthenticator';
import {configureEnzyme, shallow} from "../../../test/Enzyme";

import {SignIn} from "./sections/SignIn";
import {SignUp} from "./sections/SignUp";
import {ForgotPassword} from "./sections/ForgotPassword";
import {AmplifyAuthenticator} from "./amplify-ui/AmplifyAuthenticator";
import {FormValidationText, ValidationTextProps} from "../../components/ui/form/FormValidationText";
import {ButtonProps} from "../../components/button/Button.common";

configureEnzyme();

//<editor-fold desc="Helpers">

const shallowAppAuthenticator = () => shallow<AppAuthenticator>(<AppAuthenticator />);
type AuthWrapper = ReturnType<typeof shallowAppAuthenticator>;

function findTabButton(wrapper: AuthWrapper, label: string): ShallowWrapper<ButtonProps> {
    return wrapper.findWhere(child => {
        return child.is(TabButton) && child.prop("title") === label;
    });
}
function findFeedbackText(wrapper: AuthWrapper, type: "success"|"error"): ShallowWrapper<ValidationTextProps> {
    return wrapper.findWhere(child => {
        return child.is(FormValidationText)
            && child.prop("visible") === true
            && child.prop("type") === type;
    });
}

//</editor-fold>

describe('AppAuthenticator', () => {
    describe('mounting', () => {
        const wrapper = shallowAppAuthenticator();
        it('succeeds', () => expect(wrapper).toHaveLength(1));
    });

    describe('tab buttons', () => {
        const wrapper = shallowAppAuthenticator();
        const instance = wrapper.instance();

        test.each([
            "Sign In", "Register", "Forgot Password", "Amplify UI",
        ])('has "%s"', (label) => {
            expect(findTabButton(wrapper, label).exists()).toBeTruthy()
        });

        it('starts with "Sign In" selected', () => {
            expect(findTabButton(wrapper, "Sign In").prop("disabled")).toBe(true);
        });

        test.each([
            "Register", "Forgot Password", "Amplify UI",
        ])('starts with "%s" deselected', (label) => {
            expect(findTabButton(wrapper, label).prop("disabled")).toBe(false);
        });

        test.each([
            ["Amplify UI", AmplifyAuthenticator, "Amazon"],
            ["Forgot Password", ForgotPassword, "Forgot"],
            ["Register", SignUp, "SignUp"],
            ["Sign In", SignIn, "SignIn"],
        ] as Array<[any, any, AppAuthenticatorState['tab']]>)(
            'can go to "%s"',
            (label, component, tab) => {
                expect(instance.state.tab).not.toBe(tab);
                expect(wrapper.exists(component)).toBeFalsy();

                const onClick = findTabButton(wrapper, label).prop("onClick") as Function;
                expect(typeof onClick).toBe("function");
                onClick();

                expect(instance.state.tab).toBe(tab);
                expect(wrapper.exists(component)).toBeTruthy();
            }
        );

    });

    describe("SignIn", () => {
        const wrapper = shallowAppAuthenticator();
        const instance = wrapper.instance();
        instance.setState({
            tab: "SignIn",
            username: 'initial-username',
            password: 'initial-password',
        });
        it('it can be shown', () => {
            instance.setState({ tab: "" as any });
            expect(wrapper.find(SignIn).exists()).toBeFalsy();
            instance.setState({ tab: "SignIn" });
            expect(wrapper.find(SignIn).exists()).toBeTruthy();
        });
        it("can update credentials", () => {
            wrapper.find(SignIn).prop("onCredentials")("test-username", "test-password");
            expect(instance.state.username).toBe("test-username");
            expect(instance.state.password).toBe("test-password");
        });
        it("can show error message", () => {
            wrapper.find(SignIn).prop("onError")("test-error");
            expect(findFeedbackText(wrapper, "error").prop("text")).toBe("test-error");
        });
    });

    describe("SignUp", () => {
        const wrapper = shallowAppAuthenticator();
        const instance = wrapper.instance();
        beforeAll(() => instance.setState({
            tab: "SignUp",
            username: 'initial-username',
            password: 'initial-password',
            success: 'initial-success',
            error: '',
        }));

        it('it can be shown', () => {
            instance.setState({ tab: "" as any });
            expect(wrapper.find(SignUp).exists()).toBeFalsy();
            instance.setState({ tab: "SignUp" });
            expect(wrapper.find(SignUp).exists()).toBeTruthy();
        });
        it("can show success message", () => {
            wrapper.find(SignUp).invoke("onSuccess")("test-success");
            expect(instance.state.success).toBe("test-success");
            expect(findFeedbackText(wrapper, "success").prop("text")).toBe("test-success");
        });
        it("can show error message", () => {
            wrapper.find(SignUp).invoke("onError")("test-error");
            expect(findFeedbackText(wrapper, "error").prop("text")).toBe("test-error");
        });
        describe("on complete", () => {
            beforeAll(() => wrapper.find(SignUp).invoke('onComplete')(
                "test-onSignUpComplete", "test-onComplete-username", "test-onComplete-password"
            ));
            it("goes to Sign In", () => expect(instance.state.tab).toBe("SignIn"));
            it("sets success message", () => expect(instance.state.success).toBe("test-onSignUpComplete"));
            it("clears error message", () => expect(instance.state.error).toBeFalsy());
            it("sets username", () => expect(instance.state.username).toBe("test-onComplete-username"));
            it("sets password", () => expect(instance.state.password).toBe("test-onComplete-password"));
        });
    });

    describe("ForgotPassword", () => {
        const wrapper = shallowAppAuthenticator();
        const instance = wrapper.instance();
        beforeAll(() => instance.setState({
            username: 'initial-username',
            password: 'initial-password',
            success: 'initial-success',
            error: '',
        }));

        it('it can be shown', () => {
            instance.setState({ tab: "" as any });
            expect(wrapper.find(ForgotPassword).exists()).toBeFalsy();
            instance.setState({ tab: "Forgot" });
            expect(wrapper.find(ForgotPassword).exists()).toBeTruthy();
        });
        it("can show success message", () => {
            wrapper.find(ForgotPassword).invoke("onSuccess")("test-success");
            expect(instance.state.success).toBe("test-success");
            expect(findFeedbackText(wrapper, "success").prop("text")).toBe("test-success");
        });
        it("can show error message", () => {
            wrapper.find(ForgotPassword).invoke("onError")("test-error");
            expect(findFeedbackText(wrapper, "error").prop("text")).toBe("test-error");
        });
        describe("on complete", () => {
            beforeAll(() => wrapper.find(ForgotPassword).invoke('onComplete')(
                "test-onForgotPasswordComplete", "test-onComplete-username", "test-onComplete-password"
            ));
            it("goes to Sign In", () => expect(instance.state.tab).toBe("SignIn"));
            it("sets success message", () => expect(instance.state.success).toBe("test-onForgotPasswordComplete"));
            it("clears error message", () => expect(instance.state.error).toBeFalsy());
            it("sets username", () => expect(instance.state.username).toBe("test-onComplete-username"));
            it("sets password", () => expect(instance.state.password).toBe("test-onComplete-password"));
        });
    });

    describe("AmplifyAuthenticator", () => {
        const wrapper = shallowAppAuthenticator();
        const instance = wrapper.instance();
        it('it can be shown', () => {
            instance.setState({ tab: "" as any });
            expect(wrapper.find(AmplifyAuthenticator).exists()).toBeFalsy();
            instance.setState({ tab: "Amazon" });
            expect(wrapper.find(AmplifyAuthenticator).exists()).toBeTruthy();
        });
    });

});
