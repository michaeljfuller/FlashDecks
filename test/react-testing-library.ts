import React from "react";
import {render, RenderResult} from "@testing-library/react";

import {ComponentUnion, ComponentProps} from "../src/utils/component";
import * as testIdHelpers from "./react-testing-library/testIdHelpers";

export function createRenderComponent<
    Component extends ComponentUnion,
    Props = ComponentProps<Component>,
    Partials = Partial<Props>
>(
    component: Component,
    defaultProps: ComponentProps<Component>
): (props?: Partials) => RenderResult {
    return (props?: Partials) => render(React.createElement(
        component,
        Object.assign({}, defaultProps, props)
    ));
}

export function createTestIdHelpers<TestIDs extends testIdHelpers.BaseTestIDs>(
    testIDs: TestIDs
) {
    return {
        get:   testIdHelpers.createTestIdGetters(testIDs),
        query: testIdHelpers.createTestIdQueries(testIDs),
        find:  testIdHelpers.createTestIdFinders(testIDs),

        getAll:   testIdHelpers.createAllTestIdGetters(testIDs),
        queryAll: testIdHelpers.createAllTestIdQueries(testIDs),
        findAll:  testIdHelpers.createAllTestIdFinders(testIDs),

        event: testIdHelpers.createTestIdEventEmitter(testIDs),
        click: testIdHelpers.createTestIdClickers(testIDs),
        input: testIdHelpers.createTestIdInputters(testIDs),
    };
}
