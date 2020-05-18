import React from "react";
import { Auth, Hub, API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../graphql/queries';

export interface AppRootProps {}
export interface AppRootState {
    user?: User;
    cognitoUser?: CognitoUser;
}

interface AuthEvent {
    channel: 'auth';
    source: 'Auth';
    payload: {
        event: AuthEventType;
        message: string;
        data: any|CognitoUser;
    };
}
enum AuthEventType { SIGN_IN = 'signIn', SIGN_UP = 'signUp', SIGN_OUT = 'signOut' }

export abstract class AppRootBase extends React.Component<AppRootProps, AppRootState> {
    state: AppRootState = {
        user: undefined,
        cognitoUser: undefined,
    };

    componentDidMount() {
        this.fetchUserData();
        Hub.listen('auth', data => this.onAuthEvent(data as AuthEvent));
    }

    /**
     * @link https://docs.amplify.aws/lib/utilities/hub/q/platform/js
     */
    onAuthEvent(data: AuthEvent) {
        console.info('AppRoot.onAuthEvent', data);
        switch(data.payload.event) {
            case AuthEventType.SIGN_IN: return this.fetchUserData();
            case AuthEventType.SIGN_UP: return;
            case AuthEventType.SIGN_OUT: return this.clearUser();
            default: console.warn('AppRoot.onAuthEvent', 'No handled case for', data.payload.event);
        }
    }

    protected clearUser() {
        this.setState({ user: undefined, cognitoUser: undefined });
    }

    signOut = async () => {
        try {
            await Auth.signOut();
        } catch(e) {
            console.error("Error signing out user", e);
        }
    }

    /**
     * Try to add `cognitoUser` & `user` to the state.
     */
    async fetchUserData(): Promise<boolean> {
        let cognitoUser: CognitoUser|undefined = undefined;
        let user: User|undefined = undefined;

        // Get user from Cognito.
        try {
            cognitoUser = await Auth.currentAuthenticatedUser();
            console.info('AppRoot.fetchUserData', cognitoUser);
            this.setState({ cognitoUser: cognitoUser || undefined });
        } catch (e) {
            console.log('AppRoot.fetchUserData cognito error:', e);
        }

        // Get user data from DataBase.
        if (cognitoUser) {
            try {
                const result: any = await API.graphql(graphqlOperation(getUser, {
                    id: cognitoUser.attributes.sub
                }));
                user = (result && result.data && result.data.getUser);
                console.info('AppRoot.fetchUserData user', user);
            } catch (e) {
                console.warn('AppRoot.fetchUserData user API error:', e);
            }
        }

        // Update state
        if (cognitoUser && user) {
            this.setState({ user, cognitoUser });
            return true;
        }
        this.clearUser();
        return false;
    }

}
