import React from "react";
import {View} from "react-native";
import {ActionSheet} from "native-base";

import DeckListItem from "./DeckListItem/DeckListItem";
import DeckListBase from "./DeckList.common";
import {DeckListItemModel} from "../../../models";

export default class DeckList extends DeckListBase {

    showActions(deck: DeckListItemModel) {
        const DeleteLabel = 'Delete', CancelLabel = 'Cancel';
        const buttons: Record<string, Function|null> = {
            'Edit': () => this.editDeck(deck),
            [DeleteLabel]: () => this.deleteDeck(deck),
            [CancelLabel]: null
        };
        const buttonNames = Object.keys(buttons);
        ActionSheet.show(
            {
                title: deck.title,
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

    handleClick = (deck: DeckListItemModel) => this.gotToDeck(deck);
    handleActions = (deck: DeckListItemModel) => this.showActions(deck);

    render() {
        const {decks/*, loggedInUser*/} = this.props;
        return <View>
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
