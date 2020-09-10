import React from "react";
import ImmutablePureComponent from "../../ImmutablePureComponent";
import {CardModel, DeckModel} from "../../../models";
import {CardCarouselScrollCards} from "../../card-carousel/CardCarousel.common";

export interface DeckViewProps {
    item: DeckModel;
    editable?: boolean;
    onChange?: DeckViewItemChange;
    onScrollCards?: DeckViewScrollCards;
}
export type DeckViewItemChange = (item: DeckModel) => void;
export type DeckViewScrollCards = CardCarouselScrollCards;

export default class DeckViewBase<State = {}> extends ImmutablePureComponent<DeckViewProps, State>{
    get cardCount() {
        return this.props.item.cards?.length || 0;
    }

    onCardsChange = (cards: CardModel[]) => {
        console.group('DeckViewBase.onCardsChange');
        console.log(cards);
        this.props.onChange && this.props.onChange(
            this.props.item.update({ cards })
        );
        console.groupEnd();
    }
}
