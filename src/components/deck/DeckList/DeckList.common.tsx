import React from "react";
import ImmutablePureComponent from "../../ImmutablePureComponent";
import {DeckListItemModel, UserModel} from "../../../models";

export interface DeckListProps {
    decks: DeckListItemModel[];
    loggedInUser: UserModel|null;
    goToEdit: (deck: DeckListItemModel) => void;
    goToView: (deck: DeckListItemModel) => void;
}

export default class DeckListBase<State = {}> extends ImmutablePureComponent<DeckListProps, State>{
    gotToDeck(deck: DeckListItemModel) {
        this.props.goToView(deck);
    }
    editDeck(deck: DeckListItemModel) {
        this.props.goToEdit(deck);
    }
    deleteDeck(deck: DeckListItemModel) {
        console.log('DeckListBase', 'deleteDeck', deck);
    }

    canShowActions(_: DeckListItemModel): boolean {
        return true;
        // TODO
        // const user = this.props.loggedInUser;
        // return !!user && user.id === deck.ownerId;
    }
}
