import React from "react";
import {fireEvent, render, RenderResult, screen} from "@testing-library/react";
import {ComponentUnion, ComponentProps} from "../src/utils/component";

import createQueryMap from "./react-testing-library/createQueryMap";
import createFireEventMap from "./react-testing-library/createFireEventMap";
import {mapToObject} from "../src/utils/object";

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
        get:   createQueryMap(testIDs, getByTestId, element => element),
        query: createQueryMap(testIDs, queryByTestId, element => element),
        find:  createQueryMap(testIDs, findByTestId, element => element),

        getAll:   createQueryMap(testIDs, getAllByTestId, element => element),
        queryAll: createQueryMap(testIDs, queryAllByTestId, element => element),
        findAll:  createQueryMap(testIDs, findAllByTestId, element => element),

        expectHas: createQueryMap(testIDs, queryByTestId, element => expect(element).toBeInTheDocument()),
        expectMissing: createQueryMap(testIDs, queryByTestId, element => expect(element).not.toBeInTheDocument()),

        event: mapToObject(testIDs, testId => ({
            value: (event) => fireEvent(getByTestId(testId), event),
        })) as Record<keyof TestIDs, (event: Event) => boolean>,

        click: createFireEventMap(testIDs, getByTestId, "click"),
        input: createFireEventMap(testIDs, getByTestId, "input"),
        change: createFireEventMap(testIDs, getByTestId, "change"),
    };
}
