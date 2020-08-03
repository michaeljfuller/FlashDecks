import React, {Component} from "react";
import ScreenContainer from "../../ScreenContainer";
import {NavigationScreenProps, NavigationScreenState} from "../../../navigation/navigation_types";

import {reduxConnector, DeckEditScreenStoreProps} from "./DeckEditScreen_redux";
import {repeat} from "../../../utils/array";
import DeckView from "../../../components/deck/DeckView/DeckView";
import Button from "../../../components/button/Button";
import DeckScreenHeader from "../common/DeckScreenHeader";
import {DeckModel} from "../../../models";

export interface DeckEditScreenProps extends NavigationScreenProps<
    NavigationScreenState, { deckId: string }
> {}
export interface DeckEditScreenState {
    deck: DeckModel;
    changed?: boolean;
}

const testDeck = DeckModel.fromApi({
    id: `deck-id`,
    name: `Deck name`,
    description: `Deck description`,
    tags: repeat(15, i => `tag-${i+1}`),
    ownerId: `owner-id`,
    owner: { id: `owner-id`, displayName: `Owner displayName` },
    cards: [{
        id: 'card-id-1',
        name: 'Card 1',
        ownerId: `owner-id`,
        owner: { id: `owner-id`, displayName: `Owner displayName` },
        sides: [
            {
                content: [
                    {id: "1-1-1", type: "Text", size: 0.1, value: "Side One"},
                    {id: "1-1-2", type: "Image", size: 0.8, value: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"},
                    {id: "1-1-3", type: "Link", size: 0.1, value: "https://www.google.com"},
                    {id: "1-1-4", type: "Text", value: repeat(20, i => `Line ${i+1}`).join('\n')},
                    // {id: "1-1-4", type: "Link", value: "invalid link url"},
                    // {id: "1-1-5", type: "Image", value: "invalid image uri"},
                ]
            },
            {
                content: [
                    {id: "1-2-1", type: "Text", value: "Side Two"},
                    {id: "1-2-2", type: "Image", value: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"},
                    {id: "1-2-3", type: "Text", size: 0.5, value: repeat(3, i => `Line ${i+1}`).join('\n')},
                    {id: "1-2-4", type: "Link", value: "https://www.google.com"},
                ]
            },
            {
                content: [
                    {id: "1-3-1", type: "Text", size: 1/7, value: "Side Three"},
                    {id: "1-3-2", type: "Image", size: 1/7, value: "https://via.placeholder.com/100x30/09f.png/fff"},
                    {id: "1-3-3", type: "Image", size: 1/7, value: "https://via.placeholder.com/100x30/0f9.png/fff"},
                    {id: "1-3-4", type: "Image", size: 1/7, value: "https://via.placeholder.com/100x30/90f.png/fff"},
                    {id: "1-3-5", type: "Image", size: 1/7, value: "https://via.placeholder.com/100x30/9f0.png/fff"},
                    {id: "1-3-6", type: "Image", size: 1/7, value: "https://via.placeholder.com/100x30/f09.png/fff"},
                    {id: "1-3-7", type: "Image", size: 1/7, value: "https://via.placeholder.com/100x30/f90.png/fff"},
                ]
            },
            { content: [ {id: "1-3-1", type: "Text", value: "Side Four"} ]},
        ],
    },{
        id: 'card-id-2',
        name: 'Video',
        ownerId: `owner-id`,
        owner: { id: `owner-id`, displayName: `Owner displayName` },
        sides: [
            {
                content: [
                    {id: "2-1-2", type: "Video", size: 0.5, value: "http://techslides.com/demos/sample-videos/small.mp4"},
                    {id: "2-1-3", type: "Video", size: 1, value: "http://techslides.com/demos/sample-videos/small.mp4"},
                ]
            },
        ],
    },{
        id: 'card-id-3',
        name: 'Empty',
        ownerId: `owner-id`,
        owner: { id: `owner-id`, displayName: `Owner displayName` },
    }]
});

export class DeckEditScreen extends Component<DeckEditScreenProps & DeckEditScreenStoreProps, DeckEditScreenState>
{
    state = {
        deck: testDeck,
    } as DeckEditScreenState;

    componentDidMount() {
        const {deckId} = this.props.route.params || {};
        if (!deckId) {
            console.warn('No ID'); // TODO Redirect
            return;
        }
    }

    onItemChange = (deck: DeckModel) => {
        this.setState({ deck, changed: true });
    }

    onSavePressed = () => {
        console.log('DeckEditScreen.onSavePressed'); // TODO Toast
    }

    render() {
        return (
            <ScreenContainer>
                <DeckScreenHeader item={this.state.deck} title={`Edit: ${this.state.deck.name}`} />
                <DeckView editable item={this.state.deck} onItemChange={this.onItemChange} />
                <Button
                    title="Save"
                    square
                    disabled={!this.state.changed}
                    onClick={this.onSavePressed}
                />
            </ScreenContainer>
        );
    }

}

export default reduxConnector(DeckEditScreen);
