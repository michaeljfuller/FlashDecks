import React from "react";
import {View, Text} from "react-native";

export interface DeckListItemProps {
    deck: Deck;
}
export default function DeckListItem(props: DeckListItemProps) {
    return <View style={{
        margin: 5,
        padding: 2,
        borderWidth: 1,
        borderColor: 'red',
    }}>
        <Text>{JSON.stringify(props.deck, null,  2)}</Text>
    </View>;
}
