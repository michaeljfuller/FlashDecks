import {assertNewInstance, assertProperties} from "./core/model-test-utils";
import UserModel, {ApiUser} from "./UserModel";

const TEST_ID = 'test-id';
const TEST_DISPLAY_NAME = 'test-displayName';

describe('UserModel', () => {
    it('can be created', () => {
        expect(new UserModel).toBeDefined()
    });

    describe('#update()', () => {

        describe('with callback', () => {
            const original = new UserModel;
            const updated = original.update(draft => {
                draft.id = TEST_ID;
                draft.displayName = TEST_DISPLAY_NAME;
            });
            assertNewInstance(original, updated);
            assertProperties(updated, {
                id: TEST_ID,
                displayName: TEST_DISPLAY_NAME
            });
        });

        describe('with object', () => {
            const original = new UserModel;
            const updated = original.update({
                id: TEST_ID,
                displayName: TEST_DISPLAY_NAME
            });
            assertNewInstance(original, updated);
            assertProperties(updated, {
                id: TEST_ID,
                displayName: TEST_DISPLAY_NAME
            });
        });

    });

    describe('#fromApi()', () => {
        const api = {
            id: TEST_ID,
            displayName: TEST_DISPLAY_NAME
        } as ApiUser;
        it ('creates an object', () => {
            expect(UserModel.fromApi(api)).toBeDefined()
        });
        assertProperties(UserModel.fromApi(api), {
            id: TEST_ID,
            displayName: TEST_DISPLAY_NAME
        });
    });

});
