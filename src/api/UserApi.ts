import {API, graphqlOperation} from "aws-amplify";
import {getUser} from "../graphql/queries";
import {ApiUser, UserModel} from "../models";

export class UserApi {

    /** Get a user by ID */
    async getUser(id: string): Promise<UserModel|undefined> {
        const response: any = await API.graphql(graphqlOperation(getUser, { id }));
        const apiUser: ApiUser = response && response.data && response.data.getUser;
        return apiUser ? UserModel.fromApi(apiUser) : undefined; // TODO Throw error?
    }

}

export const userApi = new UserApi;
export default userApi;
