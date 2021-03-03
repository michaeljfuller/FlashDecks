import type {Matcher} from "@testing-library/react";
import type {OmitFirst} from "../../src/utils/type";
import {mapToObject} from "../../src/utils/object";
import {MatchOptions, applyMatchOptions} from "./matcherOptions";

/**
 * Create a helper object that wraps a callback around the keys of the matcherMap.
 * @example
 *  const get = createQueryMap({Username: 'username'}, screen.getByTestId, element => element;
 *  const username = get.Username();
 *  const expectExists = createQueryMap({Username: 'username'}, screen.queryByTestId, element => expect(element).not.toBeNull();
 *  expectExists.Username();
 */
export function createQueryMap<
    Map extends Record<string, Match>,
    Query extends (match: Match, ...rest: any) => any,
    Match extends Matcher,
    Callback extends (element: ReturnType<Query>, key: string, match: Match) => any,
    Value extends MatchFunction<Match, Query, ReturnType<Callback>>,
>(
    matcherMap: Map,
    query: Query,
    callback: Callback,
): Record<keyof Map, Value> {
    return mapToObject<Map, Value>(matcherMap, (match: Match, key) => {
        const value = (
            (matchOptions?: MatchOptions<Match>, ...queryParams: any) => {
                const element = query(
                    applyMatchOptions(match, matchOptions),
                    ...queryParams
                );
                return callback(element, key as string, match);
            }
        ) as Value;
        return { value };
    });
}
export default createQueryMap;

/** Property of map created by createQueryRunnerMap to narrow search. */
type MatchFunction<
    Match extends Matcher = any,
    Query extends (match: Match, ...rest: any) => any = any,
    Returns = any
> = (
    matchOptions?: MatchOptions<Match>,
    ...queryParams: OmitFirst<Parameters<Query>>
) => Returns;
