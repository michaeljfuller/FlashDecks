import React from 'react';
import {produceState, StateRecipe, StateTemplate} from "./ImmutableComponent.utils";

/** A component with helpers for immutable state management. */
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
