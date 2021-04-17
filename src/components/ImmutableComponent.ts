import React from 'react';
export * from 'immer';
import {produceState, StateRecipe, StateTemplate} from "./ImmutableComponent.utils";

/**
 * A component with helpers for immutable state management.
 * To be used over ImmutablePureComponent, when the component has children passed.
 */
export default class ImmutableComponent<
    Properties={}, State={}, SnapShot={}
> extends React.Component<
    Properties, State, SnapShot
> {
    /** Update the state in an immutable way, using either; an Immer recipe function, or a shallow template object to copy values from. */
    setStateTo(templateOrRecipe: StateTemplate<State> | StateRecipe<State, Properties>) {
        super.setState( produceState(templateOrRecipe) );
    }
}
