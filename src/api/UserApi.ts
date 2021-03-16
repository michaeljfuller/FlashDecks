import {API, graphqlOperation} from "aws-amplify";
import {getUser} from "../graphql/queries";
import {GetUserQuery} from "../graphql/API";
import {UserModel} from "../models";
import ApiRequest from "./util/ApiRequest";
import {GraphQueryResponse} from "./util/ApiTypes";

export class UserApi {

    /** Get a user by ID */
    getUser(id: string): ApiRequest<UserModel> {
        const request = API.graphql(graphqlOperation(getUser, { id })) as GraphQueryResponse<GetUserQuery>;
        const promise = request.then(response => {
            const apiUser = response?.data?.getUser;
            if (!apiUser) throw new Error('No response object.');
            return UserModel.fromApi(apiUser);
        });
        return new ApiRequest(promise, {id});
    }

}

export const userApi = new UserApi;
export default userApi;
