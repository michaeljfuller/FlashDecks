import React from "react";
import {Text, View} from "react-native";
import ImmutablePureComponent from "../../../components/ImmutablePureComponent";
import ScreenContainer from "../../ScreenContainer";
import {NavigationScreenProps} from "../../../navigation/navigation_types";
import DeckList from "../../../components/deck/DeckList/DeckList";

import {reduxConnector, DeckListScreenStoreProps} from "./DeckListScreen_redux";
import DeckRoutes from "../DeckRoutes";
import {DeckModel} from "../../../models";
import {DecksStore} from "../../../store/decks/DecksStore";

export interface DeckListScreenProps extends NavigationScreenProps {}
export interface DeckListScreenState {}
export class DeckListScreen extends ImmutablePureComponent<
    DeckListScreenProps & DeckListScreenStoreProps,
    DeckListScreenState
> {
    state = {} as DeckListScreenState;

    get decks() {
        return this.props.decks ? DecksStore.list(
            this.props.decks, {
                // ownerId: 'user-1'
            }
        ) : [];
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
                <View style={{ padding: 5 }}>
                    <DeckList
                        decks={this.decks}
                        loggedInUser={this.props.loggedInUser}
                        goToEdit={this.goToEdit}
                        goToView={this.goToView}
                    />
                </View>
            </ScreenContainer>
        );
    }

}

export default reduxConnector(DeckListScreen);
