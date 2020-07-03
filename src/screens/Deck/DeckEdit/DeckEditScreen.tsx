import React, {Component} from "react";
import {Text} from "react-native";
import ScreenContainer from "../../ScreenContainer";
import {NavigationScreenProps, NavigationScreenState} from "../../../navigation/navigation_types";

import {reduxConnector, DeckEditScreenStoreProps} from "./DeckEditScreen_redux";
import {repeat} from "../../../utils/array";

export interface DeckEditScreenProps extends NavigationScreenProps<
    NavigationScreenState, { deckId: string }
> {}
export interface DeckEditScreenState {
    deck: Deck;
}
export class DeckEditScreen extends Component<DeckEditScreenProps & DeckEditScreenStoreProps, DeckEditScreenState>
{
    state = {
        deck: {
            id: `deck-id`,
            name: `Deck name`,
            description: `Deck description`,
            tags: repeat(5, i => `tag-${i+1}`),
            ownerId: `owner-id`,
            owner: { id: `owner-id`, displayName: `Owner displayName` },
            cards: [{
                id: 'card-id',
                name: 'Card name',
                ownerId: `owner-id`,
                owner: { id: `owner-id`, displayName: `Owner displayName` },
            }]
        }
    } as DeckEditScreenState;

    componentDidMount() {
        const {deckId} = this.props.route.params || {};
        if (!deckId) {
            console.warn('No ID'); // TODO Redirect
            return;
        }
    }

    render() {
        return (
            <ScreenContainer>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{this.constructor.name}</Text>

                <Text style={{ fontWeight: 'bold' }}>this.props.navigation.state</Text>
                <Text style={{ marginBottom: 20 }}>{JSON.stringify(this.props.navigation.state, null, 2)}</Text>

                <Text style={{ fontWeight: 'bold' }}>this.state.deck</Text>
                <Text style={{ marginBottom: 20 }}>{JSON.stringify(this.state.deck, null, 2)}</Text>
            </ScreenContainer>
        );
    }

}

export default reduxConnector(DeckEditScreen);
