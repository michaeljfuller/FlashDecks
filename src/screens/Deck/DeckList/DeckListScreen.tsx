import React from "react";
import {Text, View} from "react-native";
import {castDraft} from "immer";
import ImmutablePureComponent from "../../../components/ImmutablePureComponent";
import ScreenContainer from "../../ScreenContainer";
import {NavigationScreenProps} from "../../../navigation/navigation_types";
import DeckList from "../../../components/deck/DeckList/DeckList";

import {reduxConnector, DeckListScreenStoreProps} from "./DeckListScreen_redux";
import DeckRoutes from "../DeckRoutes";
import {DeckModel} from "../../../models";
import deckApi from "../../../api/DeckApi";

export interface DeckListScreenProps extends NavigationScreenProps {}
export interface DeckListScreenState {
    loading: boolean;
    decks: DeckModel[];
}
export class DeckListScreen extends ImmutablePureComponent<
    DeckListScreenProps & DeckListScreenStoreProps,
    DeckListScreenState
> {
    state = {
        loading: false,
        decks: [],
    } as DeckListScreenState;

    get decks() {
        return this.state.decks;
    }

    componentDidMount() {
        this.loadDecks();
    }

    loadDecks() {
        this.setStateTo({ loading: true });
        deckApi.getList().then(
            decks => this.setStateTo(draft => draft.decks = castDraft(decks)),
            (e) => console.warn('Error loading decks', e) // TODO Toast
        ).finally(
            () => this.setStateTo({ loading: false })
        );
    }

    goTo(routeName: string, deck: DeckModel) {
        this.props.navigation.navigate(routeName, {deckId: deck.id})
    }

    goToEdit = (deck: DeckModel) => this.goTo(DeckRoutes.Edit, deck);
    goToView = (deck: DeckModel) => this.goTo(DeckRoutes.View, deck);

    render() {
        return (
            <ScreenContainer>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{this.constructor.name}</Text>
                <View style={{ padding: 5 }}>{this.renderBody()}</View>
            </ScreenContainer>
        );
    }

    renderBody() {
        if (this.state.loading) return <Text>Loading...</Text>;
        if (this.decks.length === 0) return <Text>No decks found.</Text>;
        return <DeckList
            decks={this.decks}
            loggedInUser={this.props.loggedInUser}
            goToEdit={this.goToEdit}
            goToView={this.goToView}
        />;
    }

}

export default reduxConnector(DeckListScreen);
