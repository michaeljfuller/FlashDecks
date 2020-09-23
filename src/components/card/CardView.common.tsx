import {LayoutChangeEvent, LayoutRectangle, ViewStyle} from "react-native";
import React from "react";
import ImmutablePureComponent, {castDraft} from "../ImmutablePureComponent";
import {CardModel, CardSideModel} from "../../models";
import {insertItem, removeItem, replaceItem} from "../../utils/array";
import {minMax} from "../../utils/math";

export interface CardViewProps {
    item: CardModel;
    itemIndex?: number;
    style?: ViewStyle|ViewStyle[];
    editable?: boolean;
    onUpdate?: (item: CardModel, index: number) => void;
}
export interface CardViewBaseState {
    modifiedCard: CardModel|null;
    sideIndex: number;
    viewLayout: LayoutRectangle;
    editing?: boolean;
    showDeleteSlidePrompt: boolean;
    showCreateCardModal: boolean;
}

export abstract class CardViewBase<
    State extends CardViewBaseState = CardViewBaseState
> extends ImmutablePureComponent<CardViewProps, State> {
    readonly state = {
        modifiedCard: null,
        sideIndex: 0,
        viewLayout: { x: 0, y: 0, width: 0, height: 0 },
        showDeleteSlidePrompt: false,
        showCreateCardModal: false,
    } as State;

    get card(): CardModel {
        return this.state.modifiedCard || this.props.item || new CardModel;
    }

    get sides(): readonly CardSideModel[] {
        return this.card?.sides || [];
    }

    get currentSide(): CardSideModel|undefined {
        return this.sides[this.currentSideIndex];
    }

    get currentSideIndex(): number {
        return this.state.sideIndex;
    }

    get hasActions(): boolean {
        return this.props.editable || false;
    }

    get canPress(): boolean {
        return this.sides.length > 1 && !this.state.editing;
    }

    componentDidUpdate(prevProps: Readonly<CardViewProps>/*, prevState: Readonly<CardViewState>, snapshot?: any*/) {
        if (prevProps.item?.id !== this.props.item?.id) { // Card changed TODO Not rely on ID.
            this.setStateTo({
                sideIndex: 0,
                modifiedCard: null,
            });
        }
    }

    updateCard(card: CardModel = this.card) {
        this.props.onUpdate && this.props.onUpdate(card, this.props.itemIndex || 0);
    }
    addSide() {
        console.log('CardView.addSide');
    }

    onClickEdit = () => this.setStateTo({ editing: true });
    onClickCancel = () => this.setStateTo({ editing: false, modifiedCard: null });
    onClickDone = () => {
        console.group('CardView.onClickDone');
        console.log(this.state.modifiedCard);
        this.updateCard();
        this.setStateTo({ editing: false, modifiedCard: null });
        console.groupEnd();
    }

    /** Add a new slide before this one. */
    onAddBefore = () => {
        const modifiedCard = this.card.update({
            sides: insertItem(this.card.sides, this.state.sideIndex, new CardSideModel)
        });
        console.info('TODO', 'CardView.onAddBefore', this.state.sideIndex, modifiedCard); // TODO
        this.setStateTo(draft => draft.modifiedCard = castDraft(modifiedCard));
    }

    /** Add a new slide after this one. */
    onAddAfter = () => {
        const modifiedCard = this.card.update({
            sides: insertItem(this.card.sides, this.state.sideIndex+1, new CardSideModel)
        });
        this.setStateTo(draft => {
            draft.modifiedCard = castDraft(modifiedCard);
            draft.sideIndex++;
        });
    }

    showCreateCardModal = () => this.setStateTo({ showCreateCardModal: true });
    hideCreateCardModal = () => this.setStateTo({ showCreateCardModal: false });

    showDeleteSlidePrompt = () => this.setStateTo({ showDeleteSlidePrompt: true });
    hideDeleteSlidePrompt = () => this.setStateTo({ showDeleteSlidePrompt: false });

    onDeleteSide = () => {
        this.setStateTo(draft => {
            const modifiedCard = this.card.update({
                sides: removeItem(this.card.sides, this.state.sideIndex)
            });
            draft.modifiedCard = castDraft(modifiedCard);
            draft.sideIndex = minMax(this.state.sideIndex, 0, modifiedCard.sides.length-1);
        });
    }

    /** Record the view size to calculate the available size of the body from. */
    onLayout = (event: LayoutChangeEvent) => {
        const viewLayout = event.nativeEvent.layout;
        this.setStateTo(draft => draft.viewLayout = viewLayout);
    }

    onPress = () => {
        this.canPress && this.nextSide();
    }

    onSideChange = (side: CardSideModel|null) => {
        console.log('CardView.onSideChange', side);
        let card = this.card;

        if (side) {
            card = card.update({
                sides: replaceItem(card.sides, this.state.sideIndex, side)
            });
        } else {
            card = card.update({
                sides: removeItem(card.sides, this.state.sideIndex)
            });
        }
        this.setStateTo(draft => draft.modifiedCard = castDraft(card));
    }

    nextSide() {
        this.setStateTo({ // Increment by one, resetting to 0 if it exceeds range.
            sideIndex: (this.state.sideIndex + 1) % (this.sides.length || 1)
        });
    }
}
export default CardViewBase;
