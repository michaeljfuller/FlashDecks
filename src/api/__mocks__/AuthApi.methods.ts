import {Observable} from "rxjs";
import {MockAuthApi} from "./AuthApi";
import {AuthApi} from "../AuthApi";
import {toPromiseAndSubscription} from "../../utils/async";
import {CognitoUserModel} from "../../models";

/** Mock implementations of AuthApi::getUser */
export const AuthApi_getUser = {

    /** Resolves with the passed result */
    loggedIn: (user?: CognitoUserModel) => function() {
        return Promise.resolve<CognitoUserModel|undefined>(user || CognitoUserModel.fromApi({
            username: 'mock-CognitoUserModel-username',
            attributes: {
                sub: 'mock-CognitoUserModel-sub',
                email: 'mock-CognitoUserModel-email',
                email_verified: true,
            }
        }));
    } as AuthApi["getUser"],

    /** Resolves along with the passed promise (or never). */
    wait: (promise?: Promise<CognitoUserModel|undefined>) => function() {
        return promise || new Promise(_ => {});
    } as AuthApi["getUser"],

    /** Resolves without a user. */
    loggedOut: () => function () {
        return Promise.resolve<CognitoUserModel|undefined>(undefined);
    } as AuthApi["getUser"],

};

/** Mock implementations of AuthApi::signIn */
export const AuthApi_signIn = {

    success: (user?: CognitoUserModel) => function(this: MockAuthApi, username: string, _password: string) {
        this.signInSubject.next();
        user = user || CognitoUserModel.fromApi({
            username,
            attributes: {
                sub: `mock-CognitoUserModel[${username}]-sub`,
                email: `mock-CognitoUserModel[${username}]-email`,
                email_verified: true,
            }
        });
        return toPromiseAndSubscription(new Observable<CognitoUserModel>(sub => {
            sub.next(user);
            sub.complete();
        }));
    } as AuthApi["signIn"],

    /** Resolves along with the passed promise (or never). */
    wait: (promise?: Promise<CognitoUserModel|undefined>) => function(..._rest) {
        return toPromiseAndSubscription(promise || new Promise(_ => {}));
    } as AuthApi["signIn"],

    failure: (error: any = 'mock-error') => function(..._rest) {
        return toPromiseAndSubscription(Promise.reject(error));
    } as AuthApi["signIn"],

};

/** Mock implementations of AuthApi::signUp */
export const AuthApi_signUp = {

    success: (user?: CognitoUserModel) => function(username: string, password: string, email: string) {
        return toPromiseAndSubscription(new Observable<CognitoUserModel>(sub => {
            sub.next(user || CognitoUserModel.fromApi({
                username,
                attributes: {
                    sub: `mock-CognitoUserModel[${username}]-sub`,
                    email,
                    email_verified: true,
                }
            }));
            sub.complete();
        }));
    } as AuthApi["signUp"],

    /** Resolves along with the passed promise (or never). */
    wait: (promise?: Promise<CognitoUserModel>) => function(..._rest) {
        return toPromiseAndSubscription(promise || new Promise(_ => {}));
    } as AuthApi["signUp"],

    failure: (error: any = 'mock-error') => function(..._rest) {
        return toPromiseAndSubscription(Promise.reject(error));
    } as AuthApi["signUp"],

};

/** Mock implementations of AuthApi::confirmSignUp */
export const AuthApi_confirmSignUp = {

    success: () => function(..._rest) {
        return toPromiseAndSubscription(new Observable<void>(sub => {
            sub.next();
            sub.complete();
        }));
    } as AuthApi["confirmSignUp"],

    /** Resolves along with the passed promise (or never). */
    wait: (promise?: Promise<void>) => function(..._rest) {
        return toPromiseAndSubscription(promise || new Promise(_ => {}));
    } as AuthApi["confirmSignUp"],

    failure: (error: any = 'mock-error') => function(..._rest) {
        return toPromiseAndSubscription(Promise.reject(error));
    } as AuthApi["confirmSignUp"],

};

/** Mock implementations of AuthApi::forgotPassword */
export const AuthApi_forgotPassword = {

    success: () => function(..._rest) {
        return toPromiseAndSubscription(Promise.resolve());
    } as AuthApi["forgotPassword"],

    /** Resolves along with the passed promise (or never). */
    wait: (promise?: Promise<void>) => function() {
        return toPromiseAndSubscription(
            promise || new Promise(_ => {})
        );
    } as AuthApi["forgotPassword"],

    failure: (error: any = 'mock-error') => function(..._rest) {
        return toPromiseAndSubscription(Promise.reject(error));
    } as AuthApi["forgotPassword"],

};

/** Mock implementations of AuthApi::forgotPasswordSubmit */
export const AuthApi_forgotPasswordSubmit = {

    success: () => function(..._rest) {
        return toPromiseAndSubscription(Promise.resolve());
    } as AuthApi["forgotPasswordSubmit"],

    /** Resolves along with the passed promise (or never). */
    wait: (promise?: Promise<void>) => function() {
        return toPromiseAndSubscription(
            promise || new Promise(_ => {})
        );
    } as AuthApi["forgotPasswordSubmit"],

    failure: (error: any = 'mock-error') => function(..._rest) {
        return toPromiseAndSubscription(Promise.reject(error));
    } as AuthApi["forgotPasswordSubmit"],

};

/** Mock implementations of AuthApi::signOut */
export const AuthApi_signOut = {

    success: () => function(this: MockAuthApi) {
        this.signOutSubject.next();
        return Promise.resolve();
    } as AuthApi["signOut"],

    failure: (error: any = 'mock-error') => function() {
        return Promise.reject(error);
    } as AuthApi["signOut"],

};
