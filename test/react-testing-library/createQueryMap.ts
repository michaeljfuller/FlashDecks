import type {Matcher} from "@testing-library/react";
import type {OmitFirst} from "../../src/utils/type";
import type {RecordValue} from "../../src/utils/type";
import {mapToObject} from "../../src/utils/object";
import {MatchOptions, applyMatchOptions} from "./matcherOptions";

/**
 * Create a helper object that wraps `screen[queryName](match, ...params)` around the keys of the matcherMap.
 * @example
 *  const get = createQueryMap({Username: 'username-input' }, screen.getByTestId);
 *  const username = get.Username();
 */
export function createQueryMap<
    Map extends Record<string, Match>,
    Query extends (match: Match, ...rest: any) => any,

    Match extends Matcher = RecordValue<Map>,
    Value extends QueryFunction<Match, Query>
                = QueryFunction<Match, Query>,
>(
    matcherMap: Map,
    query: Query,
    ...params: OmitFirst<Parameters<Query>>
): Record<keyof Map, Value> {
    return mapToObject<Map, Value>(matcherMap, (match: Match) => {
        const value = (
            (options?: MatchOptions<Match>) => {
                return query(
                    applyMatchOptions(match, options),
                    ...params
                );
            }
        ) as Value;
        return { value };
    });
}
export default createQueryMap;

/** Function that calls the query. */
type QueryFunction<
    Match extends Matcher,
    Query extends (...args: any) => any,
> = (
    options?: MatchOptions<Match>
) => ReturnType<Query>;
