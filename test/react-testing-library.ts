import React from "react";
import {render, RenderResult, screen} from "@testing-library/react";
import type {ComponentUnion, ComponentProps} from "../src/utils/component";

import {BaseMap} from "./react-testing-library/rtl-types";
import createQueryMap from "./react-testing-library/createQueryMap";
import createEventMap from "./react-testing-library/createEventMap";
import createDebugMap from "./react-testing-library/createDebugMap";

const {getByTestId, queryByTestId, findByTestId, getAllByTestId, queryAllByTestId, findAllByTestId} = screen;

/** Create a function that renders a component using testing-library, while defining default properties. */
export function createRenderComponent<
    Component extends ComponentUnion,
    Props = ComponentProps<Component>,
>(
    component: Component,
    defaultProps: Props
): (props?: Partial<Props>) => RenderResult {
    return (props?: Partial<Props>) => render(React.createElement(
        component,
        Object.assign({}, defaultProps, props)
    ));
}

/**
 * Create a series of helper functions that get elements by TestID, and/or act on them.
 * const {get, trigger, debug} = createTestHelpers({Foo: 'foo', Bar: 'bar'});
 * const foo = get.Foo();
 * trigger.Bar.input("Hello world");
 * debug.query.Bar();
 */
export function createTestHelpers<Map extends BaseMap>(matchers: Map) { // Todo Rename to createTestIdHelpers
    return {
        get:   createQueryMap(matchers, getByTestId, ({runQuery}) => runQuery()),
        query: createQueryMap(matchers, queryByTestId, ({runQuery}) => runQuery()),
        find:  createQueryMap(matchers, findByTestId, ({runQuery}) => runQuery()),

        getAll:   createQueryMap(matchers, getAllByTestId, ({runQuery}) => runQuery()),
        queryAll: createQueryMap(matchers, queryAllByTestId, ({runQuery}) => runQuery()),
        findAll:  createQueryMap(matchers, findAllByTestId, ({runQuery}) => runQuery()),

        expectHas: createQueryMap(matchers, queryByTestId, ({runQuery}) => expect(runQuery()).toBeInTheDocument()),
        expectMissing: createQueryMap(matchers, queryByTestId, ({runQuery}) => expect(runQuery()).not.toBeInTheDocument()),

        trigger: createEventMap(matchers, getByTestId),

        debug: createDebugMap(matchers, {
            get: getByTestId,
            query: queryByTestId,
            find: findByTestId,
            getAll: getAllByTestId,
            queryAll: queryAllByTestId,
            findAll: findAllByTestId,
        }),
    };
}
