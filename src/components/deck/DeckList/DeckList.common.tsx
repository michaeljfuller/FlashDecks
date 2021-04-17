import React from "react";
import ImmutablePureComponent from "../../ImmutablePureComponent";
import {DeckListItemModel, UserModel} from "../../../models";

export interface DeckListProps {
    decks: DeckListItemModel[];
    loggedInUser: UserModel|null;
    goToEdit: (deck: DeckListItemModel) => void;
    goToView: (deck: DeckListItemModel) => void;
    onDeleteDeck: (deck: DeckListItemModel) => void;
}

export default class DeckListBase<State = {}> extends ImmutablePureComponent<DeckListProps, State>{
    gotToDeck(deck: DeckListItemModel) {
        this.props.goToView(deck);
    }
    editDeck(deck: DeckListItemModel) {
        this.props.goToEdit(deck);
    }
    deleteDeck(deck: DeckListItemModel) {
        this.props.onDeleteDeck(deck);
    }

    canShowActions(deck: DeckListItemModel): boolean {
        const loggedInUserId = this.props.loggedInUser?.id;
        return !!loggedInUserId && deck.ownerId === loggedInUserId;
    }
}
