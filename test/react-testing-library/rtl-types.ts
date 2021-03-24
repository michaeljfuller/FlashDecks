import {BoundFunction, Matcher, Query} from "@testing-library/react";
import {OmitFirst} from "../../src/utils/type";

export type {Matcher, EventType} from "@testing-library/react";

/** The map of matchers passed to createQueryMap(). */
export type BaseMap<Match extends Matcher = Matcher> = Record<string, Matcher>;

/** Additional parameters that can be passed for a specific query. */
export type QueryParams<Query extends ScreenQuery> = OmitFirst<Parameters<Query>>;

/** A query that can be passed to createQueryMap() */
export type ScreenQuery = BoundFunction<Query>;
