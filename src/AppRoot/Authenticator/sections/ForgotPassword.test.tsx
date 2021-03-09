//<editor-fold desc="Mocks">

import {
    usernameMinLength,
    passwordMinLength,
    securityCodeMinLength
} from "../../../api/validation/authValidation.values";
jest.mock("../../../api/validation/authValidation.values", () => ({
    usernameMinLength: 2,
    passwordMinLength: 2,
    securityCodeMinLength: 2,
}));

import _authApi from "../../../api/AuthApi";
import {asMockAuthApi, AuthApi_forgotPassword, AuthApi_forgotPasswordSubmit} from "../../../api/__mocks__/AuthApi";
jest.mock( "../../../api/AuthApi");
const authApi = asMockAuthApi(_authApi);

//</editor-fold>
//<editor-fold desc="Dependencies">

import React from "react";
import {configureEnzyme, shallow} from "../../../../test/Enzyme";
import {ForgotPassword, ForgotPasswordProps} from "./ForgotPassword";
import {FormTextInput, FormTextInputProps} from "../../../components/ui/form/FormTextInput";
import {ShallowWrapper} from "enzyme";
import {FormPasswordInput, FormPasswordInputProps} from "../../../components/ui/form/FormPasswordInput";
import Button, {ButtonProps} from "../../../components/button/Button";
import {FormValidationText, ValidationTextProps} from "../../../components/ui/form/FormValidationText";
import ProgressBar, {ProgressBarProps} from "../../../components/progress/ProgressBar";

//</editor-fold>

configureEnzyme();

//<editor-fold desc="Helpers">

const shallowForgotPassword = (props?: Partial<ForgotPasswordProps>) => {
    const {
        username = "initial-username",
        onSuccess = jest.fn().mockName("onSuccess"),
        onComplete = jest.fn().mockName("onComplete"),
        onError = jest.fn().mockName("onError"),
    } = props || {};
    return shallow<ForgotPassword>(
        <ForgotPassword {...{username, onSuccess, onError, onComplete} as ForgotPasswordProps} />
    );
}
type ForgotPasswordWrapper = ReturnType<typeof shallowForgotPassword>;

function getUsernameInput(wrapper: ForgotPasswordWrapper): ShallowWrapper<FormTextInputProps> {
    return wrapper.findWhere(
        child => child.is(FormTextInput) && child.prop("textContentType") === "username"
    );
}
function getUsernameValidation(wrapper: ForgotPasswordWrapper): ShallowWrapper<ValidationTextProps> {
    return wrapper.find(FormValidationText).at(0);
}
function getPasswordInput(wrapper: ForgotPasswordWrapper): ShallowWrapper<FormPasswordInputProps> {
    return wrapper.find(FormPasswordInput).at(0);
}
function getPasswordConfirmationInput(wrapper: ForgotPasswordWrapper): ShallowWrapper<FormPasswordInputProps> {
    return wrapper.find(FormPasswordInput).at(1);
}
function getPasswordValidation(wrapper: ForgotPasswordWrapper): ShallowWrapper<ValidationTextProps> {
    return wrapper.find(FormValidationText).at(1);
}
function getVerificationCodeInput(wrapper: ForgotPasswordWrapper): ShallowWrapper<FormTextInputProps> {
    return wrapper.findWhere(
        child => child.is(FormTextInput) && child.prop("textContentType") === "oneTimeCode"
    );
}
function getVerificationCodeValidation(wrapper: ForgotPasswordWrapper): ShallowWrapper<ValidationTextProps> {
    return wrapper.find(FormValidationText).at(2);
}
function getSubmitButton(wrapper: ForgotPasswordWrapper): ShallowWrapper<ButtonProps> {
    return wrapper.findWhere(child => child.is(Button) && child.prop("title") === "Submit");
}
function getSkipButton(wrapper: ForgotPasswordWrapper): ShallowWrapper<ButtonProps> {
    return wrapper.findWhere(child => child.is(Button) && child.prop("title") === "Enter Code");
}
function getProgressBar(wrapper: ForgotPasswordWrapper): ShallowWrapper<ProgressBarProps> {
    return wrapper.find(ProgressBar);
}

function inputUsername(wrapper: ForgotPasswordWrapper, value: string) {
    const onChangeText = getUsernameInput(wrapper).invoke("onChangeText");
    onChangeText && onChangeText(value);
}
function inputPassword(wrapper: ForgotPasswordWrapper, value: string) {
    const onChangeText = getPasswordInput(wrapper).invoke("onChangeText");
    onChangeText && onChangeText(value);
}
function inputPasswordConfirmation(wrapper: ForgotPasswordWrapper, value: string) {
    const onChangeText = getPasswordConfirmationInput(wrapper).invoke("onChangeText");
    onChangeText && onChangeText(value);
}
function inputVerificationCode(wrapper: ForgotPasswordWrapper, value: string) {
    const onChangeText = getVerificationCodeInput(wrapper).invoke("onChangeText");
    onChangeText && onChangeText(value);
}

const clickSubmitForgotPassword = (
    wrapper: ForgotPasswordWrapper,
    mock?: Parameters<typeof authApi.forgotPassword.mockImplementationOnce>[0]
) => {
    if (mock) authApi.forgotPassword.mockImplementationOnce(mock);
    getSubmitButton(wrapper).invoke("onClick")?.call(null);
}
const clickSubmitNewPassword = (
    wrapper: ForgotPasswordWrapper,
    mock?: Parameters<typeof authApi.forgotPasswordSubmit.mockImplementationOnce>[0]
) => {
    if (mock) authApi.forgotPasswordSubmit.mockImplementationOnce(mock);
    getSubmitButton(wrapper).invoke("onClick")?.call(null);
}

function testInput(
    name: string,
    valueGetter: () => string|undefined,
    valueSetter: (value: string) => void,
    validationGetter: () => ShallowWrapper<ValidationTextProps>,
    validations: Array<{
        description: string;
        value: string;
        before?: () => void;
        type?: ValidationTextProps['type'];
        text: ValidationTextProps['text']|null;
    }>,
    others?: () => void
) {
    describe(name, () => {
        it("can be entered", () => {
            valueSetter("test-input-"+name);
            expect(valueGetter()).toBe("test-input-"+name);
        });
        if (others) others();
        validations.forEach((valid) => it(valid.description, () => {
            valid.before?.call(null);
            valueSetter(valid.value);
            const validation = validationGetter();
            expect(validation.prop("visible")).toBe(!!valid.text);
            if (valid.text) expect(validation.prop("type")).toBe(valid.type || "error");
            if (valid.text) expect(validation.prop("text")).toBe(valid.text);
        }));
    });
}

//</editor-fold>

describe("ForgotPassword", () => {

    describe("mounting", () => {
        const wrapper = shallowForgotPassword();
        it("succeeds", () => expect(wrapper).toHaveLength(1));
    });

    describe("section 1", () => {
        const wrapper = shallowForgotPassword();
        it('starts on section 1', () => expect(wrapper.state().enterCode).toBeFalsy());
        describe("input", () => {
            it("has username", () => expect(getUsernameInput(wrapper).exists()).toBeTruthy());
            it("doesn't have password", () => expect(getPasswordInput(wrapper).exists()).toBeFalsy());
            it("doesn't have password confirmation", () => expect(getPasswordConfirmationInput(wrapper).exists()).toBeFalsy());
            it("doesn't have verification code", () => expect(getVerificationCodeInput(wrapper).exists()).toBeFalsy());
            it("has submit button", () => expect(getSubmitButton(wrapper).exists()).toBeTruthy());
            it("has skip button", () => expect(getSkipButton(wrapper).exists()).toBeTruthy());
        });
        testInput("username",
            () => getUsernameInput(wrapper).prop("value"),
            (str) => inputUsername(wrapper, str),
            () => getUsernameValidation(wrapper),
            [
                {
                    description: "shows error if it isn't given",
                    value: "",
                    type: "standard",
                    text: "Username is required.",
                },{
                    description: "shows error if it has spaces",
                    value: "has space",
                    text: "Username cannot contain spaces.",
                },{
                    description: "shows error if it's too short",
                    value: "a",
                    text: `Username must be at least ${usernameMinLength} characters.`,
                },{
                    description: "shows no error if it's valid",
                    value: "u".repeat(usernameMinLength),
                    text: null,
                }
            ]
        );
        describe("submit", () => {
            const wrapper = shallowForgotPassword();
            it("is disabled if the form invalid", () => {
                inputUsername(wrapper, "");
                expect(getSubmitButton(wrapper).prop("disabled")).toBe(true);
            });
            it("is enabled if the form is valid", () => {
                inputUsername(wrapper, "test-username");
                expect(getSubmitButton(wrapper).prop("disabled")).toBe(false);
            });
            describe('on click', () => {
                const wrapper = shallowForgotPassword({ username: "test-username" });
                const authSpy = jest.spyOn(authApi, "forgotPassword");
                const successSpy = jest.spyOn(wrapper.instance().props, "onSuccess");
                const errorSpy = jest.spyOn(wrapper.instance().props, "onError");
                beforeAll(() => clickSubmitForgotPassword(wrapper, AuthApi_forgotPassword.wait()));

                it("calls api", () => expect(authSpy).toHaveBeenCalledWith("test-username"));
                it("calls onSuccess to clear message", () => {
                    expect(successSpy).toHaveBeenCalledWith('');
                });
                it("calls onError to clear message", () => {
                    expect(errorSpy).toHaveBeenCalledWith('');
                });
                it("shows progress bar", () => {
                    expect(getProgressBar(wrapper).prop("visible")).toBeTruthy();
                });
                it('is still on section 1', () => {
                    expect(wrapper.state().enterCode).toBeFalsy()
                });
            });
            describe('on success', () => {
                const wrapper = shallowForgotPassword();
                const successSpy = jest.spyOn(wrapper.instance().props, "onSuccess");
                beforeAll(() => clickSubmitForgotPassword(wrapper, AuthApi_forgotPassword.success()));

                it("calls onSuccess with message", () => {
                    expect(successSpy).toHaveBeenCalledWith('Sending email.');
                });
                it("hides progress bar", () => {
                    expect(getProgressBar(wrapper).prop("visible")).toBeFalsy();
                });
                it("goes to section 2", () => {
                    expect(wrapper.state().enterCode).toBeTruthy();
                });
            });
            describe('on failure', () => {
                const wrapper = shallowForgotPassword();
                const errorSpy = jest.spyOn(wrapper.instance().props, "onError");
                beforeAll(() => {
                    clickSubmitForgotPassword(wrapper, AuthApi_forgotPassword.failure(new Error("test-error")));
                });
                it("calls onError with message", () => {
                    expect(errorSpy).toHaveBeenCalledWith("test-error");
                });
                it("hides progress bar", () => {
                    expect(getProgressBar(wrapper).prop("visible")).toBeFalsy();
                });
                it("doesn't go to section 2", () => {
                    expect(wrapper.state().enterCode).toBe(false);
                });
            });

        });
        describe("skip", () => {
            const wrapper = shallowForgotPassword();
            beforeAll(() => getSkipButton(wrapper).invoke("onClick")?.call(null));
            it("goes to section 2", () => {
                expect(wrapper.state().enterCode).toBe(true);
            });
        });
    });

    describe("section 2", () => {

        const wrapper = shallowForgotPassword();
        beforeEach(() => wrapper.setState({ enterCode: true }));

        describe("input", () => {
            it("has username", () => expect(getUsernameInput(wrapper).exists()).toBeTruthy());
            it("has password", () => expect(getPasswordInput(wrapper).exists()).toBeTruthy());
            it("has password confirmation", () => expect(getPasswordConfirmationInput(wrapper).exists()).toBeTruthy());
            it("has verification code", () => expect(getVerificationCodeInput(wrapper).exists()).toBeTruthy());
            it("has submit button", () => expect(getSubmitButton(wrapper).exists()).toBeTruthy());
            it("doesn't have skip button", () => expect(getSkipButton(wrapper).exists()).toBeFalsy());
        });
        testInput(
            "username",
            () => getUsernameInput(wrapper).prop("value"),
            (value) => inputUsername(wrapper, value),
            () => getUsernameValidation(wrapper),
            [
                {
                    description: "shows error if it isn't given",
                    value: "",
                    type: "standard",
                    text: "Username is required.",
                },{
                    description: "shows error if it has spaces",
                    value: "has space",
                    text: "Username cannot contain spaces.",
                },{
                    description: "shows error if it's too short",
                    value: "u".repeat(usernameMinLength-1),
                    text: `Username must be at least ${usernameMinLength} characters.`,
                },{
                    description: "shows no error if it's valid",
                    value: "u".repeat(usernameMinLength),
                    text: null,
                }
            ]
        );
        testInput("password",
            () => getPasswordInput(wrapper).prop("value"),
            (value) => inputPassword(wrapper, value),
            () => getPasswordValidation(wrapper),
            [
                {
                    description: "shows error if it isn't given",
                    value: "",
                    type: "standard",
                    text: "Password is required.",
                },{
                    description: "shows error if it has spaces",
                    value: "has space",
                    text: "Password cannot contain spaces.",
                },{
                    description: "shows error if it's too short",
                    value: "p".repeat(passwordMinLength-1),
                    text: `Password must be at least ${passwordMinLength} characters.`,
                },{
                    description: "shows error if no confirmation",
                    value: "p".repeat(passwordMinLength),
                    text: "Password must be confirmed.",
                    type: "standard",
                }
            ],
            () => {
                it("is hidden by default", () => {
                    expect(getPasswordInput(wrapper).prop("showPassword")).toBe(false);
                });
                it("has toggle show button", () => {
                    expect(typeof getPasswordInput(wrapper).prop("toggleShowPassword")).toBe("function");
                });
                it("can toggle show", () => {
                    getPasswordInput(wrapper).invoke("toggleShowPassword")?.call(null);
                    expect(getPasswordInput(wrapper).prop("showPassword")).toBe(true);
                    getPasswordInput(wrapper).invoke("toggleShowPassword")?.call(null);
                    expect(getPasswordInput(wrapper).prop("showPassword")).toBe(false);
                });
            }
        );
        testInput("password confirmation",
            () => getPasswordConfirmationInput(wrapper).prop("value"),
            (value) => inputPasswordConfirmation(wrapper, value),
            () => getPasswordValidation(wrapper),
            [
                {
                    description: "shows error if confirmation doesn't match",
                    before: () => inputPassword(wrapper, "p".repeat(passwordMinLength)),
                    value: "test-password-confirmation",
                    text: "Password does not match confirmation.",
                },{
                    description: "shows no error if valid",
                    before: () => inputPassword(wrapper, "p".repeat(passwordMinLength)),
                    value: "p".repeat(passwordMinLength),
                    text: null,
                }
            ],
            () => {
                it("is hidden by default", () => {
                    expect(getPasswordConfirmationInput(wrapper).prop("showPassword")).toBe(false);
                });
                it("doesn't have toggle show button", () => {
                    expect(typeof getPasswordConfirmationInput(wrapper).prop("toggleShowPassword")).toBe("undefined");
                });
                it("can toggle show", () => {
                    getPasswordInput(wrapper).invoke("toggleShowPassword")?.call(null);
                    expect(getPasswordConfirmationInput(wrapper).prop("showPassword")).toBe(true);
                    getPasswordInput(wrapper).invoke("toggleShowPassword")?.call(null);
                    expect(getPasswordConfirmationInput(wrapper).prop("showPassword")).toBe(false);
                });
            }
        );
        testInput(
            "verification code",
            () => getVerificationCodeInput(wrapper).prop("value"),
            (value) => inputVerificationCode(wrapper, value),
            () => getVerificationCodeValidation(wrapper),
            [
                {
                    description: "shows error if it isn't given",
                    value: "",
                    type: "standard",
                    text: "Verification code is required.",
                },{
                    description: "shows error if it's too short",
                    value: "v".repeat(securityCodeMinLength-1),
                    text: `Verification code must be at least ${securityCodeMinLength} characters.`,
                },{
                    description: "shows no error if it's valid",
                    value: "v".repeat(securityCodeMinLength),
                    text: null,
                }
            ],
        );

        describe("submit", () => {

            describe("button", () => {
                const wrapper = shallowForgotPassword();
                beforeAll(() => wrapper.setState({ enterCode: true }));
                beforeEach(() => {
                    inputUsername(wrapper,"test-username");
                    inputPassword(wrapper, "test-password");
                    inputPasswordConfirmation(wrapper, "test-password");
                    inputVerificationCode(wrapper, "test-code");
                })
                it("is enabled if the form is valid", () => {
                    expect(getSubmitButton(wrapper).prop("disabled")).toBe(false);
                });
                it("is disabled if invalid username", () => {
                    inputUsername(wrapper,"");
                    expect(getSubmitButton(wrapper).prop("disabled")).toBe(true);
                });
                it("is disabled if invalid password", () => {
                    inputPassword(wrapper,"");
                    expect(getSubmitButton(wrapper).prop("disabled")).toBe(true);
                });
                it("is disabled if invalid password confirmation", () => {
                    inputPasswordConfirmation(wrapper,"");
                    expect(getSubmitButton(wrapper).prop("disabled")).toBe(true);
                });
                it("is disabled if invalid verification code", () => {
                    inputVerificationCode(wrapper,"");
                    expect(getSubmitButton(wrapper).prop("disabled")).toBe(true);
                });
            });
            describe('on click', () => {
                const wrapper = shallowForgotPassword();
                const authSpy = jest.spyOn(authApi, "forgotPasswordSubmit");
                const successSpy = jest.spyOn(wrapper.instance().props, "onSuccess");
                const errorSpy = jest.spyOn(wrapper.instance().props, "onError");
                beforeAll(() => {
                    wrapper.setState({ enterCode: true });
                    inputUsername(wrapper,"test-username");
                    inputPassword(wrapper, "test-password");
                    inputPasswordConfirmation(wrapper, "test-password");
                    inputVerificationCode(wrapper, "test-code");
                    successSpy.mockReset();
                    errorSpy.mockReset();
                    clickSubmitNewPassword(wrapper, AuthApi_forgotPasswordSubmit.wait());
                });

                it("calls api", () => expect(authSpy).toHaveBeenCalledWith(
                    "test-username", "test-password", "test-code",
                ));
                it("calls onSuccess to clear message", () => {
                    expect(successSpy).toHaveBeenCalledTimes(1);
                    expect(successSpy).toHaveBeenCalledWith('');
                });
                it("calls onError to clear message", () => {
                    expect(errorSpy).toHaveBeenCalledTimes(1);
                    expect(errorSpy).toHaveBeenCalledWith('');
                });
                it("shows progress bar", () => {
                    expect(getProgressBar(wrapper).prop("visible")).toBeTruthy();
                });
                it('is still on section 2', () => expect(wrapper.state().enterCode).toBeTruthy());
            });

            describe("on success", () => {
                const wrapper = shallowForgotPassword();
                const completeSpy = jest.spyOn(wrapper.instance().props, "onComplete");
                beforeAll(() => {
                    wrapper.setState({ enterCode: true });
                    inputUsername(wrapper,"test-username");
                    inputPassword(wrapper, "test-password");
                    inputPasswordConfirmation(wrapper, "test-password");
                    inputVerificationCode(wrapper, "test-code");
                    completeSpy.mockReset();
                    clickSubmitNewPassword(wrapper, AuthApi_forgotPasswordSubmit.success());
                });

                it("calls onComplete", () => {
                    expect(completeSpy).toHaveBeenCalledWith(
                        "Password updated for test-username.", "test-username", "test-password",
                    );
                });
                it("hides progress bar", () => {
                    expect(getProgressBar(wrapper).prop("visible")).toBeFalsy();
                });
            });

            describe("on failure", () => {
                const wrapper = shallowForgotPassword();
                const errorSpy = jest.spyOn(wrapper.instance().props, "onError");
                const completeSpy = jest.spyOn(wrapper.instance().props, "onComplete");
                beforeAll(() => {
                    wrapper.setState({ enterCode: true });
                    inputUsername(wrapper,"test-username");
                    inputPassword(wrapper, "test-password");
                    inputPasswordConfirmation(wrapper, "test-password");
                    inputVerificationCode(wrapper, "test-code");
                    errorSpy.mockReset();
                    clickSubmitNewPassword(wrapper, AuthApi_forgotPasswordSubmit.failure("test-error"));
                });

                it("calls onError with message", () => {
                    expect(errorSpy).toHaveBeenCalledWith("test-error");
                });
                it("hides progress bar", () => {
                    expect(getProgressBar(wrapper).prop("visible")).toBeFalsy();
                });
                it("doesn't call completeSpy", () => {
                    expect(completeSpy).not.toHaveBeenCalled();
                });

            });
        });

    });

});
