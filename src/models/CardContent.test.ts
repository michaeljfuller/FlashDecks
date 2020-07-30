import {assertNewInstance, assertProperties} from "./model-test-utils";
import CardContentModel , {ApiCardContent} from "./CardContent";

const TEST_ID = 'test-id';
const TEST_VALUE = 'test-value';
const TEST_TYPE = 'Video';
const TEST_SIZE = 0.5;

describe('CardContentModel', () => {
    it('can be created', () => {
        expect(new CardContentModel).toBeDefined()
    });

    describe('#update()', () => {

        describe('with callback', () => {
            const original = new CardContentModel;
            const updated = original.update(draft => {
                draft.id = TEST_ID;
                draft.value = TEST_VALUE;
                draft.type = TEST_TYPE;
                draft.size = TEST_SIZE;
            });
            assertNewInstance(original, updated);
            assertProperties(updated, {
                id: TEST_ID,
                value: TEST_VALUE,
                type: TEST_TYPE,
                size: TEST_SIZE,
            });
        });

        describe('with object', () => {
            const original = new CardContentModel;
            const updated = original.update({
                id: TEST_ID,
                value: TEST_VALUE,
                type: TEST_TYPE,
                size: TEST_SIZE,
            });
            assertNewInstance(original, updated);
            assertProperties(updated, {
                id: TEST_ID,
                value: TEST_VALUE,
                type: TEST_TYPE,
                size: TEST_SIZE,
            });
        });

    });

    describe('#fromApi()', () => {
        const api = {
            id: TEST_ID,
            value: TEST_VALUE,
            type: TEST_TYPE,
            size: TEST_SIZE,
        } as ApiCardContent;
        it ('creates an object', () => {
            expect(CardContentModel.fromApi(api)).toBeDefined()
        });
        assertProperties(CardContentModel.fromApi(api), {
            id: TEST_ID,
            value: TEST_VALUE,
            type: TEST_TYPE,
            size: TEST_SIZE,
        });
    });

});
