import React from "react";
import { Auth, Hub, API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../graphql/queries';
import LoggedInUserStore from '../store/loggedInUser/LoggedInUserStore';
import {CognitoUserModel, ApiCognitoUser, UserModel, ApiUser} from "../models";

export interface AppRootProps {}
export interface AppRootState {
    user?: UserModel;
    cognitoUser?: CognitoUserModel;
}

/** https://aws-amplify.github.io/amplify-js/api/globals.html#hubcapsule */
interface HubCapsule {
    channel: 'auth';
    source: 'Auth';
    payload: {
        event: AuthEventType;
        message?: string;
        data?: any|ApiCognitoUser;
    };
}
/** https://docs.amplify.aws/lib/utilities/hub/q/platform/js#authentication-events */
enum AuthEventType {
    SIGN_IN = 'signIn',
    SIGN_UP = 'signUp',
    SIGN_OUT = 'signOut',
    SIGN_IN_FAILED = 'signIn_failure',
    CONFIGURED = 'configured'
}

export abstract class AppRootBase extends React.Component<AppRootProps, AppRootState> {
    state: AppRootState = {
        user: undefined,
        cognitoUser: undefined,
    };

    componentDidMount() {
        this.fetchUserData();
        Hub.listen('auth', capsule => this.onAuthEvent(capsule as HubCapsule));
    }

    /**
     * @link https://docs.amplify.aws/lib/utilities/hub/q/platform/js
     */
    onAuthEvent(capsule: HubCapsule) {
        console.info('AppRoot.onAuthEvent', capsule);
        const {event, message} = capsule.payload;
        switch(event) {
            case AuthEventType.SIGN_IN: return this.fetchUserData();
            case AuthEventType.SIGN_UP: return;
            case AuthEventType.SIGN_OUT: return this.clearUser();
            case AuthEventType.SIGN_IN_FAILED: return console.warn('Failed to sign in.', message);
            case AuthEventType.CONFIGURED: return console.warn('Auth module already configured', message);
            default: console.warn('AppRoot.onAuthEvent', 'No handled case for', event);
        }
    }

    protected clearUser() {
        this.setState({ user: undefined, cognitoUser: undefined });
        LoggedInUserStore.clear();
    }

    /**
     * Try to add `cognitoUser` & `user` to the state.
     */
    async fetchUserData(): Promise<boolean> {
        let cognitoUser: CognitoUserModel|undefined = undefined;
        let user: UserModel|undefined = undefined;

        // Get user from Cognito.
        try {
            const apiCognitoUser = await Auth.currentAuthenticatedUser() as ApiCognitoUser;
            cognitoUser = apiCognitoUser ? CognitoUserModel.fromApi(apiCognitoUser) : undefined;
            this.setState({ cognitoUser: cognitoUser || undefined });
        } catch (e) {
            console.log('AppRoot.fetchUserData cognito error:', e); // TODO Toast
        }

        // Get user data from DataBase.
        if (cognitoUser) {
            try {
                const result: any = await API.graphql(graphqlOperation(getUser, {
                    id: cognitoUser.sub
                }));
                const apiUser: ApiUser = (result && result.data && result.data.getUser);
                user = apiUser ? UserModel.fromApi(apiUser) : undefined;
            } catch (e) {
                console.warn('AppRoot.fetchUserData user API error:', e); // TODO Toast
            }
        }

        // Update state
        if (cognitoUser && user) {
            this.setState({ user, cognitoUser });
            LoggedInUserStore.update(user);
            return true;
        }
        this.clearUser();
        return false;
    }

}
