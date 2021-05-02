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
                onSetCard={this.onSetCard}
                onScrollCards={this.props.onScrollCards}
                onEditingCard={this.props.onEditingCard}
            />
        </View>;
    }

}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        backgroundColor: 'orange',
    },
    cardCarousel: {
        marginTop: 5,
        maxWidth: 550,
    },
});
