import React from "react";

export interface DeckListProps {
    decks: Deck[];
    loggedInUser: User|null;
}

export default class DeckListBase extends React.Component<DeckListProps>{
    handleClick = (deck: Deck) => {
        console.log('DeckList.handleClick', deck);
    };
    handleView = (deck: Deck) => {
        console.log('DeckList.handleView', deck);
    };
    handleEdit = (deck: Deck) => {
        console.log('DeckList.handleEdit', deck);
    };

    canShowActions(deck: Deck): boolean {
        return true;
        // TODO
        // const user = this.props.loggedInUser;
        // return !!user && user.id === deck.ownerId;
    }
}
