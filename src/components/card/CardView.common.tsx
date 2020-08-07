import {LayoutChangeEvent, LayoutRectangle, ViewStyle} from "react-native";
import React from "react";
import {CardModel, CardSideModel} from "../../models";

export interface CardViewProps {
    item: CardModel;
    style?: ViewStyle|ViewStyle[];
    editable?: boolean;
    onUpdate?: (item: CardModel) => void;
}
export interface CardViewBaseState {
    sideIndex: number;
    sideModifications: CardSideModel|null;
    viewLayout: LayoutRectangle;
    editing?: boolean;
}

export abstract class CardViewBase<
    State extends CardViewBaseState = CardViewBaseState
> extends React.Component<CardViewProps, State> {
    state = {
        sideIndex: 0,
        sideModifications: null,
        viewLayout: { x: 0, y: 0, width: 0, height: 0 },
    } as State;

    get card(): CardModel|undefined {
        return this.props.item;
    }

    get sides(): readonly CardSideModel[] {
        return this.card?.sides || [];
    }

    get currentSide(): CardSideModel|undefined {
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
    onClickCancel = () => this.setState({ editing: false, sideModifications: null });
    onClickDone = () => {
        this.applySideModifications();
        this.setState({ editing: false, sideModifications: null });
    }

    onAddBefore = () => {
        console.info('TODO', 'CardView.onAddBefore', this.state.sideIndex); // TODO
    }
    onAddAfter = () => {
        console.info('TODO', 'CardView.onAddAfter', this.state.sideIndex); // TODO
    }
    onDelete = () => {
        console.info('TODO', 'CardView.onDelete', this.state.sideIndex); // TODO
    }

    /** Record the view size to calculate the available size of the body from. */
    onLayout = (event: LayoutChangeEvent) => {
        this.setState({ viewLayout: event.nativeEvent.layout });
    }

    onPress = () => {
        this.canPress && this.nextSide();
    }

    onSideModifications = (sideModifications: CardSideModel|null) => {
        console.log('CardView.onSideModifications', sideModifications);
        this.setState({ sideModifications });
    }

    nextSide() {
        this.setState({ // Increment by one, resetting to 0 if it exceeds range.
            sideIndex: (this.state.sideIndex + 1) % (this.sides.length || 1)
        });
    }

    applySideModifications() {
        // TODO
        console.log('CardView.applySideModifications', {
            side: this.state.sideModifications
        });
    }
}
export default CardViewBase;
