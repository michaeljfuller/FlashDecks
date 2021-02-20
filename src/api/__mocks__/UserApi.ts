import type {UserApi} from "../UserApi";
import {PublicMembers} from "../../utils/class";

import {UserApi_getUser} from "./UserApi.methods";
export * from "./UserApi.methods";

export class MockUserApi implements PublicMembers<UserApi> {
    getUser = UserApi_getUser.resolvesUser();
}

export { MockUserApi as UserApi }
export const userApi = new MockUserApi;
export default userApi;
