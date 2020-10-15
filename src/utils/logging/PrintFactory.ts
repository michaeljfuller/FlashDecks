import {PrintFactoryBase} from "./PrintFactory.common";
import {ILogColors, LogColor} from "./logColors";

//<editor-fold desc="Queue Types">
enum QueueItemType { String, Object, Style }
type QueueItem = StringQueueItem | ObjectQueueItem | StyleQueueItem;
interface StringQueueItem {
    type: QueueItemType.String;
    value: string;
    defaultForeground: LogColor;
    defaultBackground: LogColor;
}
interface ObjectQueueItem {
    type: QueueItemType.Object;
    value: object;
}
interface StyleQueueItem {
    type: QueueItemType.Style;
    foreground?: LogColor;
    background?: LogColor;
}
//</editor-fold>

/**
 * @link https://developer.mozilla.org/en-US/docs/Web/API/console#Styling_console_output
 */
export class PrintFactory extends PrintFactoryBase {
    private queue: QueueItem[] = [];
    private groupDepth = 0;

    clear() {
        this.queue = [];
        this.groupDepth = 0;
    }

    start(groupDepth: number): void {
        this.clear();
        this.groupDepth = groupDepth;
    }

    //<editor-fold desc="addMessage">

    addMessage(value: any) {
        if (value === null) return this.addMessageAsText('null');
        if (value === undefined) return this.addMessageAsText('undefined');
        switch (typeof value) {
            case "object":   return this.addMessageAsObject(value);
            case "string":   return this.addMessageAsText(value, "Yellow");
            case "number":   return this.addMessageAsText(value.toString(10), "BrightBlue");
            case "bigint":   return this.addMessageAsText(value.toString(10), "BrightBlue");
            case "boolean":  return this.addMessageAsText(value ? 'true' : 'false', "Red");
            case "symbol":   return this.addMessageAsText(value.toString(), "Red");
            case "function": return this.addMessageAsText(value.toString(), "BrightRed");
        }
    }
    private addMessageAsText(value: string, defaultForeground: LogColor = null, defaultBackground: LogColor = null) {
        this.queue.push({
            type: QueueItemType.String,
            value,
            defaultForeground,
            defaultBackground
        });
    }
    private addMessageAsObject(value: object) {
        this.queue.push({ type: QueueItemType.Object, value });
    }

    //</editor-fold>
    //<editor-fold desc="addStyle">

    addForegroundColor(value: LogColor) {
        this.addStyle({foreground: value});
    }
    addBackgroundColor(value: LogColor) {
        this.addStyle({background: value});
    }
    private addStyle(style: Omit<StyleQueueItem, 'type'>) {
        const item = this.queue[this.queue.length-1]; // Get current item.
        if (item && item.type === QueueItemType.Style) { // If current item in queue is style...
            Object.assign(item, style); // update it with passed values.
        } else { // If current item was not a style...
            this.queue.push({ type: QueueItemType.Style, ...style }); // add a fresh item to the queue
        }
    }

    //</editor-fold>

    /**
     * @example
     *
     */
    finish() {
        const result: Array<string|object> = [];

        let currentString = '';
        const currentStyle: StyleQueueItem = { type: QueueItemType.Style };
        const cssArgs: string[] = []
        let hasNewStyle = false;

        // The browser can only style the first argument.
        // So we build up the first argument as a string (`currentString`), along with any styles (`cssArgs`).
        // If an object is introduced, that has to come in as a separate argument.
        // This means that the `currentString` and `cssArgs` get added to the `result` first.
        this.queue.forEach(item => {
            switch (item.type) {
                // On string
                case QueueItemType.String:
                    if (result.length === 0) {
                        // If this is the first argument, it can be styled, so set as a single string
                        if (!currentStyle.foreground && !currentStyle.background) { // If no style, use defaults
                            if (item.defaultForeground || item.defaultBackground) {
                                cssArgs.push(colorsToCss(item.defaultForeground, item.defaultBackground));
                                hasNewStyle = true; // Flag that a new style was added
                            }
                        }
                        if (hasNewStyle) currentString += '%c'; // Style was just added, so needs style token
                        currentString += item.value;
                    } else {
                        // If not first arg, cannot be styled, so no need to build up string
                        result.push(item.value);
                    }
                    hasNewStyle = false;
                    break;
                // On object
                case QueueItemType.Object:
                    if (currentString) result.push(currentString); // If there is a string built up, add it first
                    if (cssArgs.length) result.push(...cssArgs); // If there are styles up, add them first.
                    result.push(item.value); // Add the item
                    break;
                // On style
                case QueueItemType.Style:
                    if (result.length === 0) { // If the first argument hasn't been added yet, it can be styled
                        Object.assign(currentStyle, item); // Update currentStyle
                        cssArgs.push(colorsToCss(currentStyle.foreground, currentStyle.background)); // Push CSS
                        hasNewStyle = true; // Flag that a new style was added
                    }
                    break;
            }
        });
        // If results weren't pushed due to an object being added, do it now.
        if (result.length === 0) {
            result.push(currentString, ...cssArgs);
        }

        this.clear();
        return result;
        // console.log("%cHello "+"%cWorld", "color:red", "color:blue", {foo:1}, "cannot be styled" );
    }
}

//<editor-fold desc="Colors">
// https://en.wikipedia.org/wiki/ANSI_escape_code#Colors

const HexColors: Readonly<ILogColors> = {
    Black:          '#000000',
    Red:            '#aa0000',
    Green:          '#00aa00',
    Yellow:         '#aa5500',
    Blue:           '#0000aa',
    Magenta:        '#aa00aa',
    Cyan:           '#00aaaa',
    White:          '#aaaaaa',
    Gray:           '#555555',
    BrightRed:      '#ff5555',
    BrightGreen:    '#55ff55',
    BrightYellow:   '#ffff55',
    BrightBlue:     '#5555ff',
    BrightMagenta:  '#ff55ff',
    BrightCyan:     '#55ffff',
    BrightWhite:    '#ffffff',
}
function colorsToCss(foreground?: LogColor, background?: LogColor) {
    let css = '';
    if (foreground) css += `color:${HexColors[foreground]};`;
    if (background) css += `background:${HexColors[background]};`;
    return css;
}
//</editor-fold>
