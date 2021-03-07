import React from "react";
import {render, RenderResult, screen} from "@testing-library/react";
import type {ComponentUnion, ComponentProps} from "../src/utils/component";

import createQueryMap from "./react-testing-library/createQueryMap";
import createEventMap from "./react-testing-library/createEventMap";
import {BaseMap} from "./react-testing-library/rtl-types";

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

export function createTestHelpers<Map extends BaseMap>(matchers: Map) {
    return {
        get:   createQueryMap(matchers, getByTestId),
        query: createQueryMap(matchers, queryByTestId),
        find:  createQueryMap(matchers, findByTestId),

        getAll:   createQueryMap(matchers, getAllByTestId),
        queryAll: createQueryMap(matchers, queryAllByTestId),
        findAll:  createQueryMap(matchers, findAllByTestId),

        expectHas: createQueryMap(matchers, queryByTestId, ({runQuery}) => expect(runQuery()).toBeInTheDocument()),
        expectMissing: createQueryMap(matchers, queryByTestId, ({runQuery}) => expect(runQuery()).not.toBeInTheDocument()),

        trigger: createEventMap(matchers, getByTestId),
    };
}
