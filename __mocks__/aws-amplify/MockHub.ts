import type {HubClass, HubCapsule} from '@aws-amplify/core/src/Hub';
import type {PublicMembers} from "../../src/utils/class";
import {AuthEventType} from "../../src/api/AuthApi.types";

export class MockHub implements PublicMembers<HubClass> {
    name = "mock";
    protectedChannels = [];

    dispatch: HubClass['dispatch'] = jest.fn();
    listen: HubClass['listen'] = jest.fn();
    remove: HubClass['remove'] = jest.fn();
}

export const AmplifyHub_listen = {
    signIn: (promise: Promise<void>) => listen(promise, AuthEventType.SIGN_IN),
    signUp: (promise: Promise<void>) => listen(promise, AuthEventType.SIGN_UP),
    signOut: (promise: Promise<void>) => listen(promise, AuthEventType.SIGN_OUT),
    signInFailed: (promise: Promise<void>) => listen(promise, AuthEventType.SIGN_IN_FAILED),
    forgotPassword: (promise: Promise<void>) => listen(promise, AuthEventType.FORGOT_PASSWORD),
    forgotPasswordFailed: (promise: Promise<void>) => listen(promise, AuthEventType.FORGOT_PASSWORD_FAILED),
    forgotPasswordSubmit: (promise: Promise<void>) => listen(promise, AuthEventType.FORGOT_PASSWORD_SUBMIT),
    configured: (promise: Promise<void>) => listen(promise, AuthEventType.CONFIGURED),
};

function listen(promise: Promise<void>, event: AuthEventType) {
    return function(channel, callback) {
        if (typeof callback === "function") promise.then(
            data => callback({
                channel: "mock-channel",
                source: "mock-source",
                payload: { event, data, message: "mock-payload" }
            }),
        );
    } as HubClass['listen'];
}
