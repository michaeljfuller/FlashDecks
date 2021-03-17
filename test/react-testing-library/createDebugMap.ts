import {screen} from "@testing-library/react";
import createQueryMap, {MatcherOptions, QueryMap} from "./createQueryMap";
import {BaseMap, ScreenQuery} from "./rtl-types";
import {mapToObject} from "../../src/utils/object";
import {isPromise} from "../../src/utils/async";
import {OmitFirstParam} from "../../src/utils/function";

/**
 * Call screen.debug, focusing on elements found by Matcher and Query.
 * @example
 *  const debug = createDebugMap(                                   // Create the map
 *      {Foo: 'foo'},                                               // Define matchers against keys
 *      {get: screen.getByTestId, getAll: screen.getAllByTestId}    // Define queries against keys
 *  );
 *  debug.get().Foo()                               // Run the matcher against the query and pass to screen.debug().
 *  debug.getAll({suggest:true}).Foo(10000)         // Add query options and specify maxLength of screen.debug().
 */
export function createDebugMap<
    Matchers extends BaseMap,
    Queries extends Record<string, ScreenQuery>,
    Executor extends OmitFirstParam<typeof debugCallback>
>(matchers: Matchers, queries: Queries): {
    screen: typeof screen.debug,
} & {
    [K in keyof Queries]: QueryMap<Queries[K], Matchers, any>
} {
    return Object.assign({
        screen: screen.debug,
    }, mapToObject(queries, query => ({
        value: createQueryMap(matchers, query, debugCallback),
    })));
}
export default createDebugMap;

function debugCallback({runQuery}: MatcherOptions<any>, maxLength?: number) {
    const selection = runQuery();

    // Handle an async response
    if (isPromise(selection)) {
        (selection as Promise<HTMLElement|HTMLElement[]>).then(response => {
            if (Array.isArray(response)) {
                (response as HTMLElement[]).filter(v => v).forEach(item => screen.debug(item, maxLength));
            } else if (response) {
                screen.debug(response, maxLength);
            }
        });
    } else {
        // Handle a sync response
        if (Array.isArray(selection)) {
            (selection as HTMLElement[]).filter(v => v).forEach(item => screen.debug(item, maxLength));
        } else if(selection) {
            screen.debug(selection as HTMLElement, maxLength);
        }
    }
}
