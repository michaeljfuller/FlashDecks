import React from "react";
import ImmutablePureComponent from "../../ImmutablePureComponent";
import {CardModel, DeckModel} from "../../../models";
import {CardCarouselScrollCards} from "../../card-carousel/CardCarousel.common";

export interface DeckViewProps {
    item: DeckModel;
    editable?: boolean;
    onSetCard?: DeckViewSetCard;
    onScrollCards?: DeckViewScrollCards;
    onEditingCard?: (editing: boolean) => void;
}

export type DeckViewSetCard = (card: CardModel, index: number) => void;
export type DeckViewScrollCards = CardCarouselScrollCards;

export default class DeckViewBase<State = {}> extends ImmutablePureComponent<DeckViewProps, State>{

    get deck(): DeckModel {
        return this.props.item;
    }
    get cards(): CardModel[] {
        return this.deck.cards || [];
    }

    onSetCard = (card: CardModel, index = 0) => {
        this.props.onSetCard && this.props.onSetCard(card, index);
    }

}
