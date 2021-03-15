import type {AuthClass} from '@aws-amplify/auth/src/Auth';
import type {PublicMembers} from "../../src/utils/class";
import {JestMockManager} from "../../test/mocks/JestMockManager";
import {createMock, mockImplementation} from "../../test/mocks/mock-utils";

export class MockAuth implements PublicMembers<AuthClass> {
    mocks = new JestMockManager(this);

    changePassword = mock<'changePassword'>();
    completeNewPassword = mock<'completeNewPassword'>();
    configure = mock<'configure'>();
    confirmSignIn = mock<'confirmSignIn'>();
    confirmSignUp = mock<'confirmSignUp'>();
    currentAuthenticatedUser = mock<'currentAuthenticatedUser'>();
    currentCredentials = mock<'currentCredentials'>();
    currentSession = mock<'currentSession'>();
    currentUserCredentials = mock<'currentUserCredentials'>();
    currentUserInfo = mock<'currentUserInfo'>();
    currentUserPoolUser = mock<'currentUserPoolUser'>();
    disableSMS = mock<'disableSMS'>();
    enableSMS = mock<'enableSMS'>();
    essentialCredentials = mock<'essentialCredentials'>();
    federatedSignIn = jest.fn();
    forgotPassword = mock<'forgotPassword'>();
    forgotPasswordSubmit = mock<'forgotPasswordSubmit'>();
    getMFAOptions = mock<'getMFAOptions'>();
    getModuleName = mock<'getModuleName'>();
    getPreferredMFA = mock<'getPreferredMFA'>();
    resendSignUp = mock<'resendSignUp'>();
    sendCustomChallengeAnswer = mock<'sendCustomChallengeAnswer'>();
    setPreferredMFA = mock<'setPreferredMFA'>();
    setupTOTP = mock<'setupTOTP'>();
    signIn = mock<'signIn'>();
    signOut = mock<'signOut'>();
    signUp = mock<'signUp'>();
    updateUserAttributes = mock<'updateUserAttributes'>();
    userAttributes = mock<'userAttributes'>();
    userSession = mock<'userSession'>();
    verifiedContact = mock<'verifiedContact'>();
    verifyCurrentUserAttribute = mock<'verifyCurrentUserAttribute'>();
    verifyCurrentUserAttributeSubmit = mock<'verifyCurrentUserAttributeSubmit'>();
    verifyTotpToken = mock<'verifyTotpToken'>();
    verifyUserAttribute = mock<'verifyUserAttribute'>();
    verifyUserAttributeSubmit = mock<'verifyUserAttributeSubmit'>();
}

function mock<Key extends keyof AuthClass>() {
    return createMock<AuthClass[Key]>();
}
function resolve<Key extends keyof AuthClass>() {
    return mockImplementation.resolve<AuthClass[Key]>();
}
function reject<Key extends keyof AuthClass>() {
    return mockImplementation.reject<AuthClass[Key]>();
}

export const mockAuthMethods = {
    currentAuthenticatedUser: {
        signedIn: resolve<'currentAuthenticatedUser'>(),
        signedOut: resolve<'currentAuthenticatedUser'>(),
    },
    signIn: {
        success: resolve<'signIn'>(),
        error: reject<'signIn'>(),
    },
    signUp: {
        success: resolve<'signUp'>(),
        error: reject<'signUp'>(),
    },
    confirmSignUp: {
        success: resolve<'confirmSignUp'>(),
        error: reject<'confirmSignUp'>(),
    },
    forgotPassword: {
        success: resolve<'forgotPassword'>(),
        error: reject<'forgotPassword'>(),
    },
    forgotPasswordSubmit: {
        success: resolve<'forgotPasswordSubmit'>(),
        error: reject<'forgotPasswordSubmit'>(),
    },
    signOut: {
        success: resolve<'signOut'>(),
        error: reject<'signOut'>(),
    },
};
