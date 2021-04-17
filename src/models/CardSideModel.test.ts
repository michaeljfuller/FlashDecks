import {assertNewInstance, assertProperties, repeat} from "./core/model-test-utils";
import {ApiCardSide, CardSideModel} from "./CardSideModel";
import {ApiCardContent, CardContentModel} from "./CardContentModel";
import {CardSideContentType} from "../graphql/API";

const TEST_CONTENT_API = repeat<ApiCardContent>(3, (index, array, size) => ({
    __typename: "CardSideContent",
    id: 'test-content-id-'+(index+1),
    type: (['Text', 'Image', 'Video', 'Link'] as CardSideContentType[])[index % size],
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
        const modal = CardSideModel.fromApi(api);
        const newContent = CardContentModel.fromApi({
            __typename: "CardSideContent",
            value: "updated-content",
            type: CardSideContentType.Text,
            size: null,
        });
        const newContentIndex = 0;

        it ('creates an object', () => {
            expect(modal).toBeDefined()
        });
        it ('can update content', () => {
            const updatedModal = modal.setContent(newContent, newContentIndex);
            expect(updatedModal.content[newContentIndex].value).toEqual(newContent.value);
        });
        it ("content doesn't change on original modal (is immutable)", () => {
            expect(modal.content[newContentIndex].value).not.toEqual(newContent.value);
        });
    });

});
