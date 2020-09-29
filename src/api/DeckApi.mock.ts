import {
    ApiCard,
    ApiCardContent,
    ApiCardSide,
    ApiDeck,
    CardContentType,
    DeckModel,
    DeckBaseModel,
    UserModel
} from "../models";
import {repeat} from "../utils/array";
import {DeckApi} from "./DeckApi";
import {delayedResponse} from "./util/mock-helpers";
import ApiRequest from "./util/ApiRequest";
import {DeckListItemModel} from "../models/DeckListItemModel";

let nextMockDeckId = 1;
export class MockDeckApi implements DeckApi {

    getById(id: DeckModel['id']): ApiRequest<DeckModel|undefined> {
        return delayedResponse(() => {
            const ownerId = 'user-0', ownerName = 'Owner';
            return DeckModel.createFromApi(
                mockDeck(id, ownerId, ownerName, 5, mockCards(ownerId, ownerName))
            );
        });
    }

    getList(): ApiRequest<DeckListItemModel[]> {
        return delayedResponse(() => {
            return repeat(7, index => {
                const ownerId = `user-${index+1}`, ownerName = `Owner ${index+1}`;
                return DeckListItemModel.createFromApi(
                    mockDeck(`deck-${index+1}`, ownerId, ownerName, 15, mockCards(ownerId, ownerName))
                );
            });
        });
    }

    getForUser(userId: UserModel['id']): ApiRequest<DeckModel[]> {
        const ownerName = `Owner ${userId}`;
        return delayedResponse(() => {
            return repeat(7, index => {
                return DeckModel.createFromApi(
                    mockDeck(`deck-${index+1}`, userId, ownerName, 15, mockCards(userId, ownerName))
                );
            });
        });
    }

    create(deck: DeckBaseModel): ApiRequest<DeckBaseModel> {
        return delayedResponse(() => {
            return deck.update({
                id: `MOCK-DECK-${nextMockDeckId++}`
            });
        });
    }

    update(deck: DeckBaseModel): ApiRequest<DeckBaseModel> {
        return delayedResponse(() => {
            return deck.update({
                name: 'MOCK-UPDATE: ' + deck.title
            });
        });
    }

    push(deck: DeckBaseModel): ApiRequest<DeckBaseModel> {
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
function mockContent(type: CardContentType, value: string, size?: number): ApiCardContent {
    return { __typename: "CardSideContent", type: type as string, value, size };
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
                    mockContent("Text", "Side One", 0.1),
                    mockContent("Image", "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png", 0.8),
                    mockContent("Link", "https://www.google.com", 0.1),
                    mockContent("Text", repeat(20, i => `Line ${i+1}`).join('\n')),
                    // mockContent("Link", "invalid link url"),
                    // mockContent("Image", "invalid image url"),
                ]),
                mockCardSide([
                    mockContent("Text", "Side Two"),
                    mockContent("Image", "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"),
                    mockContent("Text", repeat(3, i => `Line ${i+1}`).join('\n'), 0.5),
                    mockContent("Link", "https://www.google.com"),
                ]),
                mockCardSide([
                    mockContent("Text", "Side Three", 1/7),
                    mockContent("Image", "https://via.placeholder.com/100x30/09f.png/fff", 1/7),
                    mockContent("Image", "https://via.placeholder.com/100x30/0f9.png/fff", 1/7),
                    mockContent("Image", "https://via.placeholder.com/100x30/90f.png/fff", 1/7),
                    mockContent("Image", "https://via.placeholder.com/100x30/9f0.png/fff", 1/7),
                    mockContent("Image", "https://via.placeholder.com/100x30/f09.png/fff", 1/7),
                    mockContent("Image", "https://via.placeholder.com/100x30/f90.png/fff", 1/7),
                ]),
                mockCardSide([
                    mockContent("Text", "Side Four"),
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
                    mockContent("Video", "http://techslides.com/demos/sample-videos/small.mp4", 0.5),
                    mockContent("Video", "http://techslides.com/demos/sample-videos/small.mp4", 1),
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
