import type {Storage} from '@aws-amplify/storage/src/Storage';
import type {S3Storage} from "../../src/api/MediaApi.s3";
import type {PublicMembers} from "../../src/utils/class";
import {JestMockManager} from "../../test/mocks/JestMockManager";
import {createMock, mockImplementation} from "../../test/mocks/mock-utils";

export class MockStorage implements PublicMembers<Storage> {
    mocks = new JestMockManager(this);

    addPluggable = createMock<Storage['addPluggable']>();
    configure = createMock<Storage['configure']>();
    get = createMock<Storage['get']>();
    getModuleName = createMock<Storage['getModuleName']>();
    getPluggable = createMock<Storage['getPluggable']>();
    list = createMock<Storage['list']>();
    put = createMock<Storage['put']>();
    remove = createMock<Storage['remove']>();
    removePluggable = createMock<Storage['removePluggable']>();

    vault: any = undefined;
}

export const mockStorageMethods = {

    get: {
        resolve: mockImplementation.resolve<S3Storage['get']>(),
        reject: mockImplementation.reject<S3Storage['get']>(),
        wait: mockImplementation.wait<S3Storage['get']>(),
    },

    put: {
        resolve: mockImplementation.resolve<S3Storage['put']>(),
        reject: mockImplementation.reject<S3Storage['put']>(),
        wait: mockImplementation.wait<S3Storage['put']>(),
    },

    remove: {
        resolve: mockImplementation.resolve<S3Storage['remove']>(),
        reject: mockImplementation.reject<S3Storage['remove']>(),
        wait: mockImplementation.wait<S3Storage['remove']>(),
    },

    list: {
        resolve: mockImplementation.resolve<S3Storage['list']>(),
        reject: mockImplementation.reject<S3Storage['list']>(),
        wait: mockImplementation.wait<S3Storage['list']>(),
    },

};
