//<editor-fold desc="Mocks">

import {API as _API, graphqlOperation as _graphqlOperation} from "aws-amplify";
import {MockApi, mockApiMethods} from "../../__mocks__/aws-amplify/MockApi";

jest.mock("aws-amplify");
const API: MockApi = _API as any;
const graphqlOperation = _graphqlOperation as jest.MockedFunction<typeof _graphqlOperation>;

jest.mock("../utils/Logger");

//</editor-fold>
//<editor-fold desc="Imports">

import {UserApi} from "./UserApi";
import {ApiUser, UserModel} from "../models";

//</editor-fold>

describe("UserApi", () => {
    let api: UserApi;
    beforeEach(() => api = new UserApi());
    afterEach(() => {
        API.mocks.resetAll();
        graphqlOperation.mockReset();
    });

    describe("#getUser", () => {
        const apiUser: ApiUser = {
            __typename: "User",
            id: "test-id",
            userName: "test-userName",
            displayName: "test-displayName",
        };

        it("gets the user", async () => {
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.success({ data: { getUser: apiUser } })
            );

            const result = await api.getUser("id").toPromise();
            expect(result).toBeInstanceOf(UserModel);
            expect(result.id).toBe(apiUser.id);
            expect(result.userName).toBe(apiUser.userName);
            expect(result.displayName).toBe(apiUser.displayName);
        });

        it("handles error", () => {
            API.graphql.mockImplementationOnce(
                mockApiMethods.graphql.error(new Error("test-error"))
            );
            return expect(
                api.getUser("id").toPromise()
            ).rejects.toThrow("test-error");
        });

    });

});
