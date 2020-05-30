import React from "react";
import {View, Text} from "react-native";
import DeckListItem from "./DeckListItem";

export interface DeckListProps {
    decks: Deck[];
}

export default function DeckList(props: DeckListProps) {
    return (
        <View>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>DeckList</Text>
            {props.decks.map(deck => <DeckListItem
                key={deck.id} deck={deck}
            />)}
        </View>
    );
}
