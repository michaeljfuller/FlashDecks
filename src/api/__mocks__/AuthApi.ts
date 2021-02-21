import {Subject} from "rxjs";
import {HubPayload} from "aws-amplify-react-native/types";
import {PublicMembers} from "../../utils/class";
import {AuthApi} from "../AuthApi";
import {
    AuthApi_confirmSignUp,
    AuthApi_forgotPassword,
    AuthApi_forgotPasswordSubmit,
    AuthApi_getUser,
    AuthApi_signIn,
    AuthApi_signOut,
    AuthApi_signUp
} from "./AuthApi.methods";
export * from "./AuthApi.methods";

// export class MockAuthApi extends AuthApi {
export class MockAuthApi implements PublicMembers<AuthApi> {
    protected eventSubject = new Subject<HubPayload>();
    protected signInSubject = new Subject();
    protected signOutSubject = new Subject();

    readonly onEvent = this.eventSubject.asObservable();
    readonly onSignIn = this.signInSubject.asObservable();
    readonly onSignOut = this.signOutSubject.asObservable();

    getUser = jest.fn(AuthApi_getUser.loggedIn());
    signIn = jest.fn(AuthApi_signIn.success());
    signUp = jest.fn(AuthApi_signUp.success());
    confirmSignUp = jest.fn(AuthApi_confirmSignUp.success());
    forgotPassword = jest.fn(AuthApi_forgotPassword.success());
    forgotPasswordSubmit = jest.fn(AuthApi_forgotPasswordSubmit.success());
    signOut = jest.fn(AuthApi_signOut.success());
}

export { MockAuthApi as AuthApi }
export const authApi = new MockAuthApi;
export default authApi;

export function asMockAuthApi(api: AuthApi): MockAuthApi {
    return api as any;
}
