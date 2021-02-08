import {Auth, Hub} from "aws-amplify";
import {HubPayload} from "aws-amplify-react-native/types";
import {Observable, Subject} from "rxjs";
import logger from "../utils/Logger";
import {ApiCognitoUser, CognitoUserModel} from "../models";
import {AuthEventType} from "./AuthApi.types";
import {PromiseAndSubscription, toPromiseAndSubscription} from "../utils/async";

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
     * https://docs.aws.amazon.com/en_gb/cognito-user-identity-pools/latest/APIReference/API_InitiateAuth.html
     */
    signIn(username: string, password: string): PromiseAndSubscription<CognitoUserModel> {
        return toPromiseAndSubscription(new Observable<CognitoUserModel>(sub => {
            Auth.signIn(username, password).then(
                data => sub.next(data),
                error => {
                    logger.red.error('AuthApi.signIn Error:', error);
                    sub.error(error);
                },
            ).finally(() => sub.complete());
        }));
    }

    /**
     * Register the user.
     * @link https://docs.aws.amazon.com/en_gb/cognito-user-identity-pools/latest/APIReference/API_SignUp.html
     */
    signUp(username: string, password: string, email: string): PromiseAndSubscription<CognitoUserModel> {
        return toPromiseAndSubscription(new Observable<CognitoUserModel>(sub => {
            Auth.signUp({
                username, password, attributes: { name: username, email }
            }).then(
                ({user, userSub}) => sub.next(CognitoUserModel.fromApi({
                    username: user.getUsername(),
                    attributes: {
                        email,
                        email_verified: false,
                        sub: userSub,
                    },
                })),
                error => {
                    logger.red.error('AuthApi.signUp Error:', error);
                    sub.error(error);
                },
            ).finally(() => sub.complete());
        }));
    }

    /**
     * Enter the confirmation code emailed to the user.
     * @link https://docs.aws.amazon.com/en_gb/cognito-user-identity-pools/latest/APIReference/API_ConfirmSignUp.html
     */
    confirmSignUp(username: string, confirmationCode: string): PromiseAndSubscription<void> {
        return toPromiseAndSubscription(new Observable<void>(sub => {
            Auth.confirmSignUp(username, confirmationCode).then(
                () => sub.next(),
                error => {
                    logger.red.error('AuthApi.confirmSignUp Error:', error);
                    sub.error(error);
                }
            ).finally(() => sub.complete());
        }));
    }

    signOut() {
        return Auth.signOut();
    }

}

export default new AuthApi;
