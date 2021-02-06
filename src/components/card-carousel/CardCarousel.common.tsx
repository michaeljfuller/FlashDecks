import React from "react";
import {ViewStyle} from "react-native";
import {CardModel} from "../../models";
import {fitAspectRatio} from "../../utils/math";
import ImmutablePureComponent from "../ImmutablePureComponent";
import {CardInfo, CardInfoModal} from "../card/CardInfo/CardInfoModal";

export interface CardCarouselProps {
    cards?: CardModel[];
    style?: ViewStyle;
    editable?: boolean;
    onSetCard?: CardCarouselOnSetCard;
    onScrollCards?: CardCarouselScrollCards;
}
export type CardCarouselOnSetCard = (card: CardModel, index: number) => void;
export type CardCarouselScrollCards = (index: number) => void;
export interface CardCarouselBaseState {
    showCreateCardModal: boolean;
}

export class CardCarouselBase<State extends CardCarouselBaseState> extends ImmutablePureComponent<CardCarouselProps, State>{

    onSetCard = (card: CardModel, index: number) => {
        this.props.onSetCard && this.props.onSetCard(card, index);
    }
    onAddCard = (info: CardInfo) => {
        this.onSetCard(CardModel.create(info), this.props.cards?.length || 0);
    }

    onShowCreateCardModal = () => this.setStateTo({ showCreateCardModal: true });
    onHideCreateCardModal = () => this.setStateTo({ showCreateCardModal: false });

    renderCreateCardModal() {
        return <CardInfoModal
            editable
            open={this.state.showCreateCardModal}
            onChange={this.onAddCard}
            onClose={this.onHideCreateCardModal}
        />;
    }

}

export const cardAspectRatio = 0.7;

/** Resize the card to conform to the aspect ratio. */
export function resizeCard(
    width: number,
    height: number,
    cardMarginHorizontal = 10,
    cardMarginVertical = 10,
    minSize = 100
) {
    width -= cardMarginHorizontal * 2;
    height -= cardMarginVertical * 2;

    width = Math.max(width, minSize);
    height = Math.max(height, minSize);

    return fitAspectRatio(width, height, cardAspectRatio);
}
