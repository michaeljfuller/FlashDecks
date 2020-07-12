import React, {Component} from "react";
import ScreenContainer from "../../ScreenContainer";
import DeckView from "../../../components/deck/DeckView";
import {NavigationScreenProps, NavigationScreenState} from "../../../navigation/navigation_types";
import {reduxConnector, DeckViewScreenStoreProps} from "./DeckViewScreen_redux";
import {repeat} from "../../../utils/array";

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
            tags: repeat(15, i => `tag-${i+1}`),
            ownerId: `owner-id`,
            owner: { id: `owner-id`, displayName: `Owner displayName` },
            cards: [{
                id: 'card-id-1',
                name: 'Card name 1',
                ownerId: `owner-id`,
                owner: { id: `owner-id`, displayName: `Owner displayName` },
                sides: [
                    {
                        content: [
                            {type: "Text", value: "Side One"},
                            {type: "Image", value: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"},
                            {type: "Link", value: "https://www.google.com"},
                            {type: "Link", value: "invalid link url"},
                            {type: "Image", value: "invalid image uri"},
                        ]
                    },
                    { content: [ {type: "Text", value: "Side Two"} ]},
                ],
            },{
                id: 'card-id-2',
                name: 'Card name 2',
                ownerId: `owner-id`,
                owner: { id: `owner-id`, displayName: `Owner displayName` },
                sides: [
                    {
                        content: [
                            {type: "Text", value: "Videos"},
                            {type: "Video", value: "http://techslides.com/demos/sample-videos/small.mp4"},
                            {type: "Video", value: "http://techslides.com/demos/sample-videos/small.ogv"},
                            {type: "Video", value: "http://techslides.com/demos/sample-videos/small.mp4"},
                            {type: "Video", value: "http://techslides.com/demos/sample-videos/small.3gp"},
                        ]
                    },
                ],
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
                <DeckView item={this.state.deck} />
            </ScreenContainer>
        );
    }

}

export default reduxConnector(DeckViewScreen);
