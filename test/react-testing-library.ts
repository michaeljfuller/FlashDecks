import React from "react";
import {render, RenderResult, screen} from "@testing-library/react";
import type {ComponentUnion, ComponentProps} from "../src/utils/component";

import createQueryMap from "./react-testing-library/createQueryMap";
import createEventMap from "./react-testing-library/createEventMap";

type BaseTestIDs = Record<string, string>;
const {getByTestId, queryByTestId, findByTestId, getAllByTestId, queryAllByTestId, findAllByTestId} = screen;

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

export function createTestIdHelpers<TestIDs extends BaseTestIDs>(testIDs: TestIDs) {
    return {
        get:   createQueryMap(testIDs, getByTestId),
        query: createQueryMap(testIDs, queryByTestId),
        find:  createQueryMap(testIDs, findByTestId),

        getAll:   createQueryMap(testIDs, getAllByTestId),
        queryAll: createQueryMap(testIDs, queryAllByTestId),
        findAll:  createQueryMap(testIDs, findAllByTestId),

        expectHas: createQueryMap(testIDs, queryByTestId, ({runQuery}) => expect(runQuery()).toBeInTheDocument()),
        expectMissing: createQueryMap(testIDs, queryByTestId, ({runQuery}) => expect(runQuery()).not.toBeInTheDocument()),

        trigger: createEventMap(testIDs, getByTestId),
    };
}
