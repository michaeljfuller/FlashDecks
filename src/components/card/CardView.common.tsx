import {LayoutChangeEvent, LayoutRectangle, ViewStyle} from "react-native";
import React from "react";
import {CardModel, CardSideModel} from "../../models";
import {insertItem, removeItem} from "../../utils/array";
import {minMax} from "../../utils/math";

export interface CardViewProps {
    item: CardModel;
    style?: ViewStyle|ViewStyle[];
    editable?: boolean;
    onUpdate?: (item: CardModel) => void;
}
export interface CardViewBaseState {
    modifiedCard: CardModel|null;
    sideIndex: number;
    sideModifications: CardSideModel|null;
    viewLayout: LayoutRectangle;
    editing?: boolean;
}

export abstract class CardViewBase<
    State extends CardViewBaseState = CardViewBaseState
> extends React.Component<CardViewProps, State> {
    state = {
        modifiedCard: null,
        sideIndex: 0,
        sideModifications: null,
        viewLayout: { x: 0, y: 0, width: 0, height: 0 },
    } as State;

    get card(): CardModel {
        return this.state.modifiedCard || this.props.item || new CardModel;
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
            this.setState({
                sideIndex: 0,
                modifiedCard: null,
                sideModifications: null,
            });
        }
    }

    onClickEdit = () => this.setState({ editing: true });
    onClickCancel = () => this.setState({ editing: false, sideModifications: null });
    onClickDone = () => {
        this.applySideModifications();
        this.setState({ editing: false, sideModifications: null });
    }

    /** Add a new slide before this one. */
    onAddBefore = () => {
        const modifiedCard = this.card.update({
            sides: insertItem(this.card.sides, this.state.sideIndex, new CardSideModel)
        });
        console.info('TODO', 'CardView.onAddBefore', this.state.sideIndex, modifiedCard); // TODO
        this.setState({ modifiedCard });
    }
    /** Add a new slide after this one. */
    onAddAfter = () => {
        const modifiedCard = this.card.update({
            sides: insertItem(this.card.sides, this.state.sideIndex+1, new CardSideModel)
        });
        console.info('TODO', 'CardView.onAddAfter', this.state.sideIndex, modifiedCard); // TODO
        this.setState({ modifiedCard, sideIndex: this.state.sideIndex + 1 });
    }
    /** Delete this slide. */
    onDelete = () => {
        const modifiedCard = this.card.update({
            sides: removeItem(this.card.sides, this.state.sideIndex)
        });
        console.info('TODO', 'CardView.onDelete', this.state.sideIndex, modifiedCard); // TODO

        this.setState({
            modifiedCard,
            sideIndex: minMax(this.state.sideIndex, 0, modifiedCard.sides.length-1),
        });
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
