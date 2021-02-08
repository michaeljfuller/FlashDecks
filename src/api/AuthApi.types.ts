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

export interface SignInError {
    code: string; // NotAuthorizedException
    name: string; // NotAuthorizedException
    message: string; // Incorrect username or password.
}

export interface SignUpError {
    code: string;
    name: string;
    message: string;
}
export interface ConfirmSignUpError {
    code: string;
    name: string;
    message: string;
}
