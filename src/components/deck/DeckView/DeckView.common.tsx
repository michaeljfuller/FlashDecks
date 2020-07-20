import React from "react";

export interface DeckViewProps {
    item: Deck;
    editable?: boolean;
    onItemChange?: DeckViewItemChange;
}
export type DeckViewItemChange = (item: Deck) => void;

export default class DeckViewBase<State = {}> extends React.Component<DeckViewProps, State>{
    get cardCount() {
        return this.props.item.cards?.length || 0;
    }
}
