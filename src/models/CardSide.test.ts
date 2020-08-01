import {assertNewInstance, assertProperties, repeat} from "./core/model-test-utils";
import CardSideModel , {ApiCardSide} from "./CardSide";
import CardContentModel, {ApiCardContent} from "./CardContent";

const TEST_CONTENT_API = repeat<ApiCardContent>(3, (index, array, size) => ({
    id: 'test-content-id-'+(index+1),
    type: (['Text', 'Image', 'Video', 'Link'] as CardContentType[])[index % size],
    value: 'test-content-value-'+(index+1),
    size: index,
}));
const TEST_CONTENT = TEST_CONTENT_API.map(CardContentModel.fromApi);

describe('CardSideModel', () => {
    it('can be created', () => {
        expect(new CardSideModel).toBeDefined()
    });

    describe('#update()', () => {

        describe('with callback', () => {
            const original = new CardSideModel;
            const updated = original.update(draft => {
                draft.content = TEST_CONTENT;
            });
            assertNewInstance(original, updated);
            assertProperties(updated, {
                content: TEST_CONTENT,
            });
        });

        describe('with object', () => {
            const original = new CardSideModel;
            const updated = original.update({
                content: TEST_CONTENT,
            });
            assertNewInstance(original, updated);
            assertProperties(updated, {
                content: TEST_CONTENT,
            });
        });

    });

    describe('#fromApi()', () => {
        const api = {
            content: TEST_CONTENT_API,
        } as ApiCardSide;
        it ('creates an object', () => {
            expect(CardSideModel.fromApi(api)).toBeDefined()
        });
        assertProperties(CardSideModel.fromApi(api), {
            content: TEST_CONTENT,
        });
    });

});
