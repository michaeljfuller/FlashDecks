import {Auth, Hub} from "aws-amplify";
import {HubPayload} from "aws-amplify-react-native/types";
import {Subject} from "rxjs";
import logger from "../utils/Logger";
import {ApiCognitoUser, CognitoUserModel} from "../models";
import {AuthEventType} from "./AuthApi.types";

export class AuthApi {
    private eventSubject = new Subject<HubPayload>();

    private signInSubject = new Subject();
    private signUpSubject = new Subject();
    private signOutSubject = new Subject();
    private signInFailedSubject = new Subject<string>();
    private configuredSubject = new Subject<string>();

    readonly onSignIn = this.signInSubject.asObservable();
    readonly onSignUp = this.signUpSubject.asObservable();
    readonly onSignOut = this.signOutSubject.asObservable();
    readonly onSignInFailed = this.signInFailedSubject.asObservable();
    readonly onConfigured = this.configuredSubject.asObservable();

    constructor() {
        // https://docs.amplify.aws/lib/utilities/hub/q/platform/js
        Hub.listen('auth', capsule => {
            this.eventSubject.next(capsule.payload);
            const {event, message, data} = capsule.payload;
            switch(event) {
                case AuthEventType.SIGN_IN:         return this.signInSubject.next();
                case AuthEventType.SIGN_UP:         return this.signUpSubject.next();
                case AuthEventType.SIGN_OUT:        return this.signOutSubject.next();
                case AuthEventType.SIGN_IN_FAILED:  return this.signInFailedSubject.next(data?.message || message || '');
                case AuthEventType.CONFIGURED:      return this.configuredSubject.next(message || '');
                default: console.warn('CognitoApi.onAuthEvent', 'No handled case for', event);
            }
        });
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

}

export default new AuthApi;
