import produce, {Draft, Immutable} from "immer";
export * from "immer";
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

export type SignedStoreObject<T> = T & { storeSymbol: symbol };

/** Add a unique symbol that can be compared inside our Redux store using compareSignedObjectForStore(), since it uses Immer Proxies. */
export function signObjectForStore<T>(obj: T, description: Parameters<typeof Symbol>[0]): SignedStoreObject<T> {
    const result = obj as SignedStoreObject<T>;
    if (result) {
        result.storeSymbol = Symbol(description);
    }
    return result;
}

/** Compare objects by their symbol, added by signObjectForStore() */
export function compareSignedObjectForStore<T>(a: SignedStoreObject<T>, b: SignedStoreObject<T>): boolean {
    return a?.storeSymbol === b?.storeSymbol;
}
