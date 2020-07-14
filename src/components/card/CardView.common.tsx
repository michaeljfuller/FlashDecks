import {ViewStyle} from "react-native";
import React from "react";
import Card from "@material-ui/core/Card";
import CardSide from "./CardSide/CardSide";

export interface CardViewProps {
    item: Card;
    style?: ViewStyle|ViewStyle[];
}
export interface CardViewState {
    sideIndex: number;
}

export abstract class CardViewBase<
    State extends CardViewState = CardViewState
> extends React.Component<CardViewProps, State> {
    state = {
        sideIndex: 0,
    } as State;

    get card(): Card|undefined {
        return this.props.item;
    }

    get sides(): CardSide[] {
        return this.card?.sides || [];
    }

    get currentSide(): CardSide|undefined {
        return this.sides[this.state.sideIndex];
    }

    componentDidUpdate(prevProps: Readonly<CardViewProps>/*, prevState: Readonly<CardViewState>, snapshot?: any*/) {
        if (prevProps.item?.id !== this.props.item?.id) { // Card changed
            this.setState({ sideIndex: 0 }); // Reset sideIndex
        }
    }

    nextSide() {
        this.setState({ // Increment by one, resetting to 0 if it exceeds range.
            sideIndex: (this.state.sideIndex + 1) % (this.sides.length || 1)
        });
    }
}
