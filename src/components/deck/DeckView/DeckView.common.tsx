import React from "react";
import {CardModel, DeckModel} from "../../../models";

export interface DeckViewProps {
    item: DeckModel;
    editable?: boolean;
    onChange?: DeckViewItemChange;
}
export type DeckViewItemChange = (item: DeckModel) => void;

export default class DeckViewBase<State = {}> extends React.Component<DeckViewProps, State>{
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
