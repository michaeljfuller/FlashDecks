import {UserModel} from "../../models";
import ApiRequest from "../util/ApiRequest";
import {UserApi} from "../UserApi";
import {createMockMethodMap} from "../../../test/test-utils";

export const UserApi_getUser = createMockMethodMap(UserApi, "getUser", {

    resolvesUser: (user?: UserModel) => jest.fn(function(id: string) {
        id = id || 'mock-id'
        return new ApiRequest(
            Promise.resolve(
                user || UserModel.fromApi({
                    __typename: "User",
                    userName: `mock-UserModel[${id}]-userName`,
                    displayName: `mock-UserModel[${id}]-displayName`,
                    id,
                })
            ),
            {id}
        );
    }),

    noUser: () => jest.fn(function(id: string) {
        id = id || 'mock-id'
        return new ApiRequest(
            Promise.reject(
                new Error(`mock-UserApi.getUser[${id}]-error`)
            ),
            {id}
        );
    }),

});
