//<editor-fold desc="Imports">

import React from "react";
import LinkButton, {LinkButtonProps, getModalTestID, getModalCancelButtonTestID} from "./LinkButton";
import {createRenderComponent, createTestHelpers} from "../../../test/react-testing-library";

//</editor-fold>
//<editor-fold desc="Helpers">

const testID = "mock-testID";
const modalTextID = getModalTestID(testID) as string;
const title = "mock-title";
const url = "http://mock.url";
const onClick = jest.fn();
const render = createRenderComponent(LinkButton, { testID, title, url } as LinkButtonProps);
const {get, trigger, expectHas, expectMissing} = createTestHelpers({
    Button: testID,
    Modal: modalTextID,
    ModalCancelButton: getModalCancelButtonTestID(modalTextID) as string,
});

//</editor-fold>

describe("LinkButton", () => {
    afterEach(() => onClick.mockReset());

    it("can be given a title", () => {
        const title = "test-title";
        const label = render({ title }).container.querySelector(".MuiButton-label");
        expect(label).toHaveTextContent(title);
    });
    it("defaults title to link", () => {
        const label = render({
            title: undefined, url: "http://test.url/example",
        }).container.querySelector(".MuiButton-label");
        expect(label).toHaveTextContent("test.url");
    });
    it("can be given testID", () => {
        expect(render({testID: "testID"}).queryByTestId("testID")).toBeInTheDocument();
    });

    it("can be disabled", () => {
        render({disabled: true});
        expect(get.Button()).toHaveAttribute("disabled");
        trigger.Button.click();
        expectMissing.Modal();
    });
    it("is disabled if url wasn't passed", () => {
        render({ url: undefined });
        expect(get.Button()).toHaveAttribute("disabled");
        trigger.Button.click();
        expectMissing.Modal();
    });

    describe("modal", () => {
        it("can be opened", () => {
            render();
            expectMissing.Modal();
            trigger.Button.click();
            expectHas.Modal();
        });
        it("can be closed", () => {
            render();
            trigger.Button.click();
            expectHas.Modal();
            trigger.ModalCancelButton.click();
            expectMissing.Modal();
        });
    });

});
