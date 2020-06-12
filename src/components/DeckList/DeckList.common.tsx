import React from "react";

export interface DeckListProps {
    decks: Deck[];
    loggedInUser: User|null;
    goToEdit: (deck: Deck) => void;
    goToView: (deck: Deck) => void;
}

export default class DeckListBase<State = {}> extends React.Component<DeckListProps, State>{
    gotToDeck(deck: Deck) {
        this.props.goToView(deck);
    }
    editDeck(deck: Deck) {
        this.props.goToEdit(deck);
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
