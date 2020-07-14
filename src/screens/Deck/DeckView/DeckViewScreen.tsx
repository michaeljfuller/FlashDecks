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
                            {id: "1-1-1", type: "Text", value: "Side One"},
                            {id: "1-1-2", type: "Image", value: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"},
                            {id: "1-1-3", type: "Link", value: "https://www.google.com"},
                            // {id: "1-1-4", type: "Link", value: "invalid link url"},
                            // {id: "1-1-5", type: "Image", value: "invalid image uri"},
                        ]
                    },
                    {
                        content: [
                            {id: "1-2-1", type: "Text", value: "Side Two"},
                            {id: "1-2-2", type: "Image", value: "https://via.placeholder.com/100x30/09f.png/fff"},
                            {id: "1-2-3", type: "Image", value: "https://via.placeholder.com/100x30/0f9.png/fff"},
                            {id: "1-2-4", type: "Image", value: "https://via.placeholder.com/100x30/90f.png/fff"},
                            {id: "1-2-5", type: "Image", value: "https://via.placeholder.com/100x30/9f0.png/fff"},
                            {id: "1-2-6", type: "Image", value: "https://via.placeholder.com/100x30/f09.png/fff"},
                            {id: "1-2-7", type: "Image", value: "https://via.placeholder.com/100x30/f90.png/fff"},
                        ]
                    },
                    { content: [ {id: "1-3-1", type: "Text", value: "Side Three"} ]},
                ],
            },{
                id: 'card-id-2',
                name: 'Card name 2',
                ownerId: `owner-id`,
                owner: { id: `owner-id`, displayName: `Owner displayName` },
                sides: [
                    {
                        content: [
                            {id: "2-1-1", type: "Text", value: "Videos"},
                            {id: "2-1-2", type: "Video", value: "http://techslides.com/demos/sample-videos/small.mp4"},
                            {id: "2-1-3", type: "Video", value: "http://techslides.com/demos/sample-videos/small.mp4"},
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
