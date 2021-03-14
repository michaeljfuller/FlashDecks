import {MockHub} from "./aws-amplify/MockHub";
import {MockAuth} from "./aws-amplify/MockAuth";

export const Hub = new MockHub;
export const Auth = new MockAuth;

export class API {
    static async graphql(){}
}
export function graphqlOperation(){}
