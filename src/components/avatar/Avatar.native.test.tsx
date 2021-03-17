//<editor-fold desc="Imports">

import React from "react";
import Avatar, {TestIDs} from "./Avatar.native";
import {createRenderComponent, createTestHelpers} from "../../../test/react-testing-library";
import {UserModel} from "../../models";

//</editor-fold>
//<editor-fold desc="Helpers">

const render = createRenderComponent(Avatar, { user: new UserModel() });
const {get} = createTestHelpers(TestIDs);
const getLabelLeft = () => get.Root().querySelector("div:first-child");
const getLabelRight = () => get.Root().querySelector("div:last-child");

//</editor-fold>

describe("Avatar.native", () => {

    describe("label", () => {
        const label = "test-label";
        const displayName = "test-name";
        const user = UserModel.create({ displayName });

        it("can be on the left", () => {
            render({ user, label, labelPlacement: "left" });
            expect(getLabelLeft()?.textContent).toBe(label);
            expect(get.Root()).not.toHaveTextContent(displayName);
        });
        it("can be on the right", () => {
            render({ user, label, labelPlacement: "right" });
            expect(getLabelRight()?.textContent).toBe(label);
            expect(get.Root()).not.toHaveTextContent(displayName);
        });
        it("can be hidden", () => {
            render({ user, label, labelPlacement: "none" });
            expect(get.Root()).not.toHaveTextContent(label);
            expect(get.Root()).not.toHaveTextContent(displayName);
        });
        it("can be given style", () => {
            const color = 'rgb(1, 2, 3)';
            render({ user, label, labelPlacement: "left", labelStyle: { color } });
            expect(getLabelLeft()?.getAttribute("style")).toContain(color);
        });
        it("can be given size", () => {
            const size = 123;
            render({ user, label, labelPlacement: "left", size });
            expect(getLabelLeft()).toHaveStyle(`line-height: ${size}px`);
        });

        describe("username", () => {
            it("can be on the left", () => {
                render({ user, labelPlacement: "left" });
                expect(getLabelLeft()?.textContent).toBe(displayName);
                expect(get.Root()).not.toHaveTextContent(label);
            });
            it("can be on the right", () => {
                render({ user, labelPlacement: "right" });
                expect(getLabelRight()?.textContent).toBe(displayName);
                expect(get.Root()).not.toHaveTextContent(label);
            });
        });

    });

    describe("icon", () => {
        it("is shown", () => {
            render({ labelPlacement: "left" });
            expect(get.Icon()).toBeInTheDocument();
        });
        it("can be given size", () => {
            const size = 123;
            render({ size });
            const icon = get.Icon();
            expect(icon).toHaveStyle(`width: ${size}px`);
            expect(icon).toHaveStyle(`height: ${size}px`);
        });
    });

});
