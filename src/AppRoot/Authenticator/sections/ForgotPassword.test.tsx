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

function inputUsername(wrapper: ForgotPasswordWrapper, username: string) {
    const onChangeText = getUsernameInput(wrapper).invoke("onChangeText");
    onChangeText && onChangeText(username);
}

const clickSubmit = (
    wrapper: ForgotPasswordWrapper,
    mock?: Parameters<typeof authApi.forgotPassword.mockImplementationOnce>[0]
) => {
    if (mock) authApi.forgotPassword.mockImplementationOnce(mock);
    getSubmitButton(wrapper).invoke("onClick")?.call(null);
}

//</editor-fold>

describe.only("ForgotPassword", () => {

    describe("mounting", () => {
        const wrapper = shallowForgotPassword();
        it("succeeds", () => expect(wrapper).toHaveLength(1));
    });

    describe("section 1", () => {
        const wrapper = shallowForgotPassword();
        it('is on section 1', () => expect(wrapper.state().enterCode).toBeFalsy());

        describe("input", () => {
            it("has username", () => expect(getUsernameInput(wrapper).exists()).toBeTruthy());
            it("doesn't have password", () => expect(getPasswordInput(wrapper).exists()).toBeFalsy());
            it("doesn't have password confirmation", () => expect(getPasswordConfirmationInput(wrapper).exists()).toBeFalsy());
            it("doesn't have verification code", () => expect(getVerificationCodeInput(wrapper).exists()).toBeFalsy());
            it("has submit button", () => expect(getSubmitButton(wrapper).exists()).toBeTruthy());
            it("has skip button", () => expect(getSkipButton(wrapper).exists()).toBeTruthy());
        });
        describe("username", () => {
            it("can be entered", () => {
                expect(getUsernameInput(wrapper).prop("value")).toBe("initial-username");
                inputUsername(wrapper, "test-username");
                expect(getUsernameInput(wrapper).prop("value")).toBe("test-username");
            });
            it("shows error if it isn't given", () => {
                inputUsername(wrapper, "");
                const validation = getUsernameValidation(wrapper);
                expect(validation.prop("visible")).toBe(true);
                expect(validation.prop("type")).toBe("standard");
                expect(validation.prop("text")).toBe("Username is required.");
            });
            it("shows error if it has spaces", () => {
                inputUsername(wrapper, "has space");
                const validation = getUsernameValidation(wrapper);
                expect(validation.prop("visible")).toBe(true);
                expect(validation.prop("type")).toBe("error");
                expect(validation.prop("text")).toBe("Username cannot contain spaces.");
            });
            it("shows error if it's too short", () => {
                inputUsername(wrapper, "a");
                const validation = getUsernameValidation(wrapper);
                expect(validation.prop("visible")).toBe(true);
                expect(validation.prop("type")).toBe("error");
                expect(validation.prop("text")).toBe(`Username must be at least ${usernameMinLength} characters.`);
            });
            it("shows no error if it's valid", () => {
                inputUsername(wrapper, "u".repeat(usernameMinLength));
                expect(getUsernameValidation(wrapper).prop("visible")).toBe(false);
            });
        });
        describe("submit", () => {
            const wrapper = shallowForgotPassword();
            it("is disabled if the form invalid", () => {
                inputUsername(wrapper, "");
                expect(getSubmitButton(wrapper).prop("disabled")).toBe(true);
            });
            it("can be pressed", () => {
                inputUsername(wrapper, "test-username");
                expect(getSubmitButton(wrapper).prop("disabled")).toBe(false);
            });
            describe('on click', () => {
                const wrapper = shallowForgotPassword({ username: "test-username" });
                const authSpy = jest.spyOn(authApi, "forgotPassword");
                const successSpy = jest.spyOn(wrapper.instance().props, "onSuccess");
                const errorSpy = jest.spyOn(wrapper.instance().props, "onError");
                beforeAll(() => clickSubmit(wrapper, AuthApi_forgotPassword.wait()));

                it("calls api", () => expect(authSpy).toHaveBeenCalledWith("test-username"));
                it("calls onSuccess to clear message", () => {
                    expect(successSpy).toHaveBeenCalledTimes(1);
                    expect(successSpy).toHaveBeenCalledWith('');
                });
                it("calls onError to clear message", () => {
                    expect(errorSpy).toHaveBeenCalledTimes(1);
                    expect(errorSpy).toHaveBeenCalledWith('');
                });
                it("shows progress bar", async () => {
                    expect(getProgressBar(wrapper).prop("visible")).toBeTruthy();
                });
                it('is still on section 1', () => {
                    expect(wrapper.state().enterCode).toBeFalsy()
                });
            });
            describe('on success', () => {
                const wrapper = shallowForgotPassword();
                const successSpy = jest.spyOn(wrapper.instance().props, "onSuccess");
                beforeAll(() => clickSubmit(wrapper, AuthApi_forgotPassword.success()));

                it("calls onSuccess with message", async () => {
                    expect(successSpy).toHaveBeenCalledTimes(2);
                    expect(successSpy).toHaveBeenCalledWith('Sending email.');
                });
                it("hides progress bar", async () => {
                    expect(getProgressBar(wrapper).prop("visible")).toBeFalsy();
                });
                it("goes to section 2", async () => {
                    expect(wrapper.state().enterCode).toBeTruthy();
                });
            });
            describe('on failure', () => {
                const wrapper = shallowForgotPassword();
                const errorSpy = jest.spyOn(wrapper.instance().props, "onError");
                beforeAll(() => {
                    clickSubmit(wrapper, AuthApi_forgotPassword.failure(new Error("mock-error")));
                });
                it("calls onError with message", () => {
                    expect(errorSpy).toHaveBeenCalledTimes(2);
                    expect(errorSpy).toHaveBeenCalledWith("mock-error");
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

        describe("input", () => {
            it.todo("has username");
            it.todo("has password");
            it.todo("has password confirmation");
            it.todo("has verification code");
            it.todo("has submit button");
            it.todo("doesn't have skip button");
        });
        describe("username", () => {
            it.todo("can be entered");
            it.todo("shows error if it isn't given");
            it.todo("shows error if it has spaces");
            it.todo("shows error if it's too short");
            it.todo("no error if it's valid");
        });
        describe("password", () => {
            it.todo("can be entered");
            it.todo("confirmation can be entered");
            it.todo("is hidden by default");
            it.todo("can be shown");
            it.todo("can be hidden");
            it.todo("shows error if it isn't given");
            it.todo("shows error if it has spaces");
            it.todo("shows error if it's too short");
            it.todo("no error if it's valid");
        });
        describe("verification code", () => {
            it.todo("can be entered");
            it.todo("shows error if it isn't given");
            it.todo("shows error if it's too short");
            it.todo("no error if it's valid");
        });

        describe("submit", () => {
            it.todo("is disabled if invalid username ");
            it.todo("is disabled if invalid password");
            it.todo("is disabled if invalid password confirmation");
            it.todo("is disabled if invalid verification code");
            it.todo("can be pressed");
            it.todo("calls api");
            it.todo("shows progress bar while processing");
            it.todo("calls onComplete on success");
            it.todo("calls onError on error");
            it.todo("hides progress bar when finished");
        });

    });

});
