import produce, {Draft, Immutable} from "immer";
import {IAction} from "./store_actions";

/** Immer recipe for a reducer to update state. */
export interface ReducerRecipe<State, Action> {
    (draft: Draft<State>, action: Action): void;
}

/**
 * Typed facade for creating a reducer with Immer.
 * @example
 *  createReducer<CounterState>(
 *      (draft, action) => {
 *          switch (action.type) {
 *              case 'inc': return draft.value++;
 *              case 'dec': return draft.value--;
 *          }
 *      }, { value: 0 }
 *  );
 */
export function createReducer<State extends {}, Action=IAction>(
    recipe: ReducerRecipe<State, Action>,
    initialState: Immutable<State> = {} as Immutable<State>
) {
    return produce(
        (draft, action) => {
            recipe(draft, action); // Call recipe without accidental return values being passed back to produce().
        },
        initialState
    );
}
