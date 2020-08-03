import React from "react";
import {DeckModel, UserModel} from "../../../models";

export interface DeckListProps {
    decks: DeckModel[];
    loggedInUser: UserModel|null;
    goToEdit: (deck: DeckModel) => void;
    goToView: (deck: DeckModel) => void;
}

export default class DeckListBase<State = {}> extends React.Component<DeckListProps, State>{
    gotToDeck(deck: DeckModel) {
        this.props.goToView(deck);
    }
    editDeck(deck: DeckModel) {
        this.props.goToEdit(deck);
    }
    deleteDeck(deck: DeckModel) {
        console.log('DeckListBase', 'deleteDeck', deck);
    }

    canShowActions(deck: DeckModel): boolean {
        return true;
        // TODO
        // const user = this.props.loggedInUser;
        // return !!user && user.id === deck.ownerId;
    }
}
