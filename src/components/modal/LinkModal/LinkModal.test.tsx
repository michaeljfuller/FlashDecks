//<editor-fold desc="Imports">

import React from "react";
import {
    LinkModal, LinkModalProps,
    getModalHeaderTestID, getModalBodyTestID, getModalFooterTestID, getModalOkButtonTestID, getModalCancelButtonTestID,
} from "./LinkModal";
import {createRenderComponent, createTestHelpers} from "../../../../test/react-testing-library";

//</editor-fold>
//<editor-fold desc="Helpers">

const testID = "mock-testID";
const url = "http://mock.url";
const onClose = jest.fn();
const render = createRenderComponent(LinkModal, {
    testID,
    url,
    open: true,
    onClose,
} as LinkModalProps);
const {get, trigger, expectHas, expectMissing} = createTestHelpers({
    Modal: testID,
    ModalHeader: getModalHeaderTestID(testID) as string,
    ModalBody: getModalBodyTestID(testID) as string,
    ModalFooter: getModalFooterTestID(testID) as string,
    ModalOkButton: getModalOkButtonTestID(testID) as string,
    ModalCancelButton: getModalCancelButtonTestID(testID) as string,
});

//</editor-fold>

describe("LinkModal", () => {
    const windowOpen = jest.spyOn(window, "open").mockImplementation();
    afterEach(() => onClose.mockReset());
    afterAll(() => windowOpen?.mockRestore());

    it('header has a title', () => {
        render();
        expect(get.ModalHeader()).toHaveTextContent("Open Link");
    });
    it('body has a message', () => {
        render();
        expect(get.ModalBody()).toHaveTextContent(
            /You are about to open a new tab to the following page/
        );
    });
    it('body has the url', () => {
        render();
        expect(get.ModalBody()).toHaveTextContent(new RegExp(url));
    });
    it('OK button opens new tab on browser', () => {
        render();
        trigger.ModalOkButton.click();
        expect(windowOpen).toHaveBeenCalledWith(url, "_blank");
    });
    it('cancel button can be pressed', () => {
        render();
        expect(onClose).not.toHaveBeenCalled();
        trigger.ModalCancelButton.click();
        expect(onClose).toHaveBeenCalled();
    });
    it('modal can be closed', () => {
        const {rerender} = render();
        expectHas.Modal();
        rerender(<LinkModal url={url} open={false} onClose={jest.fn()} />);
        expectMissing.Modal();
    });

});
