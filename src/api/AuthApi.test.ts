//<editor-fold desc="Mocks">

import {Auth as _Auth, Hub as _Hub} from "aws-amplify";
import {
    MockAuth,
    AmplifyAuth_currentAuthenticatedUser,
} from "../../__mocks__/aws-amplify/MockAuth";
import {MockHub} from "../../__mocks__/aws-amplify/MockHub";

jest.mock("aws-amplify");
const Auth: MockAuth = _Auth as any;
const Hub: MockHub = _Hub as any;

//</editor-fold>
//<editor-fold desc="Imports">

import {AuthApi} from "./AuthApi";
import type {ApiCognitoUser} from "../models";

//</editor-fold>
//<editor-fold desc="Helpers">

function createCognitoUser(
    username = "mock-username", email = "mock-email", sub = "mock-sub",
): ApiCognitoUser {
    return { username, attributes: { email, email_verified: !!email, sub } };
}

//</editor-fold>

describe("AuthApi", () => {
    let api: AuthApi;
    beforeEach(() => api = new AuthApi());

    describe("getUser", () => {
        afterEach(() => Auth.currentAuthenticatedUser.mockReset());

        it("Returns the requested user", async () => {
            Auth.currentAuthenticatedUser.mockImplementationOnce(
                AmplifyAuth_currentAuthenticatedUser.signedIn(createCognitoUser(
                    "test-user", "test-email", "test-sub"
                ))
            );
            const result = await api.getUser();
            expect(result).toBeTruthy();
            expect(result?.username).toBe("test-user");
            expect(result?.email).toBe("test-email");
            expect(result?.sub).toBe("test-sub");
        });

        it("Returns nothing if not found", async () => {
            Auth.currentAuthenticatedUser.mockImplementationOnce(
                AmplifyAuth_currentAuthenticatedUser.signedOut()
            );
            expect(await api.getUser()).toBeUndefined()
        });

    });
    describe("signIn", () => {
        afterEach(() => Auth.signIn.mockReset());
        it.todo("");
    });
    describe("signUp", () => {
        afterEach(() => Auth.signUp.mockReset());
        it.todo("");
    });
    describe("confirmSignUp", () => {
        afterEach(() => Auth.confirmSignUp.mockReset());
        it.todo("");
    });
    describe("forgotPassword", () => {
        afterEach(() => Auth.forgotPassword.mockReset());
        it.todo("");
    });
    describe("forgotPasswordSubmit", () => {
        afterEach(() => Auth.forgotPasswordSubmit.mockReset());
        it.todo("");
    });
    describe("signOut", () => {
        afterEach(() => Auth.signOut.mockReset());
        it.todo("");
    });
    describe("events", () => {
        afterEach(() => Hub.listen);
        it.todo("");
    });
});
