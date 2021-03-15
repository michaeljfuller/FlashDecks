//<editor-fold desc="Mocks">

import {Auth as _Auth, Hub as _Hub} from "aws-amplify";
import {MockAuth, mockAuthMethods} from "../../__mocks__/aws-amplify/MockAuth";
import {MockHub, mockHubMethods} from "../../__mocks__/aws-amplify/MockHub";

jest.mock("aws-amplify");
const Auth: MockAuth = _Auth as any;
const Hub: MockHub = _Hub as any;

jest.mock("../utils/Logger");

//</editor-fold>
//<editor-fold desc="Imports">

import {ISignUpResult, CognitoUser, CognitoUserPool} from "amazon-cognito-identity-js";
import {AuthApi} from "./AuthApi";
import type {ApiCognitoUser} from "../models";
import {HubPayload} from "aws-amplify-react-native/types";
import {AuthEventType} from "./AuthApi.types";

//</editor-fold>
//<editor-fold desc="Helpers">

function createApiCognitoUser(
    username = "mock-username", email = "mock-email", sub = "mock-sub",
): ApiCognitoUser {
    return { username, attributes: { email, email_verified: !!email, sub } };
}
function createCognitoUser(username = "mock-username") {
    return new CognitoUser({
        Username: username,
        Pool: new CognitoUserPool({
            UserPoolId: "mock_cognito_user_pool_id",
            ClientId: "mock_client_id",
        }),
    });
}
function createSignUpResult (username = "mock-username", userSub = "mock-sub") {
    return { userSub, user: createCognitoUser(username) } as ISignUpResult;
}

function expectCognitoUserModel(target: any) {
    expect(target).toBeTruthy();
    return {
        toHave: (username: string, email: string, sub: string) => {
            expect(target?.username).toBe(username);
            expect(target?.email).toBe(email);
            expect(target?.sub).toBe(sub);
        },
    };
}

//</editor-fold>

describe("AuthApi", () => {

    describe("actions", () => {
        let api: AuthApi;
        beforeEach(() => api = new AuthApi());
        afterEach(() => Auth.mocks.mockResetAll());

        describe("#getUser", () => {

            it("Returns the user on success", async () => {
                const username = "test-username", sub = "test-sub", email = "test-email";
                Auth.currentAuthenticatedUser.mockImplementationOnce(
                    mockAuthMethods.currentAuthenticatedUser.signedIn(
                        createApiCognitoUser(username, email, sub)
                    )
                );
                const result = await api.getUser();
                expectCognitoUserModel(result).toHave(username, email, sub);
            });

            it("Returns nothing if not found", async () => {
                Auth.currentAuthenticatedUser.mockImplementationOnce(
                    mockAuthMethods.currentAuthenticatedUser.signedOut()
                );
                expect(await api.getUser()).toBeUndefined();
            });

        });
        describe("#signIn", () => {

            it("returns the user on success", async () => {
                const username = "test-username", sub = "test-sub", email = "test-email";
                Auth.signIn.mockImplementationOnce(
                    mockAuthMethods.signIn.success(
                        createApiCognitoUser(username, email, sub)
                    )
                );
                const result = await api.signIn("user", "pass").promise;
                expectCognitoUserModel(result).toHave(username, email, sub);
            });

            it("handles errors", async () => {
                const error = new Error("test-error");
                Auth.signIn.mockImplementationOnce(mockAuthMethods.signIn.error(error));
                await expect(
                    api.signIn("user", "pass").promise
                ).rejects.toThrow(error);
            });

        });
        describe("#signUp", () => {

            it("returns the user on success", async () => {
                const username = "test-username", sub = "test-sub", email = "test-email";
                Auth.signUp.mockImplementationOnce(
                    mockAuthMethods.signUp.success(
                        createSignUpResult(username, sub)
                    )
                );
                const result = await api.signUp("user", "pass", email).promise;
                expectCognitoUserModel(result).toHave(username, email, sub);
            });

            it("handles errors", async () => {
                const error = new Error("test-error");
                Auth.signUp.mockImplementationOnce(
                    mockAuthMethods.signUp.error(error)
                );
                await expect(
                    api.signUp("user", "pass", "email").promise
                ).rejects.toThrow(error);
            });

        });
        describe("#confirmSignUp", () => {

            it("can succeed", async () => {
                Auth.confirmSignUp.mockImplementationOnce(
                    mockAuthMethods.confirmSignUp.success()
                );
                await expect(
                    api.confirmSignUp("user", "code").promise
                ).resolves.toBeUndefined();
            });

            it("handles errors", async () => {
                const error = new Error("test-error");
                Auth.confirmSignUp.mockImplementationOnce(
                    mockAuthMethods.confirmSignUp.error(error)
                );
                await expect(
                    api.confirmSignUp("user", "code").promise
                ).rejects.toThrow(error);
            });

        });
        describe("#forgotPassword", () => {

            it("can succeed", async () => {
                Auth.forgotPassword.mockImplementationOnce(
                    mockAuthMethods.forgotPassword.success()
                );
                await expect(
                    api.forgotPassword("user").promise
                ).resolves.toBeUndefined();
            });

            it("handles errors", async () => {
                const error = new Error("test-error");
                Auth.forgotPassword.mockImplementationOnce(
                    mockAuthMethods.forgotPassword.error(error)
                );
                await expect(
                    api.forgotPassword("user").promise
                ).rejects.toThrow(error);
            });

        });
        describe("#forgotPasswordSubmit", () => {

            it("can succeed", async () => {
                Auth.forgotPasswordSubmit.mockImplementationOnce(
                    mockAuthMethods.forgotPasswordSubmit.success()
                );
                await expect(
                    api.forgotPasswordSubmit("user", "pass", "code").promise
                ).resolves.toBeUndefined();
            });

            it("handles errors", async () => {
                const error = new Error("test-error");
                Auth.forgotPasswordSubmit.mockImplementationOnce(
                    mockAuthMethods.forgotPasswordSubmit.error(error)
                );
                await expect(
                    api.forgotPasswordSubmit("user", "pass", "code").promise
                ).rejects.toThrow(error);
            });

        });
        describe("#signOut", () => {

            it("calls Auth.signOut", () => {
                api.signOut();
                expect(Auth.signOut).toBeCalledTimes(1);
            });

        });
    });

    describe("events", () => {
        let api: AuthApi;
        let promise: Promise<HubPayload>;
        let resolve: (payload: HubPayload) => void;
        beforeEach(() => {
            Hub.listen.mockImplementationOnce(
                mockHubMethods.listen.wait(
                    promise = new Promise(res => resolve = res)
                )
            );
            api = new AuthApi();
        });
        afterEach(() => Hub.mocks.mockResetAll());

        it("forwards events", async () => {
            const spy = jest.fn();
            const payload: HubPayload = { event: AuthEventType.CONFIGURED };
            api.onEvent.subscribe(spy);
            resolve(payload);
            await promise;
            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("forwards SignIn", async () => {
            const spy = jest.fn();
            api.onSignIn.subscribe(spy);
            resolve({ event: AuthEventType.SIGN_IN });
            await promise;
            expect(spy).toHaveBeenCalled();
        });

        it("forwards SignOut", async () => {
            const spy = jest.fn();
            api.onSignOut.subscribe(spy);
            resolve({ event: AuthEventType.SIGN_OUT });
            await promise;
            expect(spy).toHaveBeenCalled();
        });

    });
});
