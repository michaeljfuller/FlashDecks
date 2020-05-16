import React from "react";
import { Auth, Hub, API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../graphql/queries';

export interface AppRootProps {}
export interface AppRootState {
    user?: User,
    cognitoUser?: CognitoUser
}

interface AuthEvent {
    channel: 'auth',
    source: 'Auth',
    payload: {
        event: AuthEventType,
        message: string,
        data: any|CognitoUser
    }
}
enum AuthEventType { SIGN_IN = 'signIn', SIGN_UP = 'signUp', SIGN_OUT = 'signOut' }

export abstract class AppRootBase extends React.Component<AppRootProps, AppRootState> {
    state: AppRootState = {
        user: undefined,
        cognitoUser: undefined,
    };

    componentDidMount() {
        this.getUserData().finally();
        Hub.listen('auth', data => this.onAuthEvent(data as AuthEvent));
    }

    /**
     * @link https://docs.amplify.aws/lib/utilities/hub/q/platform/js
     */
    onAuthEvent(data: AuthEvent) {
        console.info('AppRoot.onAuthEvent', data);
        switch(data.payload.event) {
            case AuthEventType.SIGN_IN: return this.getUserData().finally();
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

    async getUserData() {
        try {
            // Get user from Cognito.
            const cognitoUser: CognitoUser = await Auth.currentAuthenticatedUser();
            console.info('AppRoot.getUserData', cognitoUser);
            this.setState({ cognitoUser: cognitoUser || undefined });

            // Get user data from DataBase.
            if (cognitoUser) {
                const result: any = await API.graphql(graphqlOperation(getUser, {
                    id: cognitoUser.attributes.sub
                }));
                console.info('AppRoot.getUserData result', result);
                const user = (result && result.data && result.data.getUser) || undefined;
                this.setState({ user });
                console.info('AppRoot.getUserData user', user);
            }
        } catch (e) {
            console.warn('AppRoot.getUserData', e);
            this.clearUser();
        }
    }

}
