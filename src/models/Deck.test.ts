import {castDraft} from "immer";
import {assertNewInstance, assertProperties, repeat} from "./core/model-test-utils";
import DeckModel, {ApiDeck} from "./Deck";
import CardModel, {ApiCard} from "./Card";
import UserModel, {ApiUser} from "./User";

const TEST_ID = 'test-id';
const TEST_OWNER_ID = 'test-ownerId';
const TEST_OWNER_API = { id: TEST_OWNER_ID, displayName: 'test-owner-displayName' } as ApiUser;
const TEST_OWNER = UserModel.fromApi(TEST_OWNER_API);
const TEST_NAME = 'test-name';
const TEST_DESCRIPTION = 'test-description';
const TEST_TAGS = repeat<string>(3, index => `test-tag-${index+1}`);
const TEST_CARDS_API = repeat<ApiCard>(3, index => ({
    id: `test-card-`+(index+1),
    ownerId: `test-ownerId-`+(index+1),
    owner: {
        id: `test-card-id-`+(index+1),
        displayName: `test-card-displayName-`+(index+1),
    },
    name: `test-name-`+(index+1),
    sides: [],
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
                draft.name = TEST_NAME;
                draft.description = TEST_DESCRIPTION;
                draft.tags = TEST_TAGS;
                draft.cards = castDraft(TEST_CARDS);
            });
            assertNewInstance(original, updated);
            assertProperties(updated, {
                id: TEST_ID,
                ownerId: TEST_OWNER_ID,
                owner: TEST_OWNER,
                name: TEST_NAME,
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
                name: TEST_NAME,
                description: TEST_DESCRIPTION,
                tags: TEST_TAGS,
                cards: TEST_CARDS,
            });
            assertNewInstance(original, updated);
            assertProperties(updated, {
                id: TEST_ID,
                ownerId: TEST_OWNER_ID,
                owner: TEST_OWNER,
                name: TEST_NAME,
                description: TEST_DESCRIPTION,
                tags: TEST_TAGS,
                cards: TEST_CARDS,
            });
        });

    });

    describe('#fromApi()', () => {
        const api = {
            id: TEST_ID,
            ownerId: TEST_OWNER_ID,
            owner: TEST_OWNER_API,
            name: TEST_NAME,
            description: TEST_DESCRIPTION,
            tags: TEST_TAGS,
            cards: TEST_CARDS_API,
        } as ApiDeck;
        it ('creates an object', () => {
            expect(DeckModel.fromApi(api)).toBeDefined()
        });
        assertProperties(DeckModel.fromApi(api), {
            id: TEST_ID,
            ownerId: TEST_OWNER_ID,
            owner: TEST_OWNER,
            name: TEST_NAME,
            description: TEST_DESCRIPTION,
            tags: TEST_TAGS,
            cards: TEST_CARDS,
        });
    });

});
