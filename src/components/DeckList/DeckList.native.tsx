import React from "react";
import {View, Text} from "react-native";
import {ActionSheet} from "native-base";

import DeckListItem from "./DeckListItem";
import DeckListBase from "./DeckList.common";

export default class DeckList extends DeckListBase {

    showActions(deck: Deck) {
        const DeleteLabel = 'Delete', CancelLabel = 'Cancel';
        const buttons: Record<string, Function|null> = {
            'Edit': () => this.editDeck(deck),
            [DeleteLabel]: () => this.deleteDeck(deck),
            [CancelLabel]: null
        };
        const buttonNames = Object.keys(buttons);
        ActionSheet.show(
            {
                title: deck.name,
                options: buttonNames,
                cancelButtonIndex: buttonNames.indexOf(CancelLabel), // Separate out in iOS.
                destructiveButtonIndex: buttonNames.indexOf(DeleteLabel), // Highlight red in iOS.
            },
            buttonIndex => {
                const buttonFunction = Object.values(buttons)[buttonIndex];
                if (buttonFunction) buttonFunction();
            }
        );
    }

    handleClick = (deck: Deck) => this.gotToDeck(deck);
    handleActions = (deck: Deck) => this.showActions(deck);

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
