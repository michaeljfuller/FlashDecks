import React from "react";
import {fireEvent, render, RenderResult, screen} from "@testing-library/react";
import {ComponentUnion, ComponentProps} from "../src/utils/component";

import createQueryMap from "./react-testing-library/createQueryMap";
import createFireEventMap from "./react-testing-library/createFireEventMap";
import {mapToObject} from "../src/utils/object";

type BaseTestIDs = Record<string, string>;

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

export function createTestIdHelpers<
    TestIDs extends BaseTestIDs
>(
    testIDs: TestIDs
) {
    return {
        get:   createQueryMap(testIDs, screen.getByTestId),
        query: createQueryMap(testIDs, screen.queryByTestId),
        find:  createQueryMap(testIDs, screen.findByTestId),

        getAll:   createQueryMap(testIDs, screen.getAllByTestId),
        queryAll: createQueryMap(testIDs, screen.queryAllByTestId),
        findAll:  createQueryMap(testIDs, screen.findAllByTestId),

        event: mapToObject(testIDs, testId => ({
            value: (event) => fireEvent(screen.getByTestId(testId), event),
        })) as Record<keyof TestIDs, (event: Event) => boolean> ,

        click: createFireEventMap(testIDs, screen.getByTestId, "click"),
        input: createFireEventMap(testIDs, screen.getByTestId, "input"),
        change: createFireEventMap(testIDs, screen.getByTestId, "change"),
    };
}
