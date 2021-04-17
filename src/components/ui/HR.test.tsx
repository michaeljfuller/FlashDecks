import React from "react";
import { render } from '@testing-library/react';
import HR, {HRProps} from "./HR";

function renderHR(props: HRProps = {}) {
    return render(<HR {...props} />);
}
function getStyles(hr: ReturnType<typeof renderHR>) {
    return hr.container.querySelector("[style]")?.getAttribute("style");
}

describe("HR", () => {
    it("has the right default style", () => {
        const styles = getStyles(renderHR());
        expect(styles).toContain("border-top-color: rgba(0,0,0,1.00);");
        expect(styles).toContain("border-right-color: rgba(0,0,0,1.00);");
        expect(styles).toContain("border-bottom-color: rgba(0,0,0,1.00);");
        expect(styles).toContain("border-left-color: rgba(0,0,0,1.00);");
        expect(styles).toContain("border-top-width: 2px;");
        expect(styles).toContain("height: 0px;");
        expect(styles).toContain("margin-top: 4px;");
        expect(styles).toContain("margin-bottom: 4px;");
    });
    it("can be given thickness", () => {
        const thickness = 10;
        const styles = getStyles(renderHR({thickness}));
        expect(styles).toContain("border-top-color: rgba(0,0,0,1.00);");
        expect(styles).toContain("border-right-color: rgba(0,0,0,1.00);");
        expect(styles).toContain("border-bottom-color: rgba(0,0,0,1.00);");
        expect(styles).toContain("border-left-color: rgba(0,0,0,1.00);");
        expect(styles).toContain("border-top-width: "+thickness+"px;");
        expect(styles).toContain("height: 0px;");
        expect(styles).toContain("margin-top: 4px;");
        expect(styles).toContain("margin-bottom: 4px;");
    });
    it("can be given spacing", () => {
        const spacing = 10;
        const styles = getStyles(renderHR({spacing}));
        expect(styles).toContain("border-top-color: rgba(0,0,0,1.00);");
        expect(styles).toContain("border-right-color: rgba(0,0,0,1.00);");
        expect(styles).toContain("border-bottom-color: rgba(0,0,0,1.00);");
        expect(styles).toContain("border-left-color: rgba(0,0,0,1.00);");
        expect(styles).toContain("border-top-width: 2px;");
        expect(styles).toContain("height: 0px;");
        expect(styles).toContain("margin-top: "+spacing+"px;");
        expect(styles).toContain("margin-bottom: "+spacing+"px;");
    });
    it("can be given color", () => {
        const color = "red";
        const styles = getStyles(renderHR({color}));
        expect(styles).toContain("border-top-color: rgba(255,0,0,1.00);");
        expect(styles).toContain("border-right-color: rgba(255,0,0,1.00);");
        expect(styles).toContain("border-bottom-color: rgba(255,0,0,1.00);");
        expect(styles).toContain("border-left-color: rgba(255,0,0,1.00);");
        expect(styles).toContain("border-top-width: 2px;");
        expect(styles).toContain("height: 0px;");
        expect(styles).toContain("margin-top: 4px;");
        expect(styles).toContain("margin-bottom: 4px;");
    });
});
