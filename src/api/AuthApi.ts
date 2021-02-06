import {Auth, Hub} from "aws-amplify";
import logger from "../utils/Logger";
import {ApiCognitoUser, CognitoUserModel} from "../models";
import {CallbackManager} from "../utils/async";
import {
    AuthEventType,
    HubCapsule,
    MessageCallback,
    SignInError
} from "./AuthApi.types";

export class AuthApi {
    private signInCallbacks = new CallbackManager;
    private signUpCallbacks = new CallbackManager;
    private signOutCallbacks = new CallbackManager;
    private signInFailedCallbacks = new CallbackManager<MessageCallback>();
    private configuredCallbacks = new CallbackManager<MessageCallback>();

    readonly onSignIn = this.signInCallbacks.listeners;
    readonly onSignUp = this.signUpCallbacks.listeners;
    readonly onSignOut = this.signOutCallbacks.listeners;
    readonly onSignInFailed = this.signInFailedCallbacks.listeners;
    readonly onConfigured = this.configuredCallbacks.listeners;

    constructor() {
        Hub.listen('auth', capsule => this.onAuthEvent(capsule as HubCapsule));
    }

    /** Get the logged in user */
    async getUser(): Promise<CognitoUserModel|undefined> {
        const apiCognitoUser = await Auth.currentAuthenticatedUser() as ApiCognitoUser;
        return apiCognitoUser ? CognitoUserModel.fromApi(apiCognitoUser) : undefined;
    }

    /**
     * @link https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js#sign-in
     * https://docs.aws.amazon.com/pt_br/cognito-user-identity-pools/latest/APIReference/API_InitiateAuth.html
     */
    async signIn(username: string, password: string): Promise<CognitoUserModel> {
        try {
            const user = await Auth.signIn(username, password);
            // logger.green.log('AuthApi.signIn Success:', user).groupCollapsed();
            return CognitoUserModel.fromApi(user);
        } catch(e) {
            logger.red.error('AuthApi.signIn Error:', e);
            throw e;
        }
    }

    signOut() {
        return Auth.signOut();
    }

    /**
     * @link https://docs.amplify.aws/lib/utilities/hub/q/platform/js
     */
    private onAuthEvent(capsule: HubCapsule) {
        const {event, message, data} = capsule.payload;
        switch(event) {
            case AuthEventType.SIGN_IN: return this.signInCallbacks.call();
            case AuthEventType.SIGN_UP: return this.signUpCallbacks.call();
            case AuthEventType.SIGN_OUT: return this.signOutCallbacks.call();
            case AuthEventType.SIGN_IN_FAILED: return this.signInFailedCallbacks.call(data?.message || message || '');
            case AuthEventType.CONFIGURED: return this.configuredCallbacks.call(message || '');
            default: console.warn('CognitoApi.onAuthEvent', 'No handled case for', event);
        }
    }

}

export default new AuthApi;
