import {assertNewInstance, assertProperties, repeat} from "./core/model-test-utils";
import CardModel , {ApiCard} from "./CardModel";
import CardSideModel, {ApiCardSide} from "./CardSideModel";
import {ApiCardContent} from "./CardContentModel";
import {CardSideContentType} from "../graphql/API";
import {castDraft} from "immer";

const TEST_NAME = 'test-name';
const TEST_SIDES_API = repeat<ApiCardSide>(3, sideIndex => ({
    __typename: "CardSide",
    content: repeat<ApiCardContent>(3, (contentIndex, array, size) => ({
        __typename: "CardSideContent",
        size: null,
        type: (['Text', 'Image', 'Video', 'Link'] as CardSideContentType[])[contentIndex % size],
        value: `test-side-${sideIndex+1}-value-${contentIndex+1}`,
    })),
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
                draft.title = TEST_NAME;
                draft.sides = castDraft(TEST_SIDES);
            });
            assertNewInstance(original, updated);
            assertProperties(updated, {
                title: TEST_NAME,
                sides: TEST_SIDES,
            });
        });

        describe('with object', () => {
            const original = new CardModel;
            const updated = original.update({
                title: TEST_NAME,
                sides: TEST_SIDES,
            });
            assertNewInstance(original, updated);
            assertProperties(updated, {
                title: TEST_NAME,
                sides: TEST_SIDES,
            });
        });

    });

    describe('#fromApi()', () => {
        const api = {
            title: TEST_NAME,
            sides: TEST_SIDES_API,
        } as ApiCard;
        const model = CardModel.fromApi(api);

        it ('creates an object', () => expect(model).toBeDefined());
        it ('has the right title', () => expect(model.title).toBe(TEST_NAME));
        it ('has sides', () => expect(model.sides.length).toBeGreaterThan(0));
        it ('has the right number of sides', () => expect(model.sides.length).toEqual(TEST_SIDES.length));

        model.sides.forEach((side, sideIndex) => {
            describe(`side ${sideIndex+1}`, () => {
                it ('has content', () => expect(side.content.length).toBeGreaterThan(0));
                it ('has the right number of content', () => expect(side.content.length).toEqual(TEST_SIDES[sideIndex].content.length));
                side.content.forEach((content, contentIndex) => {
                    assertProperties(content, {
                        type: TEST_SIDES[sideIndex].content[contentIndex].type,
                        value: TEST_SIDES[sideIndex].content[contentIndex].value,
                        size: TEST_SIDES[sideIndex].content[contentIndex].size,
                        format: TEST_SIDES[sideIndex].content[contentIndex].format,
                    }, `content ${contentIndex+1}`)
                })
            });
        });
    });

});
