import type {Matcher} from "@testing-library/react";
import type {OmitFirst} from "../../src/utils/type";
import {mapToObject} from "../../src/utils/object";

/**
 * Create a helper object that wraps `screen[queryName](match, ...params)` around the keys of the matcherMap.
 * @example
 *  const get = createQueryMap({Username: 'username-input' }, screen.getByTestId);
 *  const username = get.Username();
 */
export function createQueryMap<
    Match extends Matcher,
    Query extends (match: Match, ...rest: any) => any,
    Map extends Record<string, Match>,
    Key extends keyof Map,
    Result extends () => ReturnType<Query>
>(
    matcherMap: Map,
    query: Query,
    ...params: OmitFirst<Parameters<Query>>
): Record<Key, Result> {
    return mapToObject<Map, Result>(matcherMap, (match: Match) => {
        const value = (
            () => query(match, ...params)
        ) as Result;
        return { value };
    });
}
export default createQueryMap;
