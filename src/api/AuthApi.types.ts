/** events: https://docs.amplify.aws/lib/auth/auth-events/q/platform/js */
export enum AuthEventType {
    CONFIGURED = 'configured', // "The Auth category has been configured successfully"

    // Sign in/out
    SIGN_IN         = 'signIn',         // "[username] has signed in" / "A user [username] has been signed in"
    SIGN_IN_FAILED  = 'signIn_failure', // "[username] failed to signin" / "The OAuth response flow failed"
    SIGN_OUT        = 'signOut',        // "A user has been signed out"

    // Token refresh
    TOKEN_REFRESH           = 'tokenRefresh',
    TOKEN_REFRESH_FAILURE   = 'tokenRefresh_failure',

    // Sign up
    SIGN_UP         = 'signUp',         // "[username] has signed up successfully"
    SIGN_UP_FAILED  = 'signUp_failure', // "[username] failed to signup"

    // New Password
    NEW_PASSWORD_FAILED = 'completeNewPassword_failure', // "[username] failed to complete the new password flow"

    // Forgot Password
    FORGOT_PASSWORD                = 'forgotPassword',               // "[username] has initiated forgot password flow"
    FORGOT_PASSWORD_FAILED         = 'forgotPassword_failure',       // "[username] forgotPassword failed"
    FORGOT_PASSWORD_SUBMIT         = 'forgotPasswordSubmit',         // "[username] forgotPasswordSubmit successful"
    FORGOT_PASSWORD_SUBMIT_FAILURE = 'forgotPasswordSubmit_failure', // "[username] forgotPasswordSubmit failed"

    // OAuth
    PARSING_CALLBACK_URL      = 'parsingCallbackUrl',      // "The callback url is being parsed"
    COGNITO_HOSTED_UI         = 'cognitoHostedUI',         // "A user [username] has been signed in via Cognito Hosted UI"
    COGNITO_HOSTED_UI_FAILURE = 'cognitoHostedUI_failure', // "A failure occurred when returning to the Cognito Hosted UI"
    CUSTOM_OAUTH_STATE        = 'customOAuthState',        // "State for user [username]"
    CUSTOM_STATE_FAILURE      = 'customState_failure',     // "A failure occurred when returning state"
    OAUTH_SIGN_OUT            = 'oAuthSignOut',            // "Signing out from [OAuth token endpoint]"
    CODE_FLOW                 = 'codeFlow',                // "Retrieving tokens from [OAuth token endpoint]"
    IMPLICIT_FLOW             = 'implicitFlow',            // "Got tokens from [URL]"
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
