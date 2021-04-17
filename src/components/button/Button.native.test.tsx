//<editor-fold desc="Imports">

import React from "react";
import Button, {ButtonProps, IconType} from "./Button.native";
import {createRenderComponent, createTestHelpers} from "../../../test/react-testing-library";

//</editor-fold>
//<editor-fold desc="Helpers">

const testID = "mock-testID";
const title = "mock-title";
const onClick = jest.fn();
const render = createRenderComponent(Button, { testID, title, onClick } as ButtonProps);
const {get, trigger} = createTestHelpers({
    Button: testID,
});

//</editor-fold>

describe("Button", () => {
    afterEach(() => onClick.mockReset());

    it("can be given a title", () => {
        const title = "test-title";
        const label = render({ title }).container.querySelector("nativebase-text");
        expect(label).toHaveTextContent(title);
    });
    it("can be given testID", () => {
        expect(render({testID: "testID"}).queryByTestId("testID")).toBeInTheDocument();
    });

    describe("action", () => {
        it("can be clicked", () => {
            const onClick = jest.fn();
            render({onClick});
            trigger.Button.click();
            trigger.Button.event(new Event(""))
            expect(onClick).toHaveBeenCalledTimes(1);
        });
        it("can be disabled", () => {
            const onClick = jest.fn();
            render({onClick, disabled: true});
            expect(get.Button()).toHaveAttribute("disabled");
            trigger.Button.click();
            expect(onClick).not.toHaveBeenCalled();
        });
        it("is disabled if onClick wasn't passed", () => {
            render({ onClick: undefined });
            expect(get.Button()).toHaveAttribute("disabled");
        });
    });

    describe("icon", () => {
        const icon = IconType.Info;
        function getIcon(element = get.Button()) {
            return element.querySelector("svg");
        }
        it ("has no icon if not passed", () => {
            const iconElement = getIcon(render().container);
            expect(iconElement).not.toBeInTheDocument();
        });
        it("can be given an icon", () => {
            const iconElement = getIcon(render({icon}).container);
            expect(iconElement).toBeInTheDocument();
        });
        it("can be given icon position left", () => {
            render({icon, iconPosition: "left"});
            const label = get.Button();
            const childNodes = (label?.childNodes || []) as NodeListOf<ChildNode>;
            expect(childNodes).toHaveLength(2);
            expect(childNodes[0]).toContainHTML("<svg");
            expect(childNodes[1]).toContainHTML(title);
        });
        it("can be given icon position right", () => {
            render({icon, iconPosition: "right"});
            const label = get.Button();
            const childNodes = (label?.childNodes || []) as NodeListOf<ChildNode>;
            expect(childNodes).toHaveLength(2);
            expect(childNodes[0]).toContainHTML(title);
            expect(childNodes[1]).toContainHTML("<svg");
        });
    });

});
