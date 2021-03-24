//<editor-fold desc="Mocks">

jest.mock("../../platform", () => ({
    get deviceName () { return "mock-deviceName"; },
    get platformOS () { return "mock-platformOS"; },
    get isPlatformWeb () { return true; },
}));
import * as platform from "../../platform";
const deviceName = jest.spyOn((platform as any).default, 'deviceName', 'get');
const platformOS = jest.spyOn((platform as any).default, 'platformOS', 'get');
const isPlatformWeb = jest.spyOn((platform as any).default, 'isPlatformWeb', 'get');

jest.mock("../../env", () => ({
    get envName () { return "mock-envName"; },
    get isProduction () { return false; },
}))
import * as env from "../../env";
const envName = jest.spyOn((env as any).default, 'envName', 'get');
const isProduction = jest.spyOn((env as any).default, 'isProduction', 'get');

jest.mock("../../appDetails", () => ({
    get appName () { return "mock-appName"; },
    get description () { return "mock-description"; },
    get version () { return "mock-version"; },
}));
import * as appDetails from "../../appDetails";
const appName = jest.spyOn((appDetails as any).default, 'appName', 'get');
const description = jest.spyOn((appDetails as any).default, 'description', 'get');
const version = jest.spyOn((appDetails as any).default, 'version', 'get');

//</editor-fold>
//<editor-fold desc="Imports">

import React from "react";
import {render} from "@testing-library/react";
import InfoBanner from "./InfoBanner";

//</editor-fold>

describe("InfoBanner", () => {
    it("shows the device name", () => {
        expect(render(<InfoBanner />).container.innerHTML).toContain("mock-deviceName");
    });
    it("shows the platform name", () => {
        expect(render(<InfoBanner />).container.innerHTML).toContain("mock-platformOS");
    });
    it("shows the environment name", () => {
        expect(render(<InfoBanner />).container.innerHTML).toContain("mock-envName");
    });
    it("shows the version number", () => {
        expect(render(<InfoBanner />).container.innerHTML).toContain("mock-version");
    });
    it("isn't shown in production", () => {
        isProduction.mockReturnValueOnce(true);
        expect(render(<InfoBanner />).container).toBeEmptyDOMElement();
    });

    describe("web", () => {
        beforeEach(() => isPlatformWeb.mockReturnValueOnce(true));
        it("shows app name", () => {
            expect(render(<InfoBanner />).container.innerHTML).toContain("mock-appName");
        });
        it("shows app description", () => {
            expect(render(<InfoBanner />).container.innerHTML).toContain("mock-description");
        });
    });

    describe("native", () => {
        beforeEach(() => isPlatformWeb.mockReturnValueOnce(false));
        it("doesn't show app name", () => {
            expect(render(<InfoBanner />).container.innerHTML).not.toContain("mock-appName");
        });
        it("doesn't show app description", () => {
            expect(render(<InfoBanner />).container.innerHTML).not.toContain("mock-description");
        });
    });

});
