import React, {Component} from "react";
import {Text, View} from "react-native";
import ScreenContainer from "../../ScreenContainer";
import {NavigationScreenProps} from "../../../navigation/navigation_types";
import DeckList from "../../../components/deck/DeckList/DeckList";
import {repeat} from "../../../utils/array";

import {reduxConnector, DeckListScreenStoreProps} from "./DeckListScreen_redux";
import DeckRoutes from "../DeckRoutes";
import {ApiDeck, DeckModel} from "../../../models";

export interface DeckListScreenProps extends NavigationScreenProps {}
export interface DeckListScreenState {
    decks: DeckModel[];
}
export class DeckListScreen extends Component<DeckListScreenProps & DeckListScreenStoreProps, DeckListScreenState>
{
    state = {
        decks: repeat(7, index => DeckModel.fromApi({
            id: `deck-${index+1}`,
            name: `Deck #${index+1}`,
            description: `Sample deck`,
            ownerId: `user-${index+1}`,
            owner: { id: `user-${index}`, displayName: `User${index+1}` },
        } as ApiDeck))
    } as DeckListScreenState;

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
                        decks={this.state.decks}
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
