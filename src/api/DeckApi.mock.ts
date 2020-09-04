import {ApiCard, ApiDeck, DeckModel, UserModel} from "../models";
import decksStore from "../store/decks/DecksStore";
import {repeat} from "../utils/array";
import {DeckApi} from "./DeckApi";
import {delayedResponse} from "./util/mock-helpers";
import ApiRequest from "./util/ApiRequest";

let nextMockDeckId = 1;
export class MockDeckApi implements DeckApi {

    getById(id: DeckModel['id']): ApiRequest<DeckModel|undefined> {
        return delayedResponse(() => {
            const result = DeckModel.fromApi({
                id,
                name: `Deck #${id}`,
                description: `Sample deck for List.`,
                tags: repeat(15, i => `tag-${i+1}`),
                ownerId: `user-0`,
                owner: { id: `user-0`, displayName: `Owner` },
                cards: {
                    items: mockCards()
                },
            } as ApiDeck);

            decksStore.add(result);
            return result;
        });
    }

    getList(): ApiRequest<DeckModel[]> {
        return delayedResponse(() => {
            const result = repeat(7, index => DeckModel.fromApi({
                id: `deck-${index+1}`,
                name: `Deck #${index+1}`,
                description: `Sample deck for List.`,
                tags: repeat(15, i => `tag-${i+1}`),
                ownerId: `user-${index+1}`,
                owner: { id: `user-${index+1}`, displayName: `Owner ${index+1}` },
                cards: {
                    items: mockCards()
                },
            } as ApiDeck));

            decksStore.add(result);
            return  result
        });
    }

    getForUser(userId: UserModel['id']): ApiRequest<DeckModel[]> {
        return delayedResponse(() => {
            const result = repeat(7, index => DeckModel.fromApi({
                id: `deck-${index+1}`,
                name: `Deck #${index+1}`,
                description: `Sample deck for ${userId}.`,
                tags: repeat(15, i => `tag-${i+1}`),
                ownerId: userId,
                owner: { id: userId, displayName: 'Owner Name' },
                cards: {
                    items: mockCards()
                },
            } as ApiDeck));

            decksStore.add(result);
            return result;
        });
    }

    create(deck: DeckModel): ApiRequest<DeckModel> {
        return delayedResponse(() => {
            const result = deck.update({ id: `MOCK-DECK-${nextMockDeckId++}` });
            decksStore.add(result);
            return result;
        });
    }

    update(deck: DeckModel): ApiRequest<DeckModel> {
        return delayedResponse(() => {
            const result = deck.update({ name: 'MOCK-UPDATE: ' + deck.name });
            decksStore.add(result);
            return result;
        });
    }

    push(deck: DeckModel): ApiRequest<DeckModel> {
        return deck.id ? this.update(deck) : this.create(deck);
    }

}

export const deckApi = new MockDeckApi;
export default deckApi;

function mockCards(ownerId = 'owner-id', ownerName = 'Owner Name'): ApiCard[] {
    return [{
        id: 'card-id-1',
        name: 'Card 1',
        ownerId: ownerId,
        owner: { id: ownerId, displayName: ownerName },
        sides: {items: [
            {
                content: {
                    items: [
                        {id: "1-1-1", type: "Text", size: 0.1, value: "Side One"},
                        {id: "1-1-2", type: "Image", size: 0.8, value: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"},
                        {id: "1-1-3", type: "Link", size: 0.1, value: "https://www.google.com"},
                        {id: "1-1-4", type: "Text", value: repeat(20, i => `Line ${i+1}`).join('\n')},
                        // {id: "1-1-4", type: "Link", value: "invalid link url"},
                        // {id: "1-1-5", type: "Image", value: "invalid image uri"},
                    ]
                }
            },
            {
                content: {
                    items: [
                        {id: "1-2-1", type: "Text", value: "Side Two"},
                        {id: "1-2-2", type: "Image", value: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"},
                        {id: "1-2-3", type: "Text", size: 0.5, value: repeat(3, i => `Line ${i+1}`).join('\n')},
                        {id: "1-2-4", type: "Link", value: "https://www.google.com"},
                    ]
                }
            },
            {
                content: {
                    items: [
                        {id: "1-3-1", type: "Text", size: 1/7, value: "Side Three"},
                        {id: "1-3-2", type: "Image", size: 1/7, value: "https://via.placeholder.com/100x30/09f.png/fff"},
                        {id: "1-3-3", type: "Image", size: 1/7, value: "https://via.placeholder.com/100x30/0f9.png/fff"},
                        {id: "1-3-4", type: "Image", size: 1/7, value: "https://via.placeholder.com/100x30/90f.png/fff"},
                        {id: "1-3-5", type: "Image", size: 1/7, value: "https://via.placeholder.com/100x30/9f0.png/fff"},
                        {id: "1-3-6", type: "Image", size: 1/7, value: "https://via.placeholder.com/100x30/f09.png/fff"},
                        {id: "1-3-7", type: "Image", size: 1/7, value: "https://via.placeholder.com/100x30/f90.png/fff"},
                    ]
                }
            },
            {
                content: {
                    items: [ {id: "1-3-1", type: "Text", value: "Side Four"} ]
                }
            },
        ]},
    },{
        id: 'card-id-2',
        name: 'Video',
        ownerId: `owner-id`,
        owner: { id: `owner-id`, displayName: `Owner displayName` },
        sides: {
            items: [
                {
                    content: {
                        items: [
                            {id: "2-1-2", type: "Video", size: 0.5, value: "http://techslides.com/demos/sample-videos/small.mp4"},
                            {id: "2-1-3", type: "Video", size: 1, value: "http://techslides.com/demos/sample-videos/small.mp4"},
                        ]
                    }
                },
            ]
        },
    },{
        id: 'card-id-3',
        name: 'Empty',
        ownerId: `owner-id`,
        owner: { id: `owner-id`, displayName: `Owner displayName` },
    }];
}
