import {LogColor, LogColorName} from "../logging/logColors";
import {isPlatformWeb} from "../../platform";
import {removeFirst} from "../array";

// Log CSS styles
export const defaultBackgroundColor: LogColor = isPlatformWeb ? null: null;
export const defaultPunctuationColor: LogColor = isPlatformWeb ? null : null;
// export const defaultClassColor: LogColor = isPlatformWeb ? "Green" : "BrightGreen";
// export const defaultMethodColor: LogColor = isPlatformWeb ? "Blue" : "Cyan";
export const defaultArgumentColor: LogColor = isPlatformWeb ? "Yellow" : "Yellow";
export const defaultInfoColor: LogColor = isPlatformWeb ? "BrightRed" : "BrightRed";

//<editor-fold desc="Instance Color">

/** Get a color for the passed instance */
export function instanceColor(id: number) {
    return instanceColors[id % instanceColors.length];
}
const instanceColors: LogColorName[] = [
    'BrightRed',
    isPlatformWeb ? null : 'BrightYellow',
    'BrightBlue',
    'BrightMagenta',
    'BrightCyan',
    'Red',
    'Green',
    'Blue',
    'Magenta',
    isPlatformWeb ? null : 'BrightCyan',
].filter(v => v) as LogColorName[];

//</editor-fold>
//<editor-fold desc="Class Color">

/** Get the next class color */
export function classColor(name: string) {
    if (!classColorMap[name]) {
        classColorMap[name] = classColors[previousClassColorIndex = ++previousClassColorIndex % classColors.length]
    }
    return classColorMap[name];
}
let previousClassColorIndex = -1;
const classColorMap: Record<string, LogColorName> = {};
const classColors: LogColorName[] = removeFirst([
    'Red',
    'Green',
    'Blue',
    'Magenta',
    'Cyan',
    'BrightRed',
    isPlatformWeb ? null : 'BrightYellow',
    'BrightBlue',
    'BrightMagenta',
    isPlatformWeb ? null : 'BrightCyan',
], defaultArgumentColor).filter(v => v) as LogColorName[];

//</editor-fold>
//<editor-fold desc="Method Color">

/** Get color for a method name. */
export function methodColor(name: string) {
    if (!methodColorMap[name]) {
        methodColorMap[name] = methodColors[previousMethodColorIndex = ++previousMethodColorIndex % methodColors.length]
    }
    return methodColorMap[name];
}
let previousMethodColorIndex = -1;
const methodColorMap: Record<string, LogColorName> = {};
const methodColors: LogColorName[] = [
    'BrightRed',
    isPlatformWeb ? null : 'BrightYellow',
    'BrightBlue',
    'BrightMagenta',
    isPlatformWeb ? null : 'BrightCyan',
    'Red',
    'Green',
    'Blue',
    'Magenta',
    'Cyan',
].filter(v => v) as LogColorName[];

//</editor-fold>
