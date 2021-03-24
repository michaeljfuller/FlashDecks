import React from "react";
import LoggedInUserStore from '../store/loggedInUser/LoggedInUserStore';
import {CognitoUserModel, UserModel} from "../models";
import userApi from "../api/UserApi";
import auth from "../api/AuthApi";
import ToastStore from "../store/toast/ToastStore";
import {getErrorText} from "../utils/string";
import logger from "../utils/Logger";
import {Subscription} from "rxjs";

export interface AppRootProps {
    manualStart?: boolean;
}
export interface AppRootState {
    user?: UserModel;
    cognitoUser?: CognitoUserModel;
    started: boolean;
    initialized: boolean;
}

export abstract class AppRootBase extends React.PureComponent<AppRootProps, AppRootState> {
    state: AppRootState = {
        user: undefined,
        cognitoUser: undefined,
        started: false,
        initialized: false,
    };
    toast = new ToastStore(this);
    signInSub?: Subscription;
    signOutSub?: Subscription;

    componentDidMount() {
        if (!this.props.manualStart) this.start();
    }

    async start() {
        this.setState({started:true});
        this.signInSub?.unsubscribe();
        this.signOutSub?.unsubscribe();
        this.signInSub = auth.onSignIn.subscribe(() => this.fetchUserData());
        this.signOutSub = auth.onSignOut.subscribe(() => this.clearUser());
        await this.fetchUserData(false);
    }

    componentWillUnmount() {
        this.toast.removeByRef();
        this.signInSub?.unsubscribe();
        this.signOutSub?.unsubscribe();
    }

    onErrorMessage(message: string, details?: string) { // TODO Child implementations to use Toast
        logger.warning('AppRoot Auth Error:', message, details)
        this.toast.add({ title: 'Auth Error', text: message, type: "warning", duration: 3000 });
    }

    protected clearUser() {
        this.setState({ user: undefined, cognitoUser: undefined, initialized: true });
        LoggedInUserStore.clear();
    }

    /**
     * Try to add `cognitoUser` & `user` to the state.
     */
    async fetchUserData(showError = true): Promise<void> {
        let cognitoUser: CognitoUserModel|undefined = undefined;
        let user: UserModel|undefined = undefined;

        // Get user from Cognito.
        try {
            cognitoUser = await auth.getUser();
        } catch (e) {
            if (showError) this.onErrorMessage('Unable to sign in.', getErrorText(e));
        }

        // Get user data from DataBase.
        if (cognitoUser) {
            try {
                user = await userApi.getUser(cognitoUser.sub).toPromise();
            } catch (e) {
                this.onErrorMessage('Error getting current user.', getErrorText(e));
            }
        }

        // Update state
        if (cognitoUser && user) {
            LoggedInUserStore.update(user);
            logger.green.log(`Logged in as "${user.displayName}"`, LoggedInUserStore.state.value);
            this.setState({ cognitoUser, user });
        } else {
            logger.red.log('AppRootBase.fetchUserData() No user.');
            this.clearUser();
            this.setState({ initialized: true });
        }
    }

    logInGuest() {
        // LoggedInUserStore TODO Add guest log in and catch log out
    }

}
