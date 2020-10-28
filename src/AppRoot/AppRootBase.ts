import React from "react";
import LoggedInUserStore from '../store/loggedInUser/LoggedInUserStore';
import {CognitoUserModel, UserModel} from "../models";
import userApi from "../api/UserApi";
import auth from "../api/AuthApi";
import ToastStore from "../store/toast/ToastStore";
import {getErrorText} from "../utils/string";

export interface AppRootProps {}
export interface AppRootState {
    user?: UserModel;
    cognitoUser?: CognitoUserModel;
}

export abstract class AppRootBase extends React.PureComponent<AppRootProps, AppRootState> {
    state: AppRootState = {
        user: undefined,
        cognitoUser: undefined,
    };
    toast = new ToastStore(this);

    async componentDidMount() {
        auth.onSignIn.add(() => this.fetchUserData());
        auth.onSignOut.add(() => this.clearUser());
        auth.onSignInFailed.add(message => this.onErrorMessage(message || 'Failed to sign in.'));
        auth.onConfigured.add(message => this.onErrorMessage('Auth module already configured.', message));
        await this.fetchUserData();
    }

    componentWillUnmount() {
        this.toast.removeByRef();
    }

    onErrorMessage(message: string, details?: string) { // TODO Child implementations to use Toast
        console.warn('AppRoot Auth Error:', message, details);
        this.toast.add({ title: 'Auth Error', text: message, type: "warning", duration: 3000 });
    }

    protected clearUser() {
        this.setState({ user: undefined, cognitoUser: undefined });
        LoggedInUserStore.clear();
    }

    /**
     * Try to add `cognitoUser` & `user` to the state.
     */
    async fetchUserData(): Promise<void> {
        let cognitoUser: CognitoUserModel|undefined = undefined;
        let user: UserModel|undefined = undefined;

        // Get user from Cognito.
        try {
            cognitoUser = await auth.getUser();
        } catch (e) {
            this.onErrorMessage('Unable to sign in.', getErrorText(e));
        }

        // Get user data from DataBase.
        if (cognitoUser) {
            try {
                user = await userApi.getUser(cognitoUser.sub);
            } catch (e) {
                this.onErrorMessage('Error getting current user.', getErrorText(e));
            }
        }

        // Update state
        if (cognitoUser && user) {
            LoggedInUserStore.update(user);
            this.setState({ cognitoUser, user });
        } else {
            this.clearUser();
        }
    }

}
