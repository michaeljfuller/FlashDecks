import {ApiCognitoUser} from "../models";

/** events: https://docs.amplify.aws/lib/auth/auth-events/q/platform/js */
export enum AuthEventType {
    SIGN_IN = 'signIn',
    SIGN_UP = 'signUp',
    SIGN_OUT = 'signOut',
    SIGN_IN_FAILED = 'signIn_failure',
    TOKEN_REFRESH = 'tokenRefresh',
    TOKEN_REFRESH_FAILURE = 'tokenRefresh_failure',
    CONFIGURED = 'configured'
}

/** https://aws-amplify.github.io/amplify-js/api/globals.html#hubcapsule */
export interface HubCapsule {
    channel: 'auth';
    source: 'Auth';
    payload: {
        event: AuthEventType;
        message?: string;
        data?: any|ApiCognitoUser;
    };
}

export type MessageCallback = (message: string) => boolean|void;

export interface SignInError {
    code: string; // NotAuthorizedException
    name: string; // NotAuthorizedException
    message: string; // Incorrect username or password.
}
