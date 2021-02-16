import {assertNewInstance, assertProperties} from "./core/model-test-utils";
import CardContentModel , {ApiCardContent} from "./CardContentModel";

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
                draft.value = TEST_VALUE;
                draft.type = TEST_TYPE;
                draft.size = TEST_SIZE;
            });
            assertNewInstance(original, updated);
            assertProperties(updated, {
                value: TEST_VALUE,
                type: TEST_TYPE,
                size: TEST_SIZE,
            });
        });

        describe('with object', () => {
            const original = new CardContentModel;
            const updated = original.update({
                value: TEST_VALUE,
                type: TEST_TYPE,
                size: TEST_SIZE,
            });
            assertNewInstance(original, updated);
            assertProperties(updated, {
                value: TEST_VALUE,
                type: TEST_TYPE,
                size: TEST_SIZE,
            });
        });

    });

    describe('#fromApi()', () => {
        const api = {
            value: TEST_VALUE,
            type: TEST_TYPE,
            size: TEST_SIZE,
        } as ApiCardContent;
        it ('creates an object', () => {
            expect(CardContentModel.fromApi(api)).toBeDefined()
        });
        assertProperties(CardContentModel.fromApi(api), {
            value: TEST_VALUE,
            type: TEST_TYPE,
            size: TEST_SIZE,
        });
    });

});
