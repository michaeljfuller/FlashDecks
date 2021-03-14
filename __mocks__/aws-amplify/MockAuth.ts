import type {AuthClass} from '@aws-amplify/auth/src/Auth';
import type {ISignUpResult} from "amazon-cognito-identity-js";
import type {PublicMembers} from "../../src/utils/class";
import type {ApiCognitoUser} from "../../src/models";

export class MockAuth implements PublicMembers<AuthClass> {
    changePassword = jest.fn();
    completeNewPassword = jest.fn();
    configure = jest.fn();
    confirmSignIn = jest.fn();
    confirmSignUp = jest.fn();
    currentAuthenticatedUser = jest.fn();
    currentCredentials = jest.fn();
    currentSession = jest.fn();
    currentUserCredentials = jest.fn();
    currentUserInfo = jest.fn();
    currentUserPoolUser = jest.fn();
    disableSMS = jest.fn();
    enableSMS = jest.fn();
    essentialCredentials = jest.fn();
    federatedSignIn = jest.fn();
    forgotPassword = jest.fn();
    forgotPasswordSubmit = jest.fn();
    getMFAOptions = jest.fn();
    getModuleName = jest.fn();
    getPreferredMFA = jest.fn();
    resendSignUp = jest.fn();
    sendCustomChallengeAnswer = jest.fn();
    setPreferredMFA = jest.fn();
    setupTOTP = jest.fn();
    signIn = jest.fn();
    signOut = jest.fn();
    signUp = jest.fn();
    updateUserAttributes = jest.fn();
    userAttributes = jest.fn();
    userSession = jest.fn();
    verifiedContact = jest.fn();
    verifyCurrentUserAttribute = jest.fn();
    verifyCurrentUserAttributeSubmit = jest.fn();
    verifyTotpToken = jest.fn();
    verifyUserAttribute = jest.fn();
    verifyUserAttributeSubmit = jest.fn();
}

function resolveUser<Key extends keyof AuthClass>() {
    return function(user: ApiCognitoUser): AuthClass[Key] {
        return (() => Promise.resolve(user)) as any;
    }
}
function resolveUndefined<Key extends keyof AuthClass>() {
    return function(): AuthClass[Key] {
        return (() => Promise.resolve(undefined)) as any;
    }
}
function rejectError<Key extends keyof AuthClass>() {
    return function(e: any): AuthClass[Key] {
        return (() => Promise.reject(e)) as any;
    }
}

export const AmplifyAuth_currentAuthenticatedUser = {
    signedIn: resolveUser<'currentAuthenticatedUser'>(),
    signedOut: resolveUndefined<'currentAuthenticatedUser'>(),
};
export const AmplifyAuth_signIn = {
    success: resolveUser<'signIn'>(),
    error: rejectError<'signIn'>(),
};
export const AmplifyAuth_signUp = {
    success: (result: ISignUpResult) => function() {
        return Promise.resolve(result);
    } as AuthClass['signUp'],
    error: rejectError<'signUp'>(),
};
export const AmplifyAuth_confirmSignUp = {
    success: resolveUndefined<'confirmSignUp'>(),
    error: rejectError<'confirmSignUp'>(),
};
export const AmplifyAuth_forgotPassword = {
    success: resolveUndefined<'forgotPassword'>(),
    error: rejectError<'forgotPassword'>(),
};
export const AmplifyAuth_forgotPasswordSubmit = {
    success: resolveUndefined<'forgotPasswordSubmit'>(),
    error: rejectError<'forgotPasswordSubmit'>(),
};
export const AmplifyAuth_signOut = {
    success: resolveUndefined<'signOut'>(),
    error: rejectError<'signOut'>(),
};
