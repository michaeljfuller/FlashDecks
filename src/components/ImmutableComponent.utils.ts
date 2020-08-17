import {produce, Draft} from "immer";

/** An Immer recipe function to set state. */
export interface StateRecipe<State, Properties> {
    (draft: Draft<State>, props: Properties): any;
}

/** A shallow object defining what to change state to. */
export type StateTemplate<State> = Partial<
    Record<keyof State, ShallowDataType>
>;
type ShallowDataType = string|number|boolean|undefined|null;

/** Prepare state to pass to setState()  from an Immer recipe function, or by shallow copying a template object. */
export function produceState<State, Properties>(templateOrRecipe: StateTemplate<State> | StateRecipe<State, Properties>) {
    if (templateOrRecipe instanceof Function) {
        return produceStateFromRecipe(templateOrRecipe);
    } else {
        return produceStateFromTemplate(templateOrRecipe);
    }
}

/** Prepare state to pass to setState() from an Immer recipe function. */
export function produceStateFromRecipe<State, Properties>(recipe: StateRecipe<State, Properties>) {
    return produce((draft: any, props: any) => {
        // Call passed recipe, not passing to `produce()` any value accidentally returned by arrow function.
        recipe(draft, props);
    });
}

/** Prepare state to pass to setState() by shallow copying a template object. */
export function produceStateFromTemplate<State>(template: StateTemplate<State>) {
    return produce((draft: any) => {
        // For each enumerable property in template, assign value to draft.
        Object.keys(template).forEach(
            key => draft[key] = (template as any)[key]
        );
    });
}
