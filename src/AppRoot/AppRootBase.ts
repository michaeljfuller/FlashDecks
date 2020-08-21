import React from "react";
import LoggedInUserStore from '../store/loggedInUser/LoggedInUserStore';
import {CognitoUserModel, UserModel} from "../models";
import userApi from "../api/UserApi";
import AuthApi from "../api/AuthApi";

export interface AppRootProps {}
export interface AppRootState {
    user?: UserModel;
    cognitoUser?: CognitoUserModel;
    errorMessage?: string;
}

export abstract class AppRootBase extends React.PureComponent<AppRootProps, AppRootState> {
    state: AppRootState = {
        user: undefined,
        cognitoUser: undefined,
    };
    auth: AuthApi = new AuthApi;

    async componentDidMount() {
        this.auth = new AuthApi;
        this.auth.onSignIn.add(() => this.fetchUserData());
        this.auth.onSignOut.add(() => this.clearUser());
        this.auth.onSignInFailed.add(message => this.onErrorMessage(message || 'Failed to sign in.'));
        this.auth.onConfigured.add(message => this.onErrorMessage('Auth module already configured.', message));
        await this.fetchUserData();
    }

    onErrorMessage(message: string, details?: string) { // TODO Child implementations to use Toast
        console.warn('AppRoot Auth Error:', message, details);
        this.setState({ errorMessage: message });
    }
    clearErrorMessage() {
        this.setState({ errorMessage: undefined });
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
            cognitoUser = await this.auth.getUser();
        } catch (e) {
            this.onErrorMessage('Unable to sign in.', getErrorMessage(e));
        }

        // Get user data from DataBase.
        if (cognitoUser) {
            try {
                user = await userApi.getUser(cognitoUser.sub);
            } catch (e) {
                this.onErrorMessage('Error getting current user.', getErrorMessage(e));
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

function getErrorMessage(e: unknown): string|undefined {
    if (e instanceof Error) return e.message;
    if (typeof e === 'string') return e;
    return undefined;
}
