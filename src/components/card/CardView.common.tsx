import {LayoutChangeEvent, LayoutRectangle, ViewStyle} from "react-native";
import React from "react";
import Card from "@material-ui/core/Card";
import CardSide from "./CardSide/CardSide";

export interface CardViewProps {
    item: Card;
    style?: ViewStyle|ViewStyle[];
    editable?: boolean;
    onUpdate?: (item: Card) => void;
}
export interface CardViewBaseState {
    sideIndex: number;
    viewLayout: LayoutRectangle;
    editing?: boolean;
}

export abstract class CardViewBase<
    State extends CardViewBaseState = CardViewBaseState
> extends React.Component<CardViewProps, State> {
    state = {
        sideIndex: 0,
        viewLayout: { x: 0, y: 0, width: 0, height: 0 },
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

    get hasActions(): boolean {
        return this.props.editable || false;
    }

    get canPress(): boolean {
        return this.sides.length > 1 && !this.state.editing;
    }

    componentDidUpdate(prevProps: Readonly<CardViewProps>/*, prevState: Readonly<CardViewState>, snapshot?: any*/) {
        if (prevProps.item?.id !== this.props.item?.id) { // Card changed
            this.setState({ sideIndex: 0 }); // Reset sideIndex
        }
    }

    onClickEdit = () => this.setState({ editing: true });
    onClickCancel = () => this.setState({ editing: false });
    onClickDone = () => this.setState({ editing: false });

    /** Record the view size to calculate the available size of the body from. */
    onLayout = (event: LayoutChangeEvent) => {
        this.setState({ viewLayout: event.nativeEvent.layout });
    }

    onPress = () => {
        this.canPress && this.nextSide();
    }

    nextSide() {
        this.setState({ // Increment by one, resetting to 0 if it exceeds range.
            sideIndex: (this.state.sideIndex + 1) % (this.sides.length || 1)
        });
    }
}
export default CardViewBase;
