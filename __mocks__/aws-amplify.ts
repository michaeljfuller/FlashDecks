import type {graphqlOperation as _graphqlOperation} from "aws-amplify";
import {MockApi} from "./aws-amplify/MockApi";
import {MockHub} from "./aws-amplify/MockHub";
import {MockAuth} from "./aws-amplify/MockAuth";
import {MockStorage} from "./aws-amplify/MockStorage";

export const Hub = new MockHub;
export const Auth = new MockAuth;
export const API = new MockApi;
export const Storage = new MockStorage;

export const graphqlOperation = jest.fn() as jest.MockedFunction<typeof _graphqlOperation>;
