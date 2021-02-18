import {castDraft} from "immer";
import {assertNewInstance, assertProperties, repeat} from "./core/model-test-utils";
import DeckModel, {ApiDeck} from "./DeckModel";
import CardModel, {ApiCard} from "./CardModel";
import UserModel, {ApiUser} from "./UserModel";
import {ApiCardSide} from "./CardSideModel";
import {ApiCardContent, ApiCardContentType} from "./CardContentModel";

const TEST_ID = 'test-id';
const TEST_OWNER_ID = 'test-ownerId';
const TEST_OWNER_API = {
    id: TEST_OWNER_ID,
    displayName: 'test-owner-displayName',
    userName: 'test-owner-userName',
} as ApiUser;
const TEST_OWNER = UserModel.fromApi(TEST_OWNER_API);
const TEST_TITLE = 'test-title';
const TEST_DESCRIPTION = 'test-description';
const TEST_TAGS = repeat<string>(3, index => `test-tag-${index+1}`);
const TEST_CARDS_API = repeat<ApiCard>(3, cardIndex => ({
    __typename: "Card",
    title: `test-card-${cardIndex+1}`,
    sides: repeat<ApiCardSide>(1, sideIndex => ({
        __typename: "CardSide",
        content: repeat<ApiCardContent>(3, contentIndex => ({
            __typename: "CardSideContent",
            type: ApiCardContentType.Text,
            value: `test-card-${cardIndex+1}-side-${sideIndex+1}-content-${contentIndex+1}`,
            size: null,
        }))
    })),
}));
const TEST_CARDS = TEST_CARDS_API.map(CardModel.fromApi);

describe('DeckModel', () => {
    it('can be created', () => {
        expect(new DeckModel).toBeDefined()
    });

    describe('#update()', () => {

        describe('with callback', () => {
            const original = new DeckModel;
            const updated = original.update(draft => {
                draft.id = TEST_ID;
                draft.ownerId = TEST_OWNER_ID;
                draft.owner = TEST_OWNER;
                draft.title = TEST_TITLE;
                draft.description = TEST_DESCRIPTION;
                draft.tags = TEST_TAGS;
                draft.cards = castDraft(TEST_CARDS);
            });
            assertNewInstance(original, updated);
            assertProperties(updated, {
                id: TEST_ID,
                ownerId: TEST_OWNER_ID,
                owner: TEST_OWNER,
                title: TEST_TITLE,
                description: TEST_DESCRIPTION,
                tags: TEST_TAGS,
                cards: TEST_CARDS,
            });
        });

        describe('with object', () => {
            const original = new DeckModel;
            const updated = original.update({
                id: TEST_ID,
                ownerId: TEST_OWNER_ID,
                owner: TEST_OWNER,
                title: TEST_TITLE,
                description: TEST_DESCRIPTION,
                tags: TEST_TAGS,
                cards: TEST_CARDS,
            });
            assertNewInstance(original, updated);
            assertProperties(updated, {
                id: TEST_ID,
                ownerId: TEST_OWNER_ID,
                owner: TEST_OWNER,
                title: TEST_TITLE,
                description: TEST_DESCRIPTION,
                tags: TEST_TAGS,
                cards: TEST_CARDS,
            });
        });

    });

    describe('#createFromApi()', () => {
        const api = {
            id: TEST_ID,
            ownerId: TEST_OWNER_ID,
            owner: TEST_OWNER_API,
            title: TEST_TITLE,
            description: TEST_DESCRIPTION,
            tags: TEST_TAGS,
            cards: TEST_CARDS_API,
        } as ApiDeck;
        const modal = DeckModel.createFromApi(api);

        it ('creates an object', () => {
            expect(modal).toBeDefined()
        });
        assertProperties(modal, {
            id: TEST_ID,
            ownerId: TEST_OWNER_ID,
            title: TEST_TITLE,
            description: TEST_DESCRIPTION,
            tags: TEST_TAGS,
        }, 'DeckModal');

        describe('owner', () => {
            assertProperties(modal.owner || {}, {
                id: TEST_OWNER.id,
                userName: TEST_OWNER.userName,
                displayName: TEST_OWNER.displayName,
            } as UserModel);
        });

        it ('has cards', () => expect(modal.cards.length).toBeGreaterThan(0));
        modal.cards.forEach((card, cardIndex) => {
            describe(`card ${cardIndex+1}`, () => {
                it ('has sides', () => expect(card.sides.length).toBeGreaterThan(0));
                card.sides.forEach((side, sideIndex) => {
                    describe(`side ${sideIndex+1}`, () => {
                        it ('has content', () => expect(side.content.length).toBeGreaterThan(0));
                        side.content.forEach((content, contentIndex) => {
                            const expectedContent = TEST_CARDS[cardIndex]?.sides[sideIndex]?.content[contentIndex];
                            assertProperties(content, {
                                format: expectedContent?.format,
                                type: expectedContent?.type,
                                value: expectedContent?.value,
                                size: expectedContent?.size,
                            }, `content ${contentIndex+1}`);
                        });
                    });
                })
            });
        });

    });

});
