import React from "react";
import {View, Text} from "react-native";
import DeckListItem from "./DeckListItem";
import DeckListBase from "./DeckList.common";

export default class DeckList extends DeckListBase {
    render() {
        const {decks, loggedInUser} = this.props;
        return <View>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>DeckList ({loggedInUser?.id})</Text>
            {decks.map(deck => <DeckListItem
                key={deck.id}
                deck={deck}
                onClick={this.handleClick}
                onEdit={this.handleEdit}
                onView={this.handleView}
                showActions={this.canShowActions(deck)}
            />)}
        </View>;
    }
}
