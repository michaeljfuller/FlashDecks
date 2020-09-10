import React from "react";
import {View, StyleSheet} from "react-native";
import DeckViewBase from "./DeckView.common";
import CardCarousel from "../../card-carousel/CardCarousel";

export default class DeckView extends DeckViewBase {
    render() {
        return <View style={styles.root}>
            <CardCarousel
                cards={this.props.item.cards}
                style={styles.cardCarousel}
                editable={this.props.editable}
                onCardsChange={this.onCardsChange}
                onScrollCards={this.props.onScrollCards}
            />
        </View>;
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 'auto',
        width: "100%",
        maxWidth: 1200,
        maxHeight: 800,
    },
    cardCarousel: {},
});
