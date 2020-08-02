import {Draft} from "immer";

/** Properties to exclude from update. */
type ModelUpdateExcludesBase = 'update'|'updateFromCallback'|'updateFromObject';

/** The callback passed to Model.updateFromCallback(). */
export interface ModelUpdateCallback<
    Target,
    Excludes extends string = ''
> {
    (draft: Omit<Draft<Target>, Excludes|ModelUpdateExcludesBase>): void;
}

/** The object passed to Model.updateFromObject(). */
export type ModelUpdateObject<
    Target,
    Excludes extends string = ''
> = Partial<
    Omit<Target, Excludes|ModelUpdateExcludesBase>
>;

/** The object or callback passed to Model.update(). */
export type ModelUpdateUnion<
    Target,
    Excludes extends string
> = ModelUpdateCallback<Target, Excludes>|ModelUpdateObject<Target, Excludes>
