import {Auth, Hub} from "aws-amplify";
import {HubPayload} from "aws-amplify-react-native/types";
import {Observable, Subject} from "rxjs";
import logger from "../utils/Logger";
import {ApiCognitoUser, CognitoUserModel} from "../models";
import {AuthEventType} from "./AuthApi.types";
import {PromiseAndSubscription, toPromiseAndSubscription} from "../utils/async";

export class AuthApi {
    //<editor-fold desc="Subjects">

    private eventSubject = new Subject<HubPayload>();
    private signInSubject = new Subject();
    private signOutSubject = new Subject();

    //</editor-fold>
    //<editor-fold desc="Observables">

    readonly onEvent = this.eventSubject.asObservable();
    readonly onSignIn = this.signInSubject.asObservable();
    readonly onSignOut = this.signOutSubject.asObservable();

    //</editor-fold>

    constructor() {
        // https://docs.amplify.aws/lib/utilities/hub/q/platform/js
        Hub.listen('auth', capsule => {
            this.eventSubject.next(capsule.payload);
            const {event, message, data} = capsule.payload;

            this.log(event, message, data);
            switch(event) {
                case AuthEventType.SIGN_IN:                 return this.signInSubject.next();
                case AuthEventType.SIGN_UP:                 return;
                case AuthEventType.SIGN_OUT:                return this.signOutSubject.next();
                case AuthEventType.SIGN_IN_FAILED:          return; // data?.message || message || ''
                case AuthEventType.FORGOT_PASSWORD:         return;
                case AuthEventType.FORGOT_PASSWORD_FAILED:  return; // data?.message || message || ''
                case AuthEventType.FORGOT_PASSWORD_SUBMIT:  return;
                case AuthEventType.CONFIGURED:              return; // message || ''
                default: this.warn("Error", `No handled case for "${event}".`, {message, data});
            }
        });
    }

    private log(tag: string, ...messages: any[]) {
        logger.brightWhite.bgGray.add(` ${this.constructor.name} `).bgBlue.add(` ${tag} `).resetColors().space.log(...messages);
    }
    private warn(tag: string, ...messages: any[]) {
        logger.brightWhite.bgGray.add(` ${this.constructor.name} `).bgRed.add(` ${tag} `).resetColors().space.log(...messages);
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

    /**
     * Send request for a new password.
     * @link https://docs.aws.amazon.com/en_gb/cognito-user-identity-pools/latest/APIReference/API_ForgotPassword.html
     */
    forgotPassword(username: string): PromiseAndSubscription<void> {
        return toPromiseAndSubscription(
            Auth.forgotPassword(username)
        );
    }

    /**
     * Submit a new password.
     * @link https://docs.aws.amazon.com/en_gb/cognito-user-identity-pools/latest/APIReference/API_ConfirmForgotPassword.html
     */
    forgotPasswordSubmit(username: string, password: string, code: string): PromiseAndSubscription<void> {
        return toPromiseAndSubscription(
            Auth.forgotPasswordSubmit(username, code, password)
        );
    }

    signOut() {
        return Auth.signOut();
    }

}

export default new AuthApi;
