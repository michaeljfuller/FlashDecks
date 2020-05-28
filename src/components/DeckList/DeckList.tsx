import React, {Component} from "react";
import {View, Text} from "react-native";
import DeckListItem from "./DeckListItem";

export interface DeckListProps {
    decks: Deck[];
}

export default class DeckList extends Component<DeckListProps>
{
    render() {
        return (
            <View>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{this.constructor.name}</Text>
                {this.props.decks.map(deck => <DeckListItem key={deck.id} deck={deck} />)}
            </View>
        );
    }
}
