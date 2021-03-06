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
    onEditing?: (editing: boolean) => void;
}
export interface CardViewBaseState {
    modifiedCard: CardModel|null;
    sideIndex: number;
    viewLayout: LayoutRectangle;
    editing?: boolean;
    editingContent: boolean
    showDeleteSidePrompt: boolean;
    showCreateCardModal: boolean;
    showEditCardModal: boolean;
}

export abstract class CardViewBase<
    State extends CardViewBaseState = CardViewBaseState
> extends ImmutablePureComponent<CardViewProps, State> {
    readonly state = {
        modifiedCard: null,
        sideIndex: 0,
        viewLayout: { x: 0, y: 0, width: 0, height: 0 },
        editingContent: false,
        showDeleteSidePrompt: false,
        showCreateCardModal: false,
        showEditCardModal: false,
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
        if (prevProps.item?.transientKey !== this.props.item?.transientKey) {
            this.setStateTo({
                sideIndex: 0,
                modifiedCard: null,
            });
        }
        const currSides = this.card.sides.length;
        if (this.state.sideIndex >= currSides) {
            this.setStateTo({ sideIndex: currSides-1 });
        }
    }

    updateCard(card: CardModel = this.card) {
        this.props.onUpdate && this.props.onUpdate(card, this.props.itemIndex || 0);
    }

    startEditing() {
        this.setStateTo({ editing: true });
        this.props.onEditing && this.props.onEditing(true);
    }
    stopEditing() {
        this.setStateTo({ editing: false, modifiedCard: null });
        this.props.onEditing && this.props.onEditing(false);
    }

    /** Add a new slide before this one. */
    addSideBefore() {
        const modifiedCard = this.card.update({
            sides: insertItem(this.card.sides, this.state.sideIndex, new CardSideModel)
        });
        this.setStateTo(draft => draft.modifiedCard = castDraft(modifiedCard));
    }

    /** Add a new slide after this one. */
    addSideAfter() {
        const modifiedCard = this.card.update({
            sides: insertItem(this.card.sides, this.state.sideIndex+1, new CardSideModel)
        });
        this.setStateTo(draft => {
            draft.modifiedCard = castDraft(modifiedCard);
            draft.sideIndex++;
        });
    }

    /** Add a new slide to the end. */
    addSideToEnd() {
        const modifiedCard = this.card.update(draft => draft.sides.push(new CardSideModel));
        this.setStateTo(draft => {
            draft.modifiedCard = castDraft(modifiedCard);
            draft.sideIndex = modifiedCard.sides.length - 1;
        });
    }

    showCreateCardModal = () => this.setStateTo({ showCreateCardModal: true });
    hideCreateCardModal = () => this.setStateTo({ showCreateCardModal: false });

    showDeleteSidePrompt = () => this.setStateTo({ showDeleteSidePrompt: true });
    hideDeleteSidePrompt = () => this.setStateTo({ showDeleteSidePrompt: false });

    showEditCardModal = () => this.setStateTo({ showEditCardModal: true });
    hideEditCardModal = () => this.setStateTo({ showEditCardModal: false });

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

    onEditingContent = (editingContent: boolean) => this.setStateTo({editingContent});

    onPress = () => {
        this.canPress && this.nextSide();
    }

    onSideChange = (side: CardSideModel|null) => {
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
