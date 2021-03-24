import type {GraphQLResult} from '@aws-amplify/api-graphql';
import type {APIClass} from '@aws-amplify/api/src/API';
import type {PublicMembers} from "../../src/utils/class";
import {JestMockManager} from "../../test/mocks/JestMockManager";
import {createMock} from "../../test/mocks/mock-utils";

export class MockApi implements PublicMembers<APIClass> {
    mocks = new JestMockManager(this);

    cancel = createMock<APIClass['cancel']>();
    configure = createMock<APIClass['configure']>();
    del = createMock<APIClass['del']>();
    endpoint = createMock<APIClass['endpoint']>();
    get = createMock<APIClass['get']>();
    getGraphqlOperationType = createMock<APIClass['getGraphqlOperationType']>();
    getModuleName = createMock<APIClass['getModuleName']>();
    graphql = createMock<APIClass['graphql']>();
    head = createMock<APIClass['head']>();
    isCancel = createMock<APIClass['isCancel']>();
    patch = createMock<APIClass['patch']>();
    post = createMock<APIClass['post']>();
    put = createMock<APIClass['put']>();
}

export const mockApiMethods = {
    graphql: {
        success: (result: GraphQLResult) => {
            return function(): Promise<GraphQLResult> {
                return Promise.resolve(result);
            } as APIClass['graphql']
        },
        wait: (promise: Promise<GraphQLResult>) => {
            return function(): Promise<GraphQLResult> {
               return promise;
            } as APIClass['graphql']
        },
        error: (error: any) => {
            return function(): Promise<GraphQLResult> {
                return Promise.reject(error);
            } as APIClass['graphql']
        },
    },
};
