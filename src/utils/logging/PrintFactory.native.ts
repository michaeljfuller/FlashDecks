import {PrintFactoryBase} from "./PrintFactory.common";
import {LogColor} from "./Logger";
import {ILogColors} from "./logColors";

export class PrintFactory extends PrintFactoryBase {
    protected result: any[] = [];
    protected groupDepth = 0;
    protected currentForeground: LogColor = null;
    protected currentBackground: LogColor = null;
    protected currentString = ''; // Current string being put together

    clear() {
        this.result = [];
        this.currentForeground = null;
        this.currentBackground = null;
        this.currentString = '';
    }

    private get indent(): string {
        return '  '.repeat(this.groupDepth);
    }

    start(groupDepth: number): void {
        this.clear();
        this.groupDepth = groupDepth;
        this.addMessage(this.indent);
    }

    addMessage(value: any) {
        if (value === null) return this.addMessageAsText('null');
        if (value === undefined) return this.addMessageAsText('undefined');
        switch (typeof value) {
            case "object":   return this.addMessageAsObject(value, "Green");
            case "string":   return this.addMessageAsText(value, "Yellow");
            case "number":   return this.addMessageAsText(value.toString(10), "BrightBlue");
            case "bigint":   return this.addMessageAsText(value.toString(10), "BrightBlue");
            case "boolean":  return this.addMessageAsText(value ? 'true' : 'false', "Red");
            case "symbol":   return this.addMessageAsText(value.toString(), "Red");
            case "function": return this.addMessageAsText(value.toString(), "BrightRed");
        }
    }

    private addMessageAsText(value: string, foreground: LogColor = null, background: LogColor = null) {
        // Apply type colors if using defaultColors (e.g. orange string, blue numbers)
        const hasColors = this.currentForeground || this.currentBackground;
        const applyDefaultColor = !hasColors && (foreground || background);

        // Apply default colors
        if (applyDefaultColor) {
            if (foreground) this.currentString += ForegroundColors[foreground];
            if (background) this.currentString += BackgroundColors[background];
        }

        // Add text
        this.currentString += this.indentLineBreaks(value);

        // Clear default color
        if (applyDefaultColor) {
            this.currentString += ConsoleCode.Reset;
        }
    }

    private addMessageAsObject(value: any, foreground: LogColor = null, background: LogColor = null) {
        // Apply type colors if using defaultColors (e.g. orange string, blue numbers)
        const usingDefaultColors = !this.currentForeground && !this.currentBackground;
        const applyNewColor = !usingDefaultColors && foreground || background;

        if (applyNewColor) {
            if (foreground) this.currentString += ForegroundColors[foreground];
            if (background) this.currentString += BackgroundColors[background];
        }

        if (this.currentString) this.result.push(this.currentString);
        this.result.push(value); // TODO add indent
        this.currentString = applyNewColor ? ConsoleCode.Reset : '';
    }

    addForegroundColor(value: LogColor) {
        this.currentForeground = value;
        if (value) {
            this.currentString += ForegroundColors[value];
        } else {
            // If value is null, reset colors and re-apply existing background.
            this.currentString += ConsoleCode.Reset;
            if (this.currentBackground) this.addBackgroundColor(this.currentBackground);
        }
    }

    addBackgroundColor(value: LogColor) {
        this.currentBackground = value;
        if (value) {
            this.currentString += BackgroundColors[value];
        } else {
            // If value is null, reset colors and re-apply existing foreground.
            this.currentString += ConsoleCode.Reset;
            if (this.currentForeground) this.addForegroundColor(this.currentForeground);
        }
    }

    private indentLineBreaks(value: string): string {
        const indent = this.indent;
        if (indent) {
            return value.replace(/\n/g, '\n' + indent);
        }
        return value;
    }

    finish() {
        this.result.push(this.currentString + ConsoleCode.Reset); // Add last item and Reset colors.
        const result = this.result;
        this.clear();
        return result;
    }

}

//<editor-fold desc="Color Codes">
// https://en.wikipedia.org/wiki/ANSI_escape_code#Colors

// const ForegroundColors: Readonly<ILogColors> = {
//     Black:          '[F.Black]',
//     Red:            '[F.Red]',
//     Green:          '[F.Green]',
//     Yellow:         '[F.Yellow]',
//     Blue:           '[F.Blue]',
//     Magenta:        '[F.Magenta]',
//     Cyan:           '[F.Cyan]',
//     White:          '[F.White]',
//     Gray:           '[F.Gray]',
//     BrightRed:      '[F.BrightRed]',
//     BrightGreen:    '[F.BrightGreen]',
//     BrightYellow:   '[F.BrightYellow]',
//     BrightBlue:     '[F.BrightBlue]',
//     BrightMagenta:  '[F.BrightMagenta]',
//     BrightCyan:     '[F.BrightCyan]',
//     BrightWhite:    '[F.BrightWhite]',
// }
// const BackgroundColors: Readonly<ILogColors> = {
//     Black:          '[B.Black]',
//     Red:            '[B.Red]',
//     Green:          '[B.Green]',
//     Yellow:         '[B.Yellow]',
//     Blue:           '[B.Blue]',
//     Magenta:        '[B.Magenta]',
//     Cyan:           '[B.Cyan]',
//     White:          '[B.White]',
//     Gray:           '[B.Gray]',
//     BrightRed:      '[B.BrightRed]',
//     BrightGreen:    '[B.BrightGreen]',
//     BrightYellow:   '[B.BrightYellow]',
//     BrightBlue:     '[B.BrightBlue]',
//     BrightMagenta:  '[B.BrightMagenta]',
//     BrightCyan:     '[B.BrightCyan]',
//     BrightWhite:    '[B.BrightWhite]',
// }
// const ConsoleCode = Object.freeze({
//     Reset:      '[Reset]',
//     Bright:     '[Bright]',
//     Dim:        '[Dim]',
//     Underscore: '[Underscore]',
//     Blink:      '[Blink]',
//     Reverse:    '[Reverse]',
//     Hidden:     '[Hidden]',
// });
const ForegroundColors: Readonly<ILogColors> = {
    Black:          '\x1b[30m',
    Red:            '\x1b[31m',
    Green:          '\x1b[32m',
    Yellow:         '\x1b[33m',
    Blue:           '\x1b[34m',
    Magenta:        '\x1b[35m',
    Cyan:           '\x1b[36m',
    White:          '\x1b[37m',
    Gray:           '\x1b[90m',
    BrightRed:      '\x1b[91m',
    BrightGreen:    '\x1b[92m',
    BrightYellow:   '\x1b[93m',
    BrightBlue:     '\x1b[94m',
    BrightMagenta:  '\x1b[95m',
    BrightCyan:     '\x1b[96m',
    BrightWhite:    '\x1b[97m',
}
const BackgroundColors: Readonly<ILogColors> = {
    Black:          '\x1b[40m',
    Red:            '\x1b[41m',
    Green:          '\x1b[42m',
    Yellow:         '\x1b[43m',
    Blue:           '\x1b[44m',
    Magenta:        '\x1b[45m',
    Cyan:           '\x1b[46m',
    White:          '\x1b[47m',
    Gray:           '\x1b[100m',
    BrightRed:      '\x1b[101m',
    BrightGreen:    '\x1b[102m',
    BrightYellow:   '\x1b[103m',
    BrightBlue:     '\x1b[104m',
    BrightMagenta:  '\x1b[105m',
    BrightCyan:     '\x1b[106m',
    BrightWhite:    '\x1b[107m',
}
const ConsoleCode = Object.freeze({
    Reset:      '\x1b[0m',
    Bright:     '\x1b[1m',
    Dim:        '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink:      '\x1b[5m',
    Reverse:    '\x1b[7m',
    Hidden:     '\x1b[8m',
});
//</editor-fold>
