import type {Matcher, BaseMap, QueryParams, ScreenQuery} from "./rtl-types";
import type {OmitFirst} from "../../src/utils/type";
import {mapToObject} from "../../src/utils/object";
import {addPropertiesToFunction, OmitFirstParam} from "../../src/utils/function";

/*
    ###################################################################################################################
    #                                                     ANATOMY                                                     #
    ###################################################################################################################
    const getAndLog = createQueryMap(                               // `createQueryMap` creates the `QueryMap`.
        {Foo:'foo'},                                                // `BaseMap` containing the `Key`s and `Matcher`s.
        screen.getByTestId,                                         // `ScreenQuery` used to select element(s).
        ({query, key, matcher, queryParams=[]}, label="Found") => { // `ResultCallback` used to process the query,
            const selection = query(matcher, ...queryParams);       // with `MatcherOptions` passed from `Executor`.
            console.log(label, key, selection);
            return selection;
        }
    );
                                    // Use `Key` of the `BaseMap` to access `Executor` for that `Query` on the `QueryMap`.
    getAndLog.Foo("Found");         // Treat as a `QueryMapObject` and call the `Executor` with params for the `ResultCallback`.
    getAndLog({exact:true}).Foo();  // Treat as a `QueryMapFunction` to pass `QueryParams` and call the `Executor`.
 */

/**
 * Create a helper object that wraps a callback around the keys of the matcherMap.
 * @param {object} matchers             - A key-value pairs of testing-library Matcher,
 *                                        to be passed to a testing-library Query (e.g. strings for testId)
 * @param {function} query              - A testing-library Query. (e.g. `screen.getByTestId`)
 * @param {function} [resultCallback]   - A callback to modify the final output once the element has been selected.
 * @example
 *  const inputByTestId = createQueryMap(
 *      {Foo:'foo'},
 *      screen.getByTestId,
 *      ({runQuery}, value: string) => {
 *          const element = runQuery();
 *          return fireEvent.input(element, {target: {value}});
 *      }
 *  );
 *  inputByTestId.Foo('Hello World');
 *  inputByTestId({exact:false}).Foo('Hello World'); // Same as above, but with optional queryParams
 */
export function createQueryMap<
    Matchers extends BaseMap,
    ResultCallback extends BaseResultCallback<Query>,
    Query extends ScreenQuery,
    Executor extends BaseExecutor<ResultCallback>
> (
    matchers: Matchers,
    query: Query,
    resultCallback = ( ({runQuery}) => runQuery() ) as ResultCallback,
): QueryMap<Query, Matchers, Executor> {
    // Create QueryMapFunction & QueryMapObject
    return addPropertiesToFunction<
        QueryMapFunction<Query, Matchers, Executor>,
        QueryMapObject<Matchers, Executor>
    >(
        // Using as QueryMapFunction allows you to pass QueryParams to createObject
        (...queryParams: QueryParams<Query>) => createObject(
            matchers, query, resultCallback, queryParams
        ),
        // Accessing as QueryMapObject calls createObject without optional QueryParams
        createObject(matchers, query, resultCallback)
    );
}
export default createQueryMap;

/** Creates the QueryMapObject for createQueryMap(), with Executors bound to the keys. */
function createObject<
    Matchers extends BaseMap,
    ResultCallback extends BaseResultCallback<Query>,
    Query extends ScreenQuery,
    Executor extends BaseExecutor<ResultCallback>
>(
    matchers: Matchers,
    query: Query,
    resultCallback: ResultCallback,
    queryParams?: QueryParams<Query>,
): QueryMapObject<Matchers, Executor> {
    // Bind an Executor to each key in Matchers, which triggers the ResultCallback.
    return mapToObject(
        matchers,
        (matcher: Matcher, key) => ({
            value: ((...resultArgs: OmitFirst<Parameters<ResultCallback>>) => resultCallback(
                {
                    key: key as string,
                    matcher,
                    query,
                    queryParams,
                    runQuery: () => {
                        return query(matcher, ...(queryParams||[])) as ReturnType<Query>;
                    }
                },
                ...resultArgs
            )) as Executor
        })
    );
}

//<editor-fold desc="Types">

/** The output of createQueryMap(). Can be used as an object or a function to access the Executor. */
export type QueryMap<
    Query extends ScreenQuery,
    Matchers extends BaseMap,
    Executor extends BaseExecutor<any>,
> = QueryMapObject<Matchers, Executor>
  & QueryMapFunction<Query, Matchers, Executor>

/**
 * Object returned by QueryMapFunction() & createObject() with same keys as Matchers,
 * with values that run the callbacks to query and process elements.
 */
type QueryMapObject<
    Matchers extends BaseMap,
    Executor extends BaseExecutor<any>,
> = { [K in keyof Matchers]: Executor };

/** The function returned by createQueryMap(), whose arguments feed the ResultCallback. */
type QueryMapFunction<
    Query extends ScreenQuery,
    Matchers extends BaseMap,
    Executor extends BaseExecutor<any>,
> = (...queryParams: QueryParams<Query>) => QueryMapObject<Matchers, Executor>;

/** The callback that triggers the Executor */
export type BaseResultCallback<
    Query extends ScreenQuery,
> = (matcherOptions: MatcherOptions<Query>, ...rest: any[]) => ReturnType<Query>;

/**
 * Query options passed to callback by createValue()
 * @property {string} key           - The selected key from the MatcherMap.
 * @property {any} matcher          - The selected Matcher from the MatcherMap.
 * @property {function} query       - The chosen Query to use.
 * @property {array} queryParams    - Optional parameters for the Query.
 * @property {function} runQuery    - Wrapper to run the query with the matcher and queryParams.
 */
export interface MatcherOptions<Query extends ScreenQuery> {
    key: string;
    matcher: Matcher;
    query: Query;
    queryParams?: QueryParams<Query>;
    runQuery: () => ReturnType<Query>;
}

/** A function produced by createQueryMap(), that triggers the ResultCallback to run the query and return processed result. */
export type BaseExecutor<
    ResultCallback extends BaseResultCallback<any>,
> = OmitFirstParam<ResultCallback>;

//</editor-fold>
