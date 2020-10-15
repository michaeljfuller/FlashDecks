// https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
export interface ILogColors {
    Black: string;
    Red: string;
    Green: string;
    Yellow: string;
    Blue: string;
    Magenta: string;
    Cyan: string;
    White: string;
    Gray: string;
    BrightRed: string;
    BrightGreen: string;
    BrightYellow: string;
    BrightBlue: string;
    BrightMagenta: string;
    BrightCyan: string;
    BrightWhite: string;
}
export type LogColorName = keyof ILogColors;
