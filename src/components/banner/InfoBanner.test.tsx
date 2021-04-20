//<editor-fold desc="Mocks">
// Use getters and spies to change the values with `mySpy.mockReturnValueOnce("new-value"))`

jest.mock("../../platform", () => ({
    get platformOS() { return "mock-platformOS"; },
}));
// import * as platform from "../../platform";
// const platformOS = jest.spyOn((platform as any).default, 'platformOS', 'get');

jest.mock("../../env", () => ({
    get backendBranch()  { return "mock-backend"; },
    get frontendBranch() { return "mock-frontend"; },
    get frontendCommit() { return "mock-commit"; },
}))
// import * as env from "../../env";
// const backendBranch = jest.spyOn((env as any).default, 'backendBranch', 'get');
// const frontendBranch = jest.spyOn((env as any).default, 'frontendBranch', 'get');
// const frontendCommit = jest.spyOn((env as any).default, 'frontendCommit', 'get');

jest.mock("../../appDetails", () => ({
    get version() { return "mock-version"; },
}));
// import * as appDetails from "../../appDetails";
// const version = jest.spyOn((appDetails as any).default, 'version', 'get');

//</editor-fold>
//<editor-fold desc="Imports">

import React from "react";
import {render} from "@testing-library/react";
import InfoBanner from "./InfoBanner";
import {capitalise} from "../../utils/string";

//</editor-fold>

describe("InfoBanner", () => {
    it("shows the platform name", () => {
        expect(render(<InfoBanner />).container.innerHTML).toContain(capitalise("mock-platformOS"));
    });
    it("shows the version number", () => {
        expect(render(<InfoBanner />).container.innerHTML).toContain("mock-version");
    });
    it("shows the commit hash", () => {
        expect(render(<InfoBanner />).container.innerHTML).toContain("mock-commit");
    });
    it("shows the frontend branch", () => {
        expect(render(<InfoBanner />).container.innerHTML).toContain("mock-frontend");
    });
    it("shows the backend branch", () => {
        expect(render(<InfoBanner />).container.innerHTML).toContain("mock-backend");
    });
});
