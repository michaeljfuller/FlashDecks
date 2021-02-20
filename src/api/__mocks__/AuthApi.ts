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

    getUser = AuthApi_getUser.loggedIn();
    signIn = AuthApi_signIn.success();
    signUp = AuthApi_signUp.success();
    confirmSignUp = AuthApi_confirmSignUp.success();
    forgotPassword = AuthApi_forgotPassword.success();
    forgotPasswordSubmit = AuthApi_forgotPasswordSubmit.success();
    signOut = AuthApi_signOut.success();
}

export { MockAuthApi as AuthApi }
export const authApi = new MockAuthApi;
export default authApi;
