import React, {Component} from "react";
import {Text, View} from "react-native";
import ScreenContainer from "../../ScreenContainer";
import DeckView from "../../../components/deck/DeckView";
import {NavigationScreenProps, NavigationScreenState} from "../../../navigation/navigation_types";
import {reduxConnector, DeckViewScreenStoreProps} from "./DeckViewScreen_redux";

export interface DeckViewScreenProps extends NavigationScreenProps<
    NavigationScreenState, { deckId: string }
> {}
export interface DeckViewScreenState {
    deck: Deck;
}
export class DeckViewScreen extends Component<DeckViewScreenProps & DeckViewScreenStoreProps, DeckViewScreenState>
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
                id: 'card-id-1',
                name: 'Card name 1',
                ownerId: `owner-id`,
                owner: { id: `owner-id`, displayName: `Owner displayName` },
            },{
                id: 'card-id-2',
                name: 'Card name 2',
                ownerId: `owner-id`,
                owner: { id: `owner-id`, displayName: `Owner displayName` },
            },{
                id: 'card-id-3',
                name: 'Card name 3',
                ownerId: `owner-id`,
                owner: { id: `owner-id`, displayName: `Owner displayName` },
            }]
        }
    } as DeckViewScreenState;

    componentDidMount() {
        const {deckId} = this.props.route.params || {};
        if (!deckId) {
            console.warn('No ID'); // TODO Redirect
            return;
        }
    }

    render() {
        return (
            <ScreenContainer style={{ padding: 5 }}>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>DeckViewScreen</Text>
                <DeckView item={this.state.deck} />
            </ScreenContainer>
        );
    }

}

export default reduxConnector(DeckViewScreen);
