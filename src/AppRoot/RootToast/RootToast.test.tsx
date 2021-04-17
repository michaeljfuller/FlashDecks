//<editor-fold desc="Imports">

import React from "react";
import {screen} from "@testing-library/react";
import {createRenderComponent, createTestHelpers} from "../../../test/react-testing-library";
import RootToast from "./RootToast";
import {ToastStateQueueItem} from "../../store/toast/toast_reducer";
import {ToastQueueItem} from "../../store/toast/toast_actions";
import {repeat} from "../../utils/array";
import {ANIMATE_IN_DURATION, TestIDs} from "../../components/toast/Toast";
import {usingTimeTravel, timeTravel} from "../../../test/test-utils/timeTravel";
import {getTestIDs} from "../../components/fullscreen/FullScreen";

//</editor-fold>
//<editor-fold desc="Helpers">

const render = createRenderComponent.withRedux(RootToast);
function renderWithToast(
    toasts: ToastStateQueueItem[],
    nextQueueId = 0,
    skipAnimation = true,
) {
    return usingTimeTravel(() => {
        const result = render({}, { toast: { nextQueueId, queue: toasts } });
        if (skipAnimation) timeTravel(ANIMATE_IN_DURATION);
        return result;
    });
}

function createToast(id: number, toast?: Partial<ToastQueueItem>): ToastStateQueueItem {
    return Object.assign({ id, text: `mock-toast-${id}` }, toast);
}

const fullScreenIDs = getTestIDs(TestIDs.Root);
const {get, getAll, query, trigger} = createTestHelpers(Object.assign({
        fullScreenRoot: fullScreenIDs.root,
        fullScreenBackground: fullScreenIDs.background,
        fullScreenContents: fullScreenIDs.contents,
    }, TestIDs
));

//</editor-fold>

describe('RootToast', () => {

    it('shows toast', () => {
        renderWithToast([createToast(0)]);
        expect(get.Root()).toBeInTheDocument();
    });
    it('only shows one', () => {
        renderWithToast(
            repeat(3, (i) => createToast(i, {text: `test-toast-${i}`}))
        );
        expect(getAll.Root()).toHaveLength(1);
        expect(screen.getByText("test-toast-0")).toBeInTheDocument();
    });
    it('has no toast if store is empty', () => {
        render();
        expect(query.Root()).not.toBeInTheDocument();
    });

    describe('properties', () => {
        beforeEach(() => {
            renderWithToast([createToast(0, {
                text: "test-toast-text",
                title: "test-toast-title",
                actionText: "test-toast-action",
            })]);
        });
        it("has text", () => expect(get.Text()).toHaveTextContent("test-toast-text"));
        it("has title", () => expect(get.Title()).toHaveTextContent("test-toast-title"));
        it("has action button", () => expect(get.Button()).toHaveTextContent("test-toast-action"));
    });

    describe('actions', () => {
        const onClose = jest.fn();
        const duration = 5000;
        beforeEach(() => {
            onClose.mockReset();
            renderWithToast(
                repeat(2, i => createToast(i, {
                    text: "test-toast-"+i,
                    canDismiss: true,
                    duration,
                    onClose,
                })),
            );
        });

        it('can close a Toast by clicking', () => {
            expect(get.Text()).toHaveTextContent("test-toast-0");
            trigger.fullScreenBackground.click();
            expect(onClose).toHaveBeenCalledWith(false, false);
            expect(screen.queryByText("test-toast-0")).not.toBeInTheDocument();
            expect(screen.queryByText("test-toast-1")).toBeInTheDocument();
        });
        it('can click action button', () => {
            expect(screen.queryByText("test-toast-0")).toBeInTheDocument();
            trigger.Button.click();
            expect(onClose).toHaveBeenCalledWith(true, false);
            expect(screen.queryByText("test-toast-0")).not.toBeInTheDocument();
            expect(screen.queryByText("test-toast-1")).toBeInTheDocument();
        });
        it("can timeout", () => {
            usingTimeTravel(() => {
                timeTravel(duration/2);
                expect(screen.queryByText("test-toast-0")).toBeInTheDocument();
                timeTravel(duration/2);
                expect(screen.queryByText("test-toast-0")).not.toBeInTheDocument();
                expect(screen.queryByText("test-toast-1")).toBeInTheDocument();
            });
        });
    });
    describe('close', () => {
        const onClose = jest.fn();
        const duration = 5000;
        beforeEach(() => {
            onClose.mockReset();
            renderWithToast(
                repeat(2, i => createToast(i, {
                    text: "test-toast-"+i,
                    duration,
                    onClose,
                })),
            );
        });

        it('can close a Toast by clicking', () => {
            expect(query.Root()).toBeInTheDocument();
            usingTimeTravel(() => {
                expect(get.Text()).toHaveTextContent("test-toast-0");
                trigger.fullScreenBackground.click();

                expect(onClose).toHaveBeenCalledWith(false, false);
                expect(screen.queryByText("test-toast-0")).not.toBeInTheDocument();
                expect(screen.queryByText("test-toast-1")).toBeInTheDocument();

                timeTravel(ANIMATE_IN_DURATION);
                trigger.fullScreenBackground.click();
                expect(onClose).toHaveBeenCalledWith(false, false);
            });
            expect(query.Root()).not.toBeInTheDocument();
        });
        it('can click action button', () => {
            expect(query.Root()).toBeInTheDocument();
            usingTimeTravel(() => {
                expect(get.Text()).toHaveTextContent("test-toast-0");
                trigger.Button.click();

                expect(onClose).toHaveBeenCalledWith(true, false);
                expect(screen.queryByText("test-toast-0")).not.toBeInTheDocument();
                expect(screen.queryByText("test-toast-1")).toBeInTheDocument();

                timeTravel(ANIMATE_IN_DURATION);
                trigger.Button.click();
                expect(onClose).toHaveBeenCalledWith(true, false);
            });
            expect(query.Root()).not.toBeInTheDocument();
        });
        it("can timeout", () => {
            expect(query.Root()).toBeInTheDocument();
            usingTimeTravel(() => {
                expect(get.Text()).toHaveTextContent("test-toast-0");
                timeTravel(duration/2);
                expect(screen.queryByText("test-toast-0")).toBeInTheDocument(); // Check still there half-way
                timeTravel(duration/2);

                expect(onClose).toHaveBeenCalledWith(false, true);
                expect(screen.queryByText("test-toast-0")).not.toBeInTheDocument();
                expect(screen.queryByText("test-toast-1")).toBeInTheDocument();

                timeTravel(ANIMATE_IN_DURATION);
                timeTravel(duration);
                expect(onClose).toHaveBeenCalledWith(false, true);
            });
            expect(query.Root()).not.toBeInTheDocument();
        });
    });
    it("doesn't dismiss if canDismiss is false", () => {
        const onClose = jest.fn();
        renderWithToast([createToast(0, {canDismiss: false, onClose})]);
        expect(query.Root()).toBeInTheDocument();
        trigger.fullScreenBackground.click();
        expect(onClose).not.toBeCalled();
        expect(query.Root()).toBeInTheDocument();
    });

});
