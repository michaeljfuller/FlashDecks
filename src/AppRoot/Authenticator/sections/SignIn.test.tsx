import _authApi from "../../../api/AuthApi";
import {asMockAuthApi, AuthApi_signIn} from "../../../api/__mocks__/AuthApi";
jest.mock( "../../../api/AuthApi");
const authApi = asMockAuthApi(_authApi);

import React from "react";
import {render, fireEvent, act} from '@testing-library/react';
import {SignIn, SignInProps, TestIDs} from "./SignIn";
import {waitFor} from "@testing-library/react-native";

describe("SignIn", () => {

    describe("Username", () => {
        it("can be passed", () => {
            const username = "test-username";
            const field = getUsernameInput(renderSignIn({ username }))
            expect(field?.getAttribute("value")).toBe(username);
        });
        it("triggers callback on change", () => {
            const onCredentials = jest.fn();
            const signIn = renderSignIn({ onCredentials, username: "", password: "" });
            const username = "input-username";
            inputUsername(signIn, username);
            expect(onCredentials).toHaveBeenLastCalledWith(username, "");
        });
    });

    describe("Password", () => {
        it("can be passed", () => {
            const password = "test-password";
            const field = getPasswordInput(renderSignIn({ password }));
            expect(field?.getAttribute("value")).toBe(password);
        });
        it("triggers callback on change", () => {
            const onCredentials = jest.fn();
            const signIn = renderSignIn({ onCredentials, username: "", password: "" });
            const password = "input-password";
            inputPassword(signIn, password);
            expect(onCredentials).toHaveBeenLastCalledWith("", password);
        });
        it("is hidden by default", () => {
            const signIn = renderSignIn();
            const password = getPasswordInput(signIn);
            const toggle = getPasswordToggle(signIn);
            expect(password?.getAttribute("type")).toBe("password");
            expect(toggle).toBeDefined();
            expect(toggle?.textContent).toBe("show");
        });
        it("can toggle visibility", () => {
            const signIn = renderSignIn();
            const password = getPasswordInput(signIn);
            const toggle = getPasswordToggle(signIn);
            togglePassword(signIn);
            expect(password?.getAttribute("type")).toBe("text");
            expect(toggle?.textContent).toBe("hide");
            togglePassword(signIn);
            expect(password?.getAttribute("type")).toBe("password");
            expect(toggle?.textContent).toBe("show");
        });
    });

    describe("Submit", () => {
        it("exists", () => {
            expect(getSubmitButton()).toBeDefined();
        });
        it("is disabled if username isn't given", () => {
            const signIn = renderSignIn({username: "", password: "pass"});
            expect(getSubmitButton(signIn).hasAttribute("disabled")).toBe(true);
            // expect(getSubmitButton(signIn).getAttribute("disabled")).toBe("true");
        });
        it("is disabled if password isn't given", () => {
            const signIn = renderSignIn({username: "user", password: ""});
            expect(getSubmitButton(signIn).hasAttribute("disabled")).toBe(true);
            // expect(getSubmitButton(signIn).getAttribute("disabled")).toBe("true");
        });
        it("is enabled if username + password are give given", () => {
            const signIn = renderSignIn({username: "user", password: "pass"});
            expect(getSubmitButton(signIn).hasAttribute("disabled")).toBe(false);
            // expect(getSubmitButton(signIn).getAttribute("disabled")).toBe("false");
        });
    });

    describe("Request", () => {
        it('is issued upon pressing Submit', () => {
            const username = "test-username", password = "test-password";
            const signIn = renderSignIn({username, password});
            clickSubmit(signIn, AuthApi_signIn.wait());
            expect(authApi.signIn).toHaveBeenCalledTimes(1);
            expect(authApi.signIn).toHaveBeenLastCalledWith(username, password);
        });
        it("passes empty string to clear onError", () => {
            const onError = jest.fn();
            const signIn = renderSignIn({onError});
            clickSubmit(signIn, AuthApi_signIn.wait());
            expect(onError).toHaveBeenCalledTimes(1);
            expect(onError).toHaveBeenLastCalledWith("");
        });
        it("shows the progress bar", async () => {
            const signIn = renderSignIn();
            const progress = getProgressBar(signIn);
            expect(progress?.style.opacity).toBe("0");
            clickSubmit(signIn, AuthApi_signIn.wait());
            expect(progress?.style.opacity).not.toBe("0");
        });

        describe("error", () => {
            it("passes error to onError", () => act(async () => {
                const error = "test-error";
                const onError = jest.fn();
                const signIn = renderSignIn({ onError });
                clickSubmit(signIn, AuthApi_signIn.failure(error));
                await waitFor(() => onError.mock.calls.length > 1);
                expect(onError).toHaveBeenLastCalledWith(error);
            }));
            it("hides the progress bar", () => act(async () => {
                const error = "test-error";
                const onError = jest.fn();
                const signIn = renderSignIn({ onError });
                clickSubmit(signIn, AuthApi_signIn.failure(error));
                await waitFor(() => onError.mock.calls.length > 1);
                expect(getProgressBar(signIn)?.style.opacity).toBe("0");
            }));
            it("does nothing if demounted", () => act(async () => {
                const onError = jest.fn();
                const signIn = renderSignIn({ onError });
                let reject: Function = null as any;
                const promise = new Promise<any>((_, _reject) => reject = _reject);
                clickSubmit(signIn, AuthApi_signIn.wait(promise));
                const initialCallCount = onError.mock.calls.length;
                signIn.unmount();
                await waitFor(() => signIn.container.childNodes.length === 0);
                reject('error');
                await promise.catch(_ => undefined);
                expect(onError).toHaveBeenCalledTimes(initialCallCount);
            }));
        }); // error

    }); // Request

});

//<editor-fold desc="Helpers">

function renderSignIn(props: Partial<SignInProps> = {}) {
    const {
        username = "initial-username",
        password = "initial-password",
        onCredentials = jest.fn(),
        onError = jest.fn(),
    } = props;
    return render(<SignIn {...{username, password, onCredentials, onError} as SignInProps} />);
}
type SignInWrapper = ReturnType<typeof renderSignIn>;

function getUsernameInput(wrapper = renderSignIn()) {
    return wrapper.getByTestId(TestIDs.Username);
}
function getPasswordInput(wrapper = renderSignIn()) {
    return wrapper.getByTestId(TestIDs.Password).querySelector("input");
}
function getPasswordToggle(wrapper = renderSignIn()) {
    return wrapper.getByTestId(TestIDs.Password).querySelector("button");
}
function getSubmitButton(wrapper = renderSignIn()) {
    return wrapper.getByTestId(TestIDs.Submit);
}
function getProgressBar(wrapper = renderSignIn()) {
    return wrapper.getByTestId(TestIDs.ProgressBar);
}

function inputUsername(wrapper: SignInWrapper, value: string) {
    const field = getUsernameInput(wrapper);
    if (!field) {
        wrapper.debug();
        throw new Error('Username field not found.');
    }
    return fireEvent.input(field, { target: { value }});
}
function inputPassword(wrapper: SignInWrapper, value: string) {
    const field = getPasswordInput(wrapper);
    if (!field) {
        wrapper.debug();
        throw new Error('Password field not found.');
    }
    return fireEvent.input(field, { target: { value }});
}
function togglePassword(wrapper: SignInWrapper) {
    const button = getPasswordToggle(wrapper);
    if (!button) {
        wrapper.debug();
        throw new Error('Password toggle button not found.');
    }
    return fireEvent.click(button);
}
function clickSubmit(
    wrapper: SignInWrapper,
    mock?: Parameters<typeof authApi.signIn.mockImplementationOnce>[0]
) {
    if (mock) authApi.signIn.mockImplementationOnce(mock);
    const button = getSubmitButton(wrapper);
    if (!button) throw new Error('Submit button not found.');
    return fireEvent.click(button);
}

//</editor-fold>
