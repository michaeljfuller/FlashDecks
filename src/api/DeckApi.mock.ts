import {ApiCard, ApiCardContent, ApiCardSide, ApiDeck, CardContentType, DeckModel, UserModel} from "../models";
import decksStore from "../store/decks/DecksStore";
import {repeat} from "../utils/array";
import {DeckApi} from "./DeckApi";
import {delayedResponse} from "./util/mock-helpers";
import ApiRequest from "./util/ApiRequest";

let nextMockDeckId = 1;
export class MockDeckApi implements DeckApi {

    getById(id: DeckModel['id']): ApiRequest<DeckModel|undefined> {
        return delayedResponse(() => {
            const ownerId = 'user-0', ownerName = 'Owner';
            const result = DeckModel.fromApi(
                mockDeck(id, ownerId, ownerName, 5, mockCards(ownerId, ownerName))
            );
            decksStore.add(result);
            return result;
        });
    }

    getList(): ApiRequest<DeckModel[]> {
        return delayedResponse(() => {
            const result = repeat(7, index => {
                const ownerId = `user-${index+1}`, ownerName = `Owner ${index+1}`;
                return DeckModel.fromApi(
                    mockDeck(`deck-${index+1}`, ownerId, ownerName, 15, mockCards(ownerId, ownerName))
                );
            });
            decksStore.add(result);
            return  result
        });
    }

    getForUser(userId: UserModel['id']): ApiRequest<DeckModel[]> {
        const ownerName = `Owner ${userId}`;
        return delayedResponse(() => {
            const result = repeat(7, index => {
                return DeckModel.fromApi(
                    mockDeck(`deck-${index+1}`, userId, ownerName, 15, mockCards(userId, ownerName))
                );
            });
            decksStore.add(result);
            return result;
        });
    }

    create(deck: DeckModel): ApiRequest<DeckModel> {
        console.log('mock DeckApi.create', deck);
        return delayedResponse(() => {
            const result = deck.update({
                id: `MOCK-DECK-${nextMockDeckId++}`
            });
            decksStore.add(result);
            return result;
        });
    }

    update(deck: DeckModel): ApiRequest<DeckModel> {
        console.log('mock DeckApi.update', deck);
        return delayedResponse(() => {
            const result = deck.update({
                name: 'MOCK-UPDATE: ' + deck.name
            });
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

function mockDeck(id: string, ownerId: string, ownerName: string, tags: number|string[], cards: ApiCard[]): ApiDeck {
    return {
        __typename: "Deck",
        id,
        name: `Deck #${id}`,
        description: `Sample deck for List.`,
        tags: typeof tags === 'number' ? repeat(tags, i => `tag-${i+1}`) : tags,
        cards: {
            __typename: "ModelCardConnection",
            items: cards,
            nextToken: null,
        },
        ownerId,
        owner: { __typename: "User", id: ownerId, displayName: ownerName },
        popularity: 0
    };
}

function mockCardSide(content: ApiCardContent[]): ApiCardSide {
    return { __typename: "CardSide", content };
}
function mockContent(id: string, type: CardContentType, value: string, size?: number): ApiCardContent {
    return { __typename: "CardSideContent", id, type: type as string, value, size };
}
function mockCard(id: string, name: string, ownerId: string, ownerName: string, sides?: ApiCardSide[]): ApiCard {
    return {
        __typename: "Card",
        id,
        name,
        ownerId,
        owner: { __typename: "User", id: ownerId, displayName: ownerName },
        sides: sides || null,
        popularity: 0,
        deck: null as any,// TODO
        deckID: id+'-deck',
        tags: [],
    };
}

function mockCards(ownerId = 'owner-id', ownerName = 'Owner Name'): ApiCard[] {
    return [
        mockCard(
            'card-id-1',
            'Card 1',
            ownerId,
            ownerName,
            [
                mockCardSide([
                    mockContent("1-1-1", "Text", "Side One", 0.1),
                    mockContent("1-1-2", "Image", "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png", 0.8),
                    mockContent("1-1-3", "Link", "https://www.google.com", 0.1),
                    mockContent("1-1-4", "Text", repeat(20, i => `Line ${i+1}`).join('\n')),
                    // mockContent("1-1-5", "Link", "invalid link url"),
                    // mockContent("1-1-6", "Image", "invalid image url"),
                ]),
                mockCardSide([
                    mockContent("1-2-1", "Text", "Side Two"),
                    mockContent("1-2-2", "Image", "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"),
                    mockContent("1-2-3", "Text", repeat(3, i => `Line ${i+1}`).join('\n'), 0.5),
                    mockContent("1-2-4", "Link", "https://www.google.com"),
                ]),
                mockCardSide([
                    mockContent("1-3-1", "Text", "Side Three", 1/7),
                    mockContent("1-3-2", "Image", "https://via.placeholder.com/100x30/09f.png/fff", 1/7),
                    mockContent("1-3-3", "Image", "https://via.placeholder.com/100x30/0f9.png/fff", 1/7),
                    mockContent("1-3-4", "Image", "https://via.placeholder.com/100x30/90f.png/fff", 1/7),
                    mockContent("1-3-5", "Image", "https://via.placeholder.com/100x30/9f0.png/fff", 1/7),
                    mockContent("1-3-6", "Image", "https://via.placeholder.com/100x30/f09.png/fff", 1/7),
                    mockContent("1-3-7", "Image", "https://via.placeholder.com/100x30/f90.png/fff", 1/7),
                ]),
                mockCardSide([
                    mockContent("1-4-1", "Text", "Side Four"),
                ])
            ]
        ),
        mockCard(
            'card-id-2',
            'Video',
            ownerId,
            ownerName,
            [
                mockCardSide([
                    mockContent("2-1-2", "Video", "http://techslides.com/demos/sample-videos/small.mp4", 0.5),
                    mockContent("2-1-3", "Video", "http://techslides.com/demos/sample-videos/small.mp4", 1),
                ])
            ]
        ),
        mockCard(
            'card-id-3',
            'Empty',
            ownerId,
            ownerName
        )
    ];
}
