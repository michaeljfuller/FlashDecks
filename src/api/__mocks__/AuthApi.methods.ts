import {Observable} from "rxjs";
import {MockAuthApi} from "./AuthApi";
import {AuthApi} from "../AuthApi";
import {toPromiseAndSubscription} from "../../utils/async";
import {CognitoUserModel} from "../../models";
import {createMockMethodMap} from "../../../test/test-utils";

/** Mock implementations of AuthApi::getUser */
export const AuthApi_getUser = createMockMethodMap(AuthApi, "getUser", {

    loggedIn: (user?: CognitoUserModel) => jest.fn(function() {
        return Promise.resolve(user || CognitoUserModel.fromApi({
            username: 'mock-CognitoUserModel-username',
            attributes: {
                sub: 'mock-CognitoUserModel-sub',
                email: 'mock-CognitoUserModel-email',
                email_verified: true,
            }
        }));
    }),

    loggedOut: () => jest.fn(function() {
        return Promise.resolve<CognitoUserModel|undefined>(undefined);
    }),

});

/** Mock implementations of AuthApi::signIn */
export const AuthApi_signIn = createMockMethodMap(AuthApi, "signIn", {

    success: (user?: CognitoUserModel) => jest.fn(
        function(this: MockAuthApi, username: string, _password: string) {
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
        }
    ),

    failure: (error: any = 'mock-error') => jest.fn(function(..._rest) {
        return toPromiseAndSubscription(Promise.reject(error));
    }),

});

/** Mock implementations of AuthApi::signUp */
export const AuthApi_signUp = createMockMethodMap(AuthApi, "signUp", {

    success: (user?: CognitoUserModel) => jest.fn(
        function(username: string, password: string, email: string) {
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
        }
    ),

    failure: (error: any = 'mock-error') => jest.fn(function(..._rest) {
        return toPromiseAndSubscription(Promise.reject(error));
    }),

});

/** Mock implementations of AuthApi::confirmSignUp */
export const AuthApi_confirmSignUp = createMockMethodMap(AuthApi, "confirmSignUp", {
    success: () => jest.fn(function(..._rest) {
        return toPromiseAndSubscription(new Observable<void>(sub => {
            sub.next();
            sub.complete();
        }));
    }),

    failure: (error: any = 'mock-error') => jest.fn(function(..._rest) {
        return toPromiseAndSubscription(Promise.resolve(error));
    }),
});

/** Mock implementations of AuthApi::forgotPassword */
export const AuthApi_forgotPassword = createMockMethodMap(AuthApi, "forgotPassword", {
    success: () => jest.fn(function(..._rest) {
        return toPromiseAndSubscription(Promise.resolve());
    }),

    failure: (error: any = 'mock-error') => jest.fn(function(..._rest) {
        return toPromiseAndSubscription(Promise.reject(error));
    }),
});

/** Mock implementations of AuthApi::forgotPasswordSubmit */
export const AuthApi_forgotPasswordSubmit = createMockMethodMap(AuthApi, "forgotPasswordSubmit", {
    success: () => jest.fn(function(..._rest) {
        return toPromiseAndSubscription(Promise.resolve());
    }),

    failure: (error: any = 'mock-error') => jest.fn(function(..._rest) {
        return toPromiseAndSubscription(Promise.reject(error));
    }),
});

/** Mock implementations of AuthApi::signOut */
export const AuthApi_signOut = createMockMethodMap(AuthApi, "signOut", {
    success: () => jest.fn(function(this: MockAuthApi) {
        this.signOutSubject.next();
        return Promise.resolve();
    }),

    failure: (error: any = 'mock-error') => jest.fn(function() {
        return Promise.reject(error);
    }),
});
