import React from "react";

export interface DeckListProps {
    decks: Deck[];
    loggedInUser: User|null;
}

export default class DeckListBase<State> extends React.Component<DeckListProps, State>{
    gotToDeck(deck: Deck) {
        console.log('DeckListBase', 'goToDeck', deck);
    }
    editDeck(deck: Deck) {
        console.log('DeckListBase', 'editDeck', deck);
    }
    deleteDeck(deck: Deck) {
        console.log('DeckListBase', 'deleteDeck', deck);
    }

    canShowActions(deck: Deck): boolean {
        return true;
        // TODO
        // const user = this.props.loggedInUser;
        // return !!user && user.id === deck.ownerId;
    }
}
