import React from "react";
import {StyleSheet} from "react-native";
import DeckViewBase from "./DeckView.common";
import CardCarousel from "../../card-carousel/CardCarousel";
import Row from "../../layout/Row";

export default class DeckView extends DeckViewBase {
    render() {
        return <Row flex center style={styles.root}>
            <CardCarousel
                cards={this.props.item.cards}
                editable={this.props.editable}
                onSetCard={this.onSetCard}
                onScrollCards={this.props.onScrollCards}
                onEditingCard={this.props.onEditingCard}
            />
        </Row>;
    }
}

const styles = StyleSheet.create({
    root: { width: "100%" },
});
