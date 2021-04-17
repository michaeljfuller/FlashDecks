import React from 'react';
export * from 'immer';
import {produceState, StateRecipe, StateTemplate} from "./ImmutableComponent.utils";

/**
 * A component with helpers for immutable state management.
 * It extends PureComponent to do some optimisations, using shallow comparisons, expecting the props & state to be immutable.
 * Pure Components cannot handle `children` being passed.
 */
export default class ImmutablePureComponent<
    Properties={}, State={}, SnapShot={}
> extends React.PureComponent<
    Properties, State, SnapShot
> {

    /**
     * Not intended to be used by an ImmutablePureComponent. `setStateTo()` should be used instead.
     * Has a warning, rather than throw an error, as not to break the Liskov substitution principle.
     */
    setState<K extends keyof State>(
        state: ((prevState: Readonly<State>, props: Readonly<Properties>) => (Pick<State, K> | State | null)) | Pick<State, K> | State | null,
        callback?: () => void
    ) {
        console.warn(
            `Warning: ${this.constructor.name}.setState() called on an ImmutablePureComponent. Did you mean to use its immutable equivalent (setStateTo)?`,
            {instance: this, state, callback}
        );
        super.setState(state, callback);
    }

    /** Update the state in an immutable way, using either; an Immer recipe function, or a shallow template object to copy values from. */
    setStateTo(templateOrRecipe: StateTemplate<State> | StateRecipe<State, Properties>) {
        super.setState( produceState(templateOrRecipe) );
    }

}
