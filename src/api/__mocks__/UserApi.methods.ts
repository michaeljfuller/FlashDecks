import type {UserApi} from "../UserApi";
import {UserModel} from "../../models";
import ApiRequest from "../util/ApiRequest";

export const UserApi_getUser = {

    resolvesUser: (user?: UserModel) => function(id: string) {
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
    } as UserApi['getUser'],

    noUser: () => function(id: string) {
        id = id || 'mock-id'
        return new ApiRequest(
            Promise.reject(
                new Error(`mock-UserApi.getUser[${id}]-error`)
            ),
            {id}
        );
    } as UserApi['getUser'],

};
