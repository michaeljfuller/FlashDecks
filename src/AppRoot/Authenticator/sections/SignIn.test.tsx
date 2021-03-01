import _authApi from "../../../api/AuthApi";
import {asMockAuthApi, AuthApi_signIn} from "../../../api/__mocks__/AuthApi";
jest.mock( "../../../api/AuthApi");
const authApi = asMockAuthApi(_authApi);

import React from "react";
import {act} from '@testing-library/react';
import {waitFor} from "@testing-library/react-native";
import {SignIn, TestIDs} from "./SignIn";
import {createRenderComponent, createTestIdHelpers} from "../../../../test/react-testing-library";

const render = createRenderComponent(SignIn, {
    username: "initial-username",
    password: "initial-password",
    onCredentials: jest.fn(),
    onError: jest.fn(),
});
const testId = createTestIdHelpers(TestIDs);

describe("SignIn", () => {

    describe("Username", () => {
        it("can be passed", () => {
            const username = "test-username";
            render({ username });
            const field = testId.get.Username();
            expect(field?.getAttribute("value")).toBe(username);
        });
        it("triggers callback on change", () => {
            const onCredentials = jest.fn();
            render({ onCredentials, username: "", password: "" });
            const username = "input-username";
            testId.input.Username(username);
            expect(onCredentials).toHaveBeenLastCalledWith(username, "");
        });
    });

    describe("Password", () => {
        it("can be passed", () => {
            const password = "test-password";
            render({ password });
            expect(testId.get.PasswordInput()).toHaveValue(password);
        });
        it("triggers callback on change", () => {
            const onCredentials = jest.fn();
            render({ onCredentials, username: "", password: "" });
            const password = "input-password";
            testId.input.PasswordInput(password);
            expect(onCredentials).toHaveBeenLastCalledWith("", password);
        });
        it("is hidden by default", () => {
            render();
            const password = testId.get.PasswordInput();
            const toggle = testId.get.PasswordToggle();
            expect(password).toHaveAttribute("type", "password");
            expect(toggle).toHaveTextContent("show");
        });
        it("can toggle visibility", () => {
            render();
            const password = testId.get.PasswordInput();
            const toggle = testId.get.PasswordToggle();
            testId.click.PasswordToggle();
            expect(password).toHaveAttribute("type", "text");
            expect(toggle).toHaveTextContent("hide");
            testId.click.PasswordToggle();
            expect(password).toHaveAttribute("type", "password");
            expect(toggle).toHaveTextContent("show");
        });
    });

    describe("Submit", () => {
        it("is disabled if username isn't given", () => {
            render({username: "", password: "pass"});
            expect(testId.get.Submit()).toBeDisabled();
        });
        it("is disabled if password isn't given", () => {
            render({username: "user", password: ""});
            expect(testId.get.Submit()).toBeDisabled();
        });
        it("is enabled if username + password are give given", () => {
            render({username: "user", password: "pass"});
            expect(testId.get.Submit()).toBeEnabled();
        });
    });

    describe("Request", () => {

        it('is issued upon pressing Submit', () => {
            const username = "test-username", password = "test-password";
            render({username, password});
            authApi.signIn.mockImplementationOnce(AuthApi_signIn.wait());
            testId.click.Submit();
            expect(authApi.signIn).toHaveBeenCalledTimes(1);
            expect(authApi.signIn).toHaveBeenLastCalledWith(username, password);
        });
        it("passes empty string to clear onError", () => {
            const onError = jest.fn();
            render({onError});
            authApi.signIn.mockImplementationOnce(AuthApi_signIn.wait());
            testId.click.Submit();
            expect(onError).toHaveBeenCalledTimes(1);
            expect(onError).toHaveBeenLastCalledWith("");
        });
        it("shows the progress bar", async () => {
            render();
            const progress = testId.get.ProgressBar();
            expect(progress).not.toBeVisible();
            testId.click.Submit();
            expect(progress).toBeVisible();
        });

        describe("error", () => {
            it("passes error to onError", async () => {
                const error = "test-error";
                const onError = jest.fn();
                render({ onError });
                authApi.signIn.mockImplementationOnce(AuthApi_signIn.failure(error));
                testId.click.Submit();
                await act(async () => {
                    await waitFor(() => onError.mock.calls.length > 1);
                });
                expect(onError).toHaveBeenLastCalledWith(error);
            });
            it("hides the progress bar", async () => {
                const error = "test-error";
                const onError = jest.fn();
                render({ onError });
                authApi.signIn.mockImplementationOnce(AuthApi_signIn.failure(error));
                testId.click.Submit();
                await act(async () => {
                    await waitFor(() => onError.mock.calls.length > 1).then(_ => null);
                });
                expect(testId.get.ProgressBar()).not.toBeVisible();
            });
            it("does nothing if demounted", async () => {
                const onError = jest.fn();
                const {unmount} = render({ onError });
                let reject: Function = null as any;
                const promise = new Promise<any>((_, _reject) => reject = _reject);
                authApi.signIn.mockImplementationOnce(AuthApi_signIn.wait(promise));
                testId.click.Submit();
                const initialCallCount = onError.mock.calls.length;
                unmount();
                reject('error');
                await promise.catch(_ => undefined);
                expect(onError).toHaveBeenCalledTimes(initialCallCount);
            });
        }); // error

    }); // Request

});
