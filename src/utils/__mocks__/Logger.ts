import type {Logger} from "../Logger";
import {PublicMembers} from "../class";
import {LogColor} from '../logging/logColors';

export class MockLogger implements PublicMembers<Logger> {
    public enabled = true;
    readonly canStyle = true;

    readonly isEmpty = true;
    readonly notEmpty = false;

    //<editor-fold desc="Output">

    group = jest.fn().mockReturnThis();
    groupCollapsed = jest.fn().mockReturnThis();
    log = jest.fn().mockReturnThis();
    info = jest.fn().mockReturnThis();
    error = jest.fn().mockReturnThis();
    warning = jest.fn().mockReturnThis();
    groupEnd = jest.fn().mockReturnThis();
    groupEndAll = jest.fn().mockReturnThis();
    clear = jest.fn().mockReturnThis();

    //</editor-fold>
    //<editor-fold desc="Add">

    add = jest.fn().mockReturnThis();
    addSpaced = jest.fn().mockReturnThis();
    addLogRef = jest.fn().mockReturnThis();
    addMethod = jest.fn().mockReturnThis();
    readonly lineBreak: Logger = this as any;
    readonly space: Logger = this as any;
    readonly stack: Logger = this as any;

    //</editor-fold>
    //<editor-fold desc="Color">

    color = jest.fn().mockReturnThis();
    background = jest.fn().mockReturnThis();
    resetColors = jest.fn().mockReturnThis();

    readonly currentColor: LogColor = null;
    readonly currentBackground: LogColor = null;

    readonly black: Logger = this as any;
    readonly red: Logger = this as any;
    readonly green: Logger = this as any;
    readonly yellow: Logger = this as any;
    readonly blue: Logger = this as any;
    readonly magenta: Logger = this as any;
    readonly cyan: Logger = this as any;
    readonly white: Logger = this as any;
    readonly gray: Logger = this as any;
    readonly brightRed: Logger = this as any;
    readonly brightGreen: Logger = this as any;
    readonly brightYellow: Logger = this as any;
    readonly brightBlue: Logger = this as any;
    readonly brightMagenta: Logger = this as any;
    readonly brightCyan: Logger = this as any;
    readonly brightWhite: Logger = this as any;

    readonly bgBlack: Logger = this as any;
    readonly bgRed: Logger = this as any;
    readonly bgGreen: Logger = this as any;
    readonly bgYellow: Logger = this as any;
    readonly bgBlue: Logger = this as any;
    readonly bgMagenta: Logger = this as any;
    readonly bgCyan: Logger = this as any;
    readonly bgWhite: Logger = this as any;
    readonly bgGray: Logger = this as any;
    readonly bgBrightRed: Logger = this as any;
    readonly bgBrightGreen: Logger = this as any;
    readonly bgBrightYellow: Logger = this as any;
    readonly bgBrightBlue: Logger = this as any;
    readonly bgBrightMagenta: Logger = this as any;
    readonly bgBrightCyan: Logger = this as any;
    readonly bgBrightWhite: Logger = this as any;

    //</editor-fold>
}
export { MockLogger as Logger }
export default new MockLogger();

export function asMockLogger(logger: Logger): MockLogger {
    return logger as any;
}
