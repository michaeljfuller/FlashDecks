import React, {Component} from "react";
import {Text} from "react-native";
import ScreenContainer from "../ScreenContainer";
import {NavigationScreenProps} from "../../navigation/navigation_types";
import DeckList from "../../components/DeckList/DeckList";
import {repeat} from "../../utils/array";

import {reduxConnector, DecksScreenStoreProps} from "./DecksScreen_redux";

export interface DecksScreenProps extends NavigationScreenProps {}
export interface DecksScreenState {
    decks: Deck[];
}
export class DecksScreen extends Component<DecksScreenProps & DecksScreenStoreProps, DecksScreenState>
{
    state = {
        decks: repeat(7, index => ({
            id: `deck-${index+1}`,
            name: `Deck #${index+1}`,
            description: `Sample deck`,
            ownerId: `user-${index+1}`,
            owner: { id: `user-${index}`, displayName: `User${index+1}` }
        } as Deck))
    } as DecksScreenState;

    render() {
        return (
            <ScreenContainer>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{this.constructor.name}</Text>
                <DeckList decks={this.state.decks} loggedInUser={this.props.loggedInUser} />
            </ScreenContainer>
        );
    }

}

export default reduxConnector(DecksScreen);
