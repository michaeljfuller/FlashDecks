import React from "react";
import {Provider as ReduxProvider} from 'react-redux';
import {configureEnzyme, shallow} from "../../test/Enzyme";
import {AppRoot} from './AppRoot';
import store from '../store/store';
import RootToast from "./RootToast/RootToast";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

//<editor-fold desc="Mocks">

import {logAppInfo as _logAppInfo} from "./logAppInfo";
import _authApi from "../api/AuthApi";
import _userApi from "../api/UserApi";

import {asMockAuthApi, AuthApi_getUser} from "../api/__mocks__/AuthApi";
import {asMockUserApi} from "../api/__mocks__/UserApi";
import {UserApi_getUser} from "../api/__mocks__/UserApi.methods";

jest.mock("./logAppInfo");
jest.mock("../utils/Logger");
jest.mock("../api/AuthApi");
jest.mock("../api/UserApi");
jest.mock("../store/toast/ToastStore");

const authApi = asMockAuthApi(_authApi);
const userApi = asMockUserApi(_userApi);
const logAppInfo = _logAppInfo as jest.MockedFunction<typeof _logAppInfo>;

//</editor-fold>

configureEnzyme();

describe('AppRoot', () => {

    describe('mounting', () => {
        const wrapper = shallow<AppRoot>(<AppRoot manualStart />);
        const reduxWrapper = wrapper.find(ReduxProvider);

        it('succeeds', () => expect(wrapper).toHaveLength(1));
        it('calls logAppInfo', () => expect(logAppInfo).toHaveBeenCalled());
        it("has ErrorBoundary", () => expect(wrapper.closest(ErrorBoundary).exists()).toBe(true));
        it("has Redux Provider", () => expect(reduxWrapper.exists()).toBe(true));
        it("Redux Provider has store", () => expect(reduxWrapper.prop("store")).toBe(store));
    });

    describe('while initializing', () => {
        const wrapper = shallow<AppRoot>(<AppRoot manualStart />);
        beforeAll(() => {
            authApi.getUser.mockImplementationOnce(AuthApi_getUser.wait());
            wrapper.instance().start();
        });

        // const state = wrapper.instance().state;
        // it("started", () => expect(state.started).toBeTruthy());
        // it("has no user", () => expect(state.user).toBeFalsy());
        // it("isn't initialized", () => expect(state.initialized).toBeFalsy());

        it("shows ProgressCircle", () => expect(wrapper.exists('ProgressCircle')).toBe(true));
        it("hides Authenticator", () => expect(wrapper.exists('AppAuthenticator')).toBe(false));
        it("hides AppNavigation", () => expect(wrapper.exists('AppNavigation')).toBe(false));
    });

    describe('when logged out', () => {
        const wrapper = shallow<AppRoot>(<AppRoot manualStart />);
        beforeAll(async () => {
            authApi.getUser.mockImplementationOnce(AuthApi_getUser.loggedOut());
            await wrapper.instance().start()
        });

        it("shows Authenticator", () => expect(wrapper.exists('AppAuthenticator')).toBe(true));
        it("hides ProgressCircle", () => expect(wrapper.exists('ProgressCircle')).toBe(false));
        it("hides AppNavigation", () => expect(wrapper.exists('AppNavigation')).toBe(false));
    });

    describe('when logged in', () => {
        const wrapper = shallow<AppRoot>(<AppRoot manualStart />);
        beforeAll(async () => await wrapper.instance().start());

        it("shows AppNavigation", () => expect(wrapper.exists('AppNavigation')).toBe(true));
        it("shows RootToast", () => expect(wrapper.exists(RootToast)).toBe(true));
        it("hides Authenticator", () => expect(wrapper.exists('AppAuthenticator')).toBe(false));
        it("hides ProgressCircle", () => expect(wrapper.exists('ProgressCircle')).toBe(false));
    });

    describe('error getting user', () => {
        const wrapper = shallow<AppRoot>(<AppRoot manualStart />);
        const addToastSpy = jest.spyOn(wrapper.instance().toast, "add");

        beforeAll(async () => {
            userApi.getUser.mockImplementationOnce(UserApi_getUser.noUser());
            await wrapper.instance().start();
        });

        it("shows Authenticator", () => expect(wrapper.exists('AppAuthenticator')).toBe(true));
        it("hides ProgressCircle", () => expect(wrapper.exists('ProgressCircle')).toBe(false));
        it("hides AppNavigation", () => expect(wrapper.exists('AppNavigation')).toBe(false));
        it("pops toast", () => {
            expect(addToastSpy.mock.calls.length).toBe(1);
            expect(addToastSpy).toHaveBeenCalledWith({
                title: 'Auth Error', text: "Error getting current user.", type: "warning", duration: 3000
            });
        });
    });

});
