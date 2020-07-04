import React from "react";
import {View, ViewStyle} from "react-native";
import CardView from "../card/CardView";

export interface DeckViewProps {
    item: Deck;
}

export default class DeckViewBase<State = {}> extends React.Component<DeckViewProps, State>{
    get cardCount() {
        return this.props.item.cards?.length || 0;
    }

    renderCards(style: ViewStyle) {
        return (this.props.item.cards||[]).map(card => {
            return <View key={card.id} style={style}>
                <CardView item={card} />
            </View>;
        });
    }

}
