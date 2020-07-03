import React from "react";
import {View, ViewStyle} from "react-native";
import Tag from "../tag/Tag";
import CardView from "../card/CardView";

export interface DeckViewProps {
    item: Deck;
}

export default class DeckViewBase<State = {}> extends React.Component<DeckViewProps, State>{

    renderTags(style: ViewStyle) {
        const {tags} = this.props.item;

        if (tags && tags.length) {
            return <View style={style}>
                {tags.map(tag => <Tag key={tag} value={tag} />)}
            </View>;
        }
        return null;
    }

    renderCards(style: ViewStyle) {
        return (this.props.item.cards||[]).map(card => {
            return <View key={card.id} style={style}>
                <CardView item={card} />
            </View>;
        });
    }

}
