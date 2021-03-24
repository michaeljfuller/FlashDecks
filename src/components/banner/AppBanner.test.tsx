//<editor-fold desc="Mocks">

import {createMockNavigation} from "../../../test/mocks/MockNavigation";

//</editor-fold>
//<editor-fold desc="Imports">

import React from "react";
import {screen, fireEvent} from "@testing-library/react";
import AppBanner, {TestIDs} from "./AppBanner";
import {createRenderComponent, createTestHelpers} from "../../../test/react-testing-library";
import {NavigationRouterDetails} from "../../navigation/navigation_types";
import {UserModel} from "../../models";

//</editor-fold>
//<editor-fold desc="Helpers">

const render = createRenderComponent.withRedux(AppBanner, {
    routerDetails: createRouterDetails(),
    onSignOutClick: jest.fn(),
    onToggleSidebar: jest.fn(),
}, {
    loggedInUser: {
        value: UserModel.create({ displayName: "MockUser", userName: "mock-user" })
    }
});

function createRouterDetails(
    current: TestRouteName = "a1",
    navigation = createMockNavigation(),
): NavigationRouterDetails {
    return {
        navigation,
        initialRouteName: 'home',
        state: {
            key: "root-key",
            index: current === "home" ? 0 : (current === "b" ? 2 : 1),
            routeNames: ["home", "a", "b"],
            routes: [
                {name: "home", key: "home-key"},
                {name: "a", key: "a-key", state: {
                    key: "a-state-key",
                    index: current === "a1" ? 0 : 1,
                    routeNames: ["a1", "a2"],
                    routes: [
                        {name: "a1", key: "a1-key"},
                        {name: "a2", key: "a2-key"},
                    ],
                }},
                {name: "b", key: "b-key"},
            ],
        },
    } as NavigationRouterDetails;
}
type TestRouteName = "home"|"a"|"b"|"a1"|"a2";

const {get, trigger, expectHas, debug} = createTestHelpers(TestIDs);

//</editor-fold>

describe("AppBanner", () => {

    it("can toggle the sidebar", () => {
        const onToggleSidebar = jest.fn();
        render({ onToggleSidebar });
        expectHas.SidebarButton();
        trigger.SidebarButton.click();
        expect(onToggleSidebar).toHaveBeenCalled();
    });

    describe("breadcrumbs", () => {
       it("empty route still has Home", () => {
           const {container} = render({
               routerDetails: createRouterDetails("home")
           });
           const routeButtons = container.querySelectorAll(".MuiBreadcrumbs-li button");
           expect(routeButtons).toHaveLength(1);
           expect(routeButtons[0]).toHaveTextContent("Home");
       });
       it("shows route path", () => {
           const {container} = render({
               routerDetails: createRouterDetails("a2")
           });
           const routeButtons = container.querySelectorAll(".MuiBreadcrumbs-li button");
           expect(routeButtons).toHaveLength(3);
           expect(routeButtons[0]).toHaveTextContent("Home");
           expect(routeButtons[1]).toHaveTextContent("A");
           expect(routeButtons[2]).toHaveTextContent("A2");
       });
       it("navigates when home button is clicked", () => {
           const navigation = createMockNavigation();
           const spy = jest.spyOn(navigation, "navigate");
           const {container} = render({
               routerDetails: createRouterDetails("a2", navigation)
           });
           const routeButtons = container.querySelectorAll(".MuiBreadcrumbs-li button");
           fireEvent.click(routeButtons[0]);
           expect(spy).toHaveBeenCalledWith("home", {screen: "home"});
       });
       it("navigates when route button is clicked", () => {
           const navigation = createMockNavigation();
           const spy = jest.spyOn(navigation, "navigate");
           const {container} = render({
               routerDetails: createRouterDetails("a2", navigation)
           });
           const routeButtons = container.querySelectorAll(".MuiBreadcrumbs-li button");
           fireEvent.click(routeButtons[1]);
           expect(spy).toHaveBeenCalledWith("a", {screen: ""});
       });
       it("does nothing when top route button is clicked", () => {
           const navigation = createMockNavigation();
           const spy = jest.spyOn(navigation, "navigate");
           const {container} = render({
               routerDetails: createRouterDetails("a2", navigation)
           });
           const routeButtons = container.querySelectorAll(".MuiBreadcrumbs-li button");
           fireEvent.click(routeButtons[routeButtons.length-1]);
           expect(routeButtons.length).toBeGreaterThan(1);
           expect(spy).not.toHaveBeenCalled();
       });
    });

    it("shows logged in user", () => {
        const {queryByText} = render({}, {
            loggedInUser: { value: UserModel.create({ displayName: "TestUser" }) }
        });
        expect(queryByText("TestUser")).toBeInTheDocument();
    });
    it("shows guest user", () => {
        const {queryByText} = render({}, { loggedInUser: { value: null } });
        expect(queryByText("guest")).toBeInTheDocument();
    });

    it("has Sign Out button", () => {
        render();
        expect(get.SignOut()).toHaveTextContent("Sign Out")
    });
    it("Sign Out button cab be clicked", () => {
        const onSignOutClick = jest.fn();
        render({ onSignOutClick });
        trigger.SignOut.click();
        expect(onSignOutClick).toHaveBeenCalled();
    });

});
