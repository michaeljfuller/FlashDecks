import {assertNewInstance, assertProperties, repeat} from "./core/model-test-utils";
import CardModel , {ApiCard} from "./CardModel";
import UserModel, {ApiUser} from "./UserModel";
import CardSideModel, {ApiCardSide} from "./CardSideModel";
import {ApiCardContent, CardContentType} from "./CardContentModel";
import {castDraft} from "immer";

const TEST_ID = 'test-id';
const TEST_NAME = 'test-name';
const TEST_OWNER_ID = 'test-owner-id';
const TEST_OWNER_API = {
    id: TEST_OWNER_ID,
    displayName: 'test-owner-displayName'
} as ApiUser;
const TEST_OWNER = UserModel.fromApi(TEST_OWNER_API);
const TEST_SIDES_API = repeat<ApiCardSide>(3, sideIndex => ({
    content: repeat<ApiCardContent>(3,
        (contentIndex, array, size) => ({
            id: `test-side-${sideIndex+1}-content-${contentIndex+1}`,
            type: (['Text', 'Image', 'Video', 'Link'] as CardContentType[])[contentIndex % size],
            value: `test-side-${sideIndex+1}-value-${contentIndex+1}`,
            size: contentIndex/size,
        })
    )
}));
const TEST_SIDES = TEST_SIDES_API.map(CardSideModel.fromApi);

describe('CardModel', () => {
    it('can be created', () => {
        expect(new CardModel).toBeDefined()
    });

    describe('#update()', () => {

        describe('with callback', () => {
            const original = new CardModel;
            const updated = original.update(draft => {
                draft.id = TEST_ID;
                draft.name = TEST_NAME;
                draft.ownerId = TEST_OWNER_ID;
                draft.owner = TEST_OWNER;
                draft.sides = castDraft(TEST_SIDES);
            });
            assertNewInstance(original, updated);
            assertProperties(updated, {
                id: TEST_ID,
                name: TEST_NAME,
                ownerId: TEST_OWNER_ID,
                owner: TEST_OWNER,
                sides: TEST_SIDES,
            });
        });

        describe('with object', () => {
            const original = new CardModel;
            const updated = original.update({
                id: TEST_ID,
                name: TEST_NAME,
                ownerId: TEST_OWNER_ID,
                owner: TEST_OWNER,
                sides: TEST_SIDES,
            });
            assertNewInstance(original, updated);
            assertProperties(updated, {
                id: TEST_ID,
                name: TEST_NAME,
                ownerId: TEST_OWNER_ID,
                owner: TEST_OWNER,
                sides: TEST_SIDES,
            });
        });

    });

    describe('#fromApi()', () => {
        const api = {
            id: TEST_ID,
            name: TEST_NAME,
            ownerId: TEST_OWNER_ID,
            owner: TEST_OWNER_API,
            sides: TEST_SIDES_API,
        } as ApiCard;
        it ('creates an object', () => {
            expect(CardModel.fromApi(api)).toBeDefined()
        });
        assertProperties(CardModel.fromApi(api), {
            id: TEST_ID,
            name: TEST_NAME,
            ownerId: TEST_OWNER_ID,
            owner: TEST_OWNER,
            sides: TEST_SIDES,
        });
    });

});
