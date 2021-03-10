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
import {asMockAuthApi, AuthApi_confirmSignUp, AuthApi_signUp} from "../../../api/__mocks__/AuthApi";
jest.mock( "../../../api/AuthApi");
const authApi = asMockAuthApi(_authApi);

//</editor-fold>
//<editor-fold desc="Imports">

import React from "react";
import {createRenderComponent, createTestHelpers} from "../../../../test/react-testing-library";
import {SignUp, SignUpProps, TestIDs} from "./SignUp";

//</editor-fold>
//<editor-fold desc="Helpers">

const render = createRenderComponent(SignUp, {
    onComplete: jest.fn(),
    onSuccess: jest.fn(),
    onError: jest.fn(),
});
const {get, query, expectHas, expectMissing, trigger, debug} = createTestHelpers(TestIDs);

const username = "test-username";
const password = "test-password";
const email = "test@email.abc";
const code = "0123456789";

//</editor-fold>

describe("SignUp", () => {
    describe("Sign-Up Form", () => {
        it("has the right title", () => {
            render();
            expect(get.Title()).toHaveTextContent("Register New Account");
        });

        describe("elements", () => {
            beforeEach(() => render());
            it("has username", () => expectHas.Username());
            it("has password input", () => expectHas.Password());
            it("has password toggle", () => expectHas.PasswordToggle());
            it("has password confirmation", () => expectHas.PasswordConfirmationInput());
            it("doesn't have password confirmation toggle", () => expect(query.PasswordConfirmation()?.querySelector('button')).toBeFalsy());
            it("has email", () => expectHas.Email());
            it("has submit button", () => expectHas.Submit());
            it("has skip button", () => expectHas.SkipButton());
            it("doesn't have verification code", () => expectMissing.VerificationCode());
        });

        describe("Username Field", () => {
            beforeEach(() => render());

            it("can be given input", () => {
                expect(get.Username()).not.toHaveValue();
                trigger.Username.input({value:"test-username"})
                expect(get.Username()).toHaveValue("test-username");
            });

            describe("Validation", () => {
                let validation: HTMLElement;
                beforeEach(() => {
                    validation = get.UsernameValidation();
                    trigger.PasswordInput.input(password);
                    trigger.PasswordConfirmationInput.input(password);
                    trigger.Email.input(email);
                    trigger.EmailConfirmation.input(email);
                });

                it("has no warning if valid", () => {
                    trigger.Username.input("test-username");
                    expect(validation).not.toBeVisible();
                    expect(get.Submit()).toBeEnabled();
                });
                it("has warning if not entered", () => {
                    expect(validation).toBeVisible();
                    expect(validation).toHaveTextContent("Username is required");
                    expect(get.Submit()).toBeDisabled();
                });
                it("has warning if not long enough", () => {
                    expect(usernameMinLength).toBeGreaterThan(1);
                    trigger.Username.input({value: "u".repeat(usernameMinLength-1)});
                    expect(validation).toBeVisible();
                    expect(validation).toHaveTextContent(`Username must be at least ${usernameMinLength} characters`);
                    expect(get.Submit()).toBeDisabled();
                });
                it("has warning if it has spaces", () => {
                    trigger.Username.input({value: "test username"});
                    expect(validation).toBeVisible();
                    expect(validation).toHaveTextContent(`Username cannot contain spaces`);
                    expect(get.Submit()).toBeDisabled();
                });
            });

        });

        describe("Password", () => {
            beforeEach(() => render());

            it("can be given input", () => {
                expect(get.PasswordInput()).not.toHaveValue();
                trigger.PasswordInput.input("test-Password");
                expect(get.PasswordInput()).toHaveValue("test-Password");
            });
            it("can be toggled", () => {
                expect(get.PasswordInput()).toHaveAttribute("type", "password");
                trigger.PasswordToggle.click();
                expect(get.PasswordInput()).toHaveAttribute("type", "text");
            });

            describe("Confirmation", () => {
                it("can be given input", () => {
                    expect(get.PasswordConfirmationInput()).not.toHaveValue();
                    trigger.PasswordConfirmationInput.input("test-PasswordConfirmation");
                    expect(get.PasswordConfirmationInput()).toHaveValue("test-PasswordConfirmation");
                });
                it("can be toggled", () => {
                    expect(get.PasswordConfirmationInput()).toHaveAttribute("type", "password");
                    trigger.PasswordToggle.click();
                    expect(get.PasswordConfirmationInput()).toHaveAttribute("type", "text");
                });
            });

            describe("Validation", () => {
                let validation: HTMLElement;
                beforeEach(() => {
                    validation = get.PasswordValidation();
                    trigger.Username.input(username);
                    trigger.Email.input(email);
                    trigger.EmailConfirmation.input(email);
                });

                it("has no warning if valid", () => {
                    trigger.PasswordInput.input({value: "test-password"});
                    trigger.PasswordConfirmationInput.input({value: "test-password"});
                    expect(validation).not.toBeVisible();
                    expect(get.Submit()).toBeEnabled();
                });

                it("has warning if not entered", () => {
                    expect(validation).toBeVisible();
                    expect(validation).toHaveTextContent("Password is required");
                    expect(get.Submit()).toBeDisabled();
                });
                it("has warning if not long enough", () => {
                    expect(passwordMinLength).toBeGreaterThan(1);
                    trigger.PasswordInput.input({value: "p".repeat(passwordMinLength-1)});
                    expect(validation).toBeVisible();
                    expect(validation).toHaveTextContent(`Password must be at least ${passwordMinLength} characters`);
                    expect(get.Submit()).toBeDisabled();
                });
                it("has warning if it has spaces", () => {
                    trigger.PasswordInput.input({value: "test password"});
                    expect(validation).toBeVisible();
                    expect(validation).toHaveTextContent(`Password cannot contain spaces`);
                    expect(get.Submit()).toBeDisabled();
                });
                it("has warning if confirmation not given", () => {
                    trigger.PasswordInput.input({value: "test-password"});
                    expect(validation).toBeVisible();
                    expect(validation).toHaveTextContent(`Password must be confirmed`);
                    expect(get.Submit()).toBeDisabled();
                });
                it("has warning if confirmation doesn't match", () => {
                    trigger.PasswordInput.input({value: "test-password"});
                    trigger.PasswordConfirmationInput.input({value: "test-password-confirm"});
                    expect(validation).toBeVisible();
                    expect(validation).toHaveTextContent(`Password does not match confirmation`);
                    expect(get.Submit()).toBeDisabled();
                });
            });

        });

        describe("Email", () => {
            beforeEach(() => render());

            it("can be given input", () => {
                expect(get.Email()).not.toHaveValue();
                trigger.Email.input("test-Email");
                expect(get.Email()).toHaveValue("test-Email");
            });
            it("can be given input into confirmation", () => {
                expect(get.EmailConfirmation()).not.toHaveValue();
                trigger.EmailConfirmation.input({value: "test-EmailConfirmation"});
                expect(get.EmailConfirmation()).toHaveValue("test-EmailConfirmation");
            });

            describe("Validation", () => {
                let validation: HTMLElement;
                beforeEach(() => {
                    validation = get.EmailValidation();
                    trigger.Username.input(username);
                    trigger.PasswordInput.input(password);
                    trigger.PasswordConfirmationInput.input(password);
                });

                it("has no warning if valid", () => {
                    trigger.Email.input({value: "test@email.abc"});
                    trigger.EmailConfirmation.input({value: "test@email.abc"});
                    expect(validation).not.toBeVisible();
                    expect(get.Submit()).toBeEnabled();
                });
                it("has warning if not entered", () => {
                    expect(validation).toBeVisible();
                    expect(validation).toHaveTextContent("Email is required");
                    expect(get.Submit()).toBeDisabled();
                });
                it("has warning if not valid", () => {
                    trigger.Email.input({value: "test-email"});
                    expect(validation).toBeVisible();
                    expect(validation).toHaveTextContent("Email isn't valid");
                    expect(get.Submit()).toBeDisabled();
                });
                it("has warning if confirmation not given", () => {
                    trigger.Email.input({value: "test@email.abc"});
                    expect(validation).toBeVisible();
                    expect(validation).toHaveTextContent(`Email must be confirmed`);
                    expect(get.Submit()).toBeDisabled();
                });
                it("has warning if confirmation doesn't match", () => {
                    trigger.Email.input({value: "test@email.abc"});
                    trigger.EmailConfirmation.input({value: "test@email-confirmation.abc"});
                    expect(validation).toBeVisible();
                    expect(validation).toHaveTextContent(`Email does not match confirmation`);
                    expect(get.Submit()).toBeDisabled();
                });
            });

        });

        describe("Submit Button", () => {
            beforeEach(() => render());
            it("is enabled with valid form", () => {
                trigger.Username.input({value: "test-username"});
                trigger.PasswordInput.input({value: "test-password"});
                trigger.PasswordConfirmationInput.input({value: "test-password"});
                trigger.Email.input({value: "test@email.abc"});
                trigger.EmailConfirmation.input({value: "test@email.abc"});
                expect(get.Submit()).not.toBeDisabled();
            });
        });

        describe("Request", () => {
            const onComplete = jest.fn(), onSuccess = jest.fn(), onError = jest.fn();
            beforeEach(() => {
                onComplete.mockReset();
                onSuccess.mockReset();
                onError.mockReset();
                render({ onComplete, onSuccess, onError });
                trigger.Username.input(username);
                trigger.PasswordInput.input(password);
                trigger.PasswordConfirmationInput.input(password);
                trigger.Email.input(email);
                trigger.EmailConfirmation.input(email);
            });

            describe("initiation", () => {
                beforeEach(() => {
                    authApi.signUp.mockImplementationOnce(AuthApi_signUp.wait());
                    trigger.Submit.click();
                });
                it("is triggered by SignUpForm.onSubmit", () => {
                    expect(authApi.signUp).toHaveBeenCalledTimes(1);
                    expect(authApi.signUp).toHaveBeenCalledWith(username, password, email);
                });
                it("disables form", () => {
                    expect(get.Username()).toBeDisabled();
                    expect(get.PasswordInput()).toBeDisabled();
                    expect(get.PasswordConfirmationInput()).toBeDisabled();
                    expect(get.Email()).toBeDisabled();
                    expect(get.EmailConfirmation()).toBeDisabled();
                    expect(get.Submit()).toBeDisabled();
                    expect(get.SkipButton()).toBeDisabled();
                });
                it("shows ProgressBar", () => expect(get.ProgressBar()).toBeVisible());
                it("clears success message", () => expect(onSuccess).toHaveBeenCalledWith(""));
                it("clears error message", () => expect(onError).toHaveBeenCalledWith(""));
            });
            describe("success", () => {
                beforeEach(() => {
                    authApi.signUp.mockImplementationOnce(AuthApi_signUp.success());
                    trigger.Submit.click();
                });
                it("triggers onSuccess", () => expect(onSuccess).toHaveBeenCalledWith(`Email sent to ${email}.`));
                it("goes to confirmation page", () => expect(get.Title()).toHaveTextContent("Enter Confirmation Code"));
                it("enables form", () => {
                    expect(get.Username()).toBeEnabled();
                    expect(get.VerificationCode()).toBeEnabled();
                });
                it("retains username", () => expect(get.Username()).toHaveValue(username));
                it("hides ProgressBar", () => expect(get.ProgressBar()).not.toBeVisible());
            });
            describe("failure", () => {
                beforeEach(() => {
                    authApi.signUp.mockImplementationOnce(AuthApi_signUp.failure("test-error"));
                    trigger.Submit.click();
                });
                it("triggers onError", () => expect(onError).toHaveBeenCalledWith("test-error"));
                it("enables SignUpForm", () => {
                    expect(get.Username()).toBeEnabled();
                    expect(get.PasswordInput()).toBeEnabled();
                    expect(get.PasswordConfirmationInput()).toBeEnabled();
                    expect(get.Email()).toBeEnabled();
                    expect(get.EmailConfirmation()).toBeEnabled();
                    expect(get.Submit()).toBeEnabled();
                    expect(get.SkipButton()).toBeEnabled();
                });
                it("hides ProgressBar", () => expect(get.ProgressBar()).not.toBeVisible());
            });

        }); // Request
    }); // Sign-Up Form

    describe("Sign-Up Confirmation", () => {
        function renderOnConfirmation(props?: Parameters<typeof render>[0], username?: string, code?: string) {
            render(props);
            trigger.SkipButton.click();
            if (username) trigger.Username.input(username);
            if (code) trigger.VerificationCode.input(code);
        }
        it("can be accessed via skip button", () => {
            render();
            trigger.SkipButton.click();
            expect(get.Title()).toHaveTextContent("Enter Confirmation Code");
        });

        describe("elements", () => {
            beforeEach(() => renderOnConfirmation());
            it("has username", () => expectHas.Username());
            it("doesn't have password", () => expectMissing.Password());
            it("doesn't has password confirmation", () => expectMissing.PasswordConfirmation());
            it("doesn't have email", () => expectMissing.Email());
            it("has submit button", () => expectHas.Submit());
            it("doesn't have skip button", () => expectMissing.SkipButton());
            it("has verification code", () => expectHas.VerificationCode());
        });

        describe("Username Field", () => {
            beforeEach(() => renderOnConfirmation());

            it("can be given input", () => {
                console.log("Initial Username");
                debug.get.Username();

                expect(get.Username()).not.toHaveValue();
                trigger.Username.input({value:"test-username"});

                console.log("Username after input");
                debug.get.Username();

                expect(get.Username()).toHaveValue("test-username");
            });

            describe("Validation", () => {
                let validation: HTMLElement;
                beforeEach(() => {
                    validation = get.UsernameValidation();
                    trigger.VerificationCode.input(code);
                });

                it("has no warning if valid", () => {
                    trigger.Username.input("test-username");
                    expect(validation).not.toBeVisible();
                    expect(get.Submit()).toBeEnabled();
                });
                it("has warning if not entered", () => {
                    expect(validation).toBeVisible();
                    expect(validation).toHaveTextContent("Username is required");
                    expect(get.Submit()).toBeDisabled();
                });
                it("has warning if not long enough", () => {
                    expect(usernameMinLength).toBeGreaterThan(1);
                    trigger.Username.input({value: "u".repeat(usernameMinLength-1)});
                    expect(validation).toBeVisible();
                    expect(validation).toHaveTextContent(`Username must be at least ${usernameMinLength} characters`);
                    expect(get.Submit()).toBeDisabled();
                });
                it("has warning if it has spaces", () => {
                    trigger.Username.input({value: "test username"});
                    expect(validation).toBeVisible();
                    expect(validation).toHaveTextContent(`Username cannot contain spaces`);
                    expect(get.Submit()).toBeDisabled();
                });
            });

        });

        describe("Verification Code Field", () => {
            beforeEach(() => renderOnConfirmation());

            it("can be given number input", () => {
                expect(get.VerificationCode()).toHaveAttribute("type", "number");
                expect(get.VerificationCode()).not.toHaveValue();
                trigger.VerificationCode.input({value:"1234"});
                expect(get.VerificationCode()).toHaveValue(1234);
            });

            describe("Validation", () => {
                let validation: HTMLElement;
                beforeEach(() => {
                    validation = get.VerificationCodeValidation();
                    trigger.Username.input(username);
                });

                it("has no warning if valid", () => {
                    trigger.VerificationCode.input(code);
                    expect(validation).not.toBeVisible();
                    expect(get.Submit()).toBeEnabled();
                });
                it("has warning if not entered", () => {
                    expect(validation).toBeVisible();
                    expect(validation).toHaveTextContent("Verification code is required");
                    expect(get.Submit()).toBeDisabled();
                });
                it("has warning if not long enough", () => {
                    expect(securityCodeMinLength).toBeGreaterThan(1);
                    trigger.VerificationCode.input({value: "0".repeat(securityCodeMinLength-1)});
                    expect(validation).toBeVisible();
                    expect(validation).toHaveTextContent(`Verification code must be at least ${securityCodeMinLength} characters`);
                    expect(get.Submit()).toBeDisabled();
                });
            });

        });

        describe("Request", () => {
            const onComplete = jest.fn(), onSuccess = jest.fn(), onError = jest.fn();
            beforeEach(() => {
                onComplete.mockReset();
                onSuccess.mockReset();
                onError.mockReset();
            });

            describe("initiation", () => {
                beforeEach(() => {
                    authApi.confirmSignUp.mockImplementationOnce(AuthApi_confirmSignUp.wait());
                    renderOnConfirmation({ onComplete, onSuccess, onError }, username, code);
                    trigger.Submit.click();
                });
                it("is triggered by SignUpForm.onSubmit", () => {
                    expect(authApi.confirmSignUp).toHaveBeenCalledTimes(1);
                    expect(authApi.confirmSignUp).toHaveBeenCalledWith(username, code);
                });
                it("disables form", () => {
                    expect(get.Username()).toBeDisabled();
                    expect(get.VerificationCode()).toBeDisabled();
                    expect(get.Submit()).toBeDisabled();
                });
                it("shows ProgressBar", () => expect(get.ProgressBar()).toBeVisible());
                it("clears success message", () => expect(onSuccess).toHaveBeenCalledWith(""));
                it("clears error message", () => expect(onError).toHaveBeenCalledWith(""));
            });

            describe("success", () => {
                beforeEach(() => {
                    authApi.confirmSignUp.mockImplementationOnce(AuthApi_confirmSignUp.success());
                    renderOnConfirmation({ onComplete, onSuccess, onError }, username, code);
                    trigger.Submit.click();
                });

                it("triggers onComplete", () => expect(onComplete).toHaveBeenCalledWith(`You can now sign in as ${username}.`, username, ""));
                it("enables form", () => {
                    expect(get.Username()).toBeEnabled();
                    expect(get.VerificationCode()).toBeEnabled();
                });
                it("hides ProgressBar", () => expect(get.ProgressBar()).not.toBeVisible());
            });
            describe("success without skipping", () => {
                beforeEach(() => {
                    authApi.signUp.mockImplementationOnce(AuthApi_signUp.success());
                    authApi.confirmSignUp.mockImplementationOnce(AuthApi_confirmSignUp.success());
                    render({ onComplete, onSuccess, onError });
                });
                beforeEach(() => { // SignUpForm
                    trigger.Username.input(username);
                    trigger.PasswordInput.input(password);
                    trigger.PasswordConfirmationInput.input(password);
                    trigger.Email.input(email);
                    trigger.EmailConfirmation.input(email);
                    trigger.Submit.click();
                });
                beforeEach(() => { // SignUpConfirmation
                    trigger.VerificationCode.input(code);
                    trigger.Submit.click();
                });

                it("triggers onComplete with password", () => expect(onComplete).toHaveBeenCalledWith(`You can now sign in as ${username}.`, username, password));
            });
            describe("failure", () => {
                beforeEach(() => {
                    authApi.confirmSignUp.mockImplementationOnce(AuthApi_confirmSignUp.failure("test-error"));
                    renderOnConfirmation({ onComplete, onSuccess, onError }, username, code);
                    trigger.Submit.click();
                });
                it("triggers onError", () => expect(onError).toHaveBeenCalledWith("test-error"));
                it("enables form", () => {
                    expect(get.Username()).toBeEnabled();
                    expect(get.VerificationCode()).toBeEnabled();
                });
                it("hides ProgressBar", () => expect(get.ProgressBar()).not.toBeVisible());
            });
        });

    });
});
