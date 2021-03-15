import type {HubClass} from '@aws-amplify/core/src/Hub';
import type {PublicMembers} from "../../src/utils/class";
import {JestMockManager} from "../../test/mocks/JestMockManager";
import {createMock} from "../../test/mocks/mock-utils";
import {HubPayload} from "aws-amplify-react-native/types";

export class MockHub implements PublicMembers<HubClass> {
    mocks = new JestMockManager(this);

    name = "mock";
    protectedChannels = [];

    dispatch = createMock<HubClass['dispatch']>();
    listen = createMock<HubClass['listen']>();
    remove = createMock<HubClass['remove']>();
}

export const mockHubMethods = {
    listen: {
        wait: (promise: Promise<HubPayload>) => {
            return function(channel, callback) {
                if (typeof callback === "function") promise.then(
                    payload => callback({
                        source: "mock-source",
                        channel: "auth",
                        patternInfo: undefined,
                        payload,
                    })
                );
            } as HubClass['listen']
        },
    },
}
