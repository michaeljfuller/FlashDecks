import React from "react";
import {Text, View} from "react-native";
import DeckViewBase from "./DeckView.common";
import CardView from "../card/CardView";

export interface DeckViewState {}
export default class DeckView extends DeckViewBase<DeckViewState> {
    state: DeckViewState = {};

    render() {
        return <View>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>DeckView</Text>
            {Object.keys(this.props.item).map(key => <View key={key} style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold'}}>{key}: </Text>
                <Text>{JSON.stringify((this.props.item as any)[key])}</Text>
            </View>)}
            {this.renderCards()}
        </View>;
    }

    renderCards() {
        return (this.props.item.cards||[]).map(card => {
            return <View
                key={card.id}
                style={{
                    marginTop: 5,
                    maxWidth: 550,
                    marginHorizontal: 'auto',
                }}
            >
                <CardView item={card} />
            </View>
        });
    }
}

