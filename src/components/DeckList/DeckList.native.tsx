import React from "react";
import {View, Text} from "react-native";
import DeckListItem from "./DeckListItem";
import DeckListBase from "./DeckList.common";

export default class DeckList extends DeckListBase {

    handleClick = (deck: Deck) => this.gotToDeck(deck);
    handleActions = (deck: Deck) => console.log('Actions for', deck);
    handleEdit = (deck: Deck) => this.editDeck(deck);
    handleDelete = (deck: Deck) => this.deleteDeck(deck);

    render() {
        const {decks, loggedInUser} = this.props;
        return <View>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>DeckList ({loggedInUser?.id})</Text>
            {decks.map(deck => <DeckListItem
                key={deck.id}
                deck={deck}
                onClick={this.handleClick}
                onActions={this.handleActions}
                showActions={this.canShowActions(deck)}
            />)}
        </View>;
    }
}
