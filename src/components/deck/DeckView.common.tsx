import React from "react";
import {View, StyleSheet} from "react-native";
import Tag from "../tag/Tag";
import CardView from "../card/CardView";

export interface DeckViewProps {
    item: Deck;
}

export default class DeckViewBase<State = {}> extends React.Component<DeckViewProps, State>{

    renderTags() {
        const {tags} = this.props.item;

        if (tags && tags.length) {
            return <View style={styles.tagsView}>
                {tags.map(tag => <Tag key={tag} value={tag} />)}
            </View>;
        }
        return null;
    }

    renderCards() {
        return (this.props.item.cards||[]).map(card => {
            return <View key={card.id} style={styles.cardView}>
                <CardView item={card} />
            </View>;
        });
    }

}

const styles = StyleSheet.create({
    tagsView: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-end",
    },
    cardView: {
        marginTop: 5,
        maxWidth: 550,
        marginHorizontal: 'auto',
    },
});
