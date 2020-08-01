import {assertNewInstance, assertProperties} from "./core/model-test-utils";
import CognitoUserModel, {ApiCognitoUser} from "./CognitoUser";

const TEST_USERNAME = 'test-username';
const TEST_EMAIL = 'test-email';
const TEST_EMAIL_VERIFIED = true;
const TEST_SUB = 'test-sub';

describe('CognitoUserModel', () => {
    it('can be created', () => {
        expect(new CognitoUserModel).toBeDefined()
    });

    describe('#update()', () => {

        describe('with callback', () => {
            const original = new CognitoUserModel;
            const updated = original.update(draft => {
                draft.username = TEST_USERNAME;
                draft.email = TEST_EMAIL;
                draft.email_verified = TEST_EMAIL_VERIFIED;
                draft.sub = TEST_SUB;
            });
            assertNewInstance(original, updated);
            assertProperties(updated, {
                username: TEST_USERNAME,
                email: TEST_EMAIL,
                email_verified: TEST_EMAIL_VERIFIED,
                sub: TEST_SUB,
            });
        });

        describe('with object', () => {
            const original = new CognitoUserModel;
            const updated = original.update({
                username: TEST_USERNAME,
                email: TEST_EMAIL,
                email_verified: TEST_EMAIL_VERIFIED,
                sub: TEST_SUB,
            });
            assertNewInstance(original, updated);
            assertProperties(updated, {
                username: TEST_USERNAME,
                email: TEST_EMAIL,
                email_verified: TEST_EMAIL_VERIFIED,
                sub: TEST_SUB,
            });
        });

    });

    describe('#fromApi()', () => {
        const api = {
            username: TEST_USERNAME,
            attributes: {
                email: TEST_EMAIL,
                email_verified: TEST_EMAIL_VERIFIED,
                sub: TEST_SUB,
            }
        } as ApiCognitoUser;
        it ('creates an object', () => {
            expect(CognitoUserModel.fromApi(api)).toBeDefined()
        });
        assertProperties(CognitoUserModel.fromApi(api), {
            username: TEST_USERNAME,
            email: TEST_EMAIL,
            email_verified: TEST_EMAIL_VERIFIED,
            sub: TEST_SUB,
        });
    });

});
