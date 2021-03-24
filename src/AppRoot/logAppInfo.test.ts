import {logAppInfo} from "./logAppInfo";
import {envName} from "../env";
import {deviceName, platformOS} from "../platform";
import {appName, version} from "../appDetails";

import _logger from "../utils/Logger";
import {asMockLogger} from "../utils/__mocks__/Logger";

const logger = asMockLogger(_logger);
jest.mock("../utils/Logger");

describe('logAppInfo', () => {
    const logSpy = jest.spyOn(logger, 'log');
    logAppInfo();

    it('uses the logger', () => expect(logSpy).toHaveBeenCalled());

    describe('output', () => {
        const callArgs = logSpy.mock.calls[0];
        const text: string = (callArgs||[])[0];
        it('has the app name', () => expect(text).toContain(`Name: ${appName}`));
        it('has the version number', () => expect(text).toContain(`Version: ${version}`));
        it('has the environment name', () => expect(text).toContain(`Environment: ${envName}`));
        it('has the platform name', () => expect(text).toContain(`Platform: ${platformOS}`));
        it('has the device name', () => expect(text).toContain(`Device: ${deviceName}`));
    });

});
