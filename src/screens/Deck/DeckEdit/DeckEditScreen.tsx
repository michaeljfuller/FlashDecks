import React, {Component} from "react";
import {Text} from "react-native";
import ScreenContainer from "../../ScreenContainer";
import {NavigationScreenProps} from "../../../navigation/navigation_types";

import {reduxConnector, DeckEditScreenStoreProps} from "./DeckEditScreen_redux";

export interface DeckEditScreenProps extends NavigationScreenProps {}
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
            tags: ['tag-1', 'tag-2', 'tag-3'],
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

    render() {
        return (
            <ScreenContainer>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{this.constructor.name}</Text>
                <Text>{JSON.stringify(this.state.deck, null, 2)}</Text>
            </ScreenContainer>
        );
    }

}

export default reduxConnector(DeckEditScreen);
