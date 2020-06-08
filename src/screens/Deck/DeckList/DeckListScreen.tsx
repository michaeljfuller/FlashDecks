import React, {Component} from "react";
import {Text, View} from "react-native";
import ScreenContainer from "../../ScreenContainer";
import {NavigationScreenProps} from "../../../navigation/navigation_types";
import DeckList from "../../../components/DeckList/DeckList";
import {repeat} from "../../../utils/array";

import {reduxConnector, DeckListScreenStoreProps} from "./DeckListScreen_redux";

export interface DeckListScreenProps extends NavigationScreenProps {}
export interface DeckListScreenState {
    decks: Deck[];
}
export class DeckListScreen extends Component<DeckListScreenProps & DeckListScreenStoreProps, DeckListScreenState>
{
    state = {
        decks: repeat(7, index => ({
            id: `deck-${index+1}`,
            name: `Deck #${index+1}`,
            description: `Sample deck`,
            ownerId: `user-${index+1}`,
            owner: { id: `user-${index}`, displayName: `User${index+1}` }
        } as Deck))
    } as DeckListScreenState;

    render() {
        return (
            <ScreenContainer>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{this.constructor.name}</Text>
                <View style={{ padding: 5 }}>
                    <DeckList decks={this.state.decks} loggedInUser={this.props.loggedInUser} />
                </View>
            </ScreenContainer>
        );
    }

}

export default reduxConnector(DeckListScreen);
