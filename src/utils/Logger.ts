import {LogColor} from './logging/logColors';
import {PrintFactory} from "./logging/PrintFactory";
import {interlace} from "./array";
import {isPlatformWeb} from "../platform";
import {getStack} from "./function";
import {getLogRef} from "./debugging/logRef";

export {LogColor} from './logging/logColors';

//<editor-fold desc="Queue Types">

export type LogQueueItem = LogQueueItemMessage | LogQueueItemColor | LogQueueItemBackground;
export enum LogQueueItemType {
    Message,
    Color,
    Background
}
export interface LogQueueItemMessage {
    type: LogQueueItemType.Message;
    value: any;
}
export interface LogQueueItemColor {
    type: LogQueueItemType.Color;
    value: LogColor;
}
export interface LogQueueItemBackground {
    type: LogQueueItemType.Background;
    value: LogColor;
}

//</editor-fold>

/**
 * A multi-platform logger that can color output.
 * @example
 *  logger
 *      .color('Red')       // Set color & return self
 *      .add('Something:')  // Append text & return self
 *      .blue               // Set color & return self
 *      .log(data)          // Append final value and output as "log".
 */
export class Logger {
    protected groupDepth = 0;
    protected queue: LogQueueItem[] = [];
    protected printer: PrintFactory = new PrintFactory();
    public enabled = true;

    get isEmpty() {
        return this.queue.length >= 0;
    }
    get notEmpty() {
        return !this.isEmpty;
    }

    constructor(readonly canStyle = true) {}

    //<editor-fold desc="Output">

    /** Output group */
    group(...items: any[]): this {
        if (this.enabled) {
            this.addSpaced(...items);
            console.group(...this.getPrintArgs());
            this.groupDepth++;
        }
        this.clear();
        return this;
    }

    /** Output collapsed group */
    groupCollapsed(...items: any[]): this {
        if (this.enabled) {
            this.addSpaced(...items);
            console.groupCollapsed(...this.getPrintArgs());
            this.groupDepth++;
        }
        this.clear();
        return this;
    }

    /** Output log */
    log(...items: any[]): this {
        if (this.enabled) {
            this.addSpaced(...items);
            const args = this.getPrintArgs();
            if (args.length) console.log(...args);
        }
        this.clear();
        return this;
    }

    /** Output info */
    info(...items: any[]): this {
        if (this.enabled) {
            this.addSpaced(...items);
            const args = this.getPrintArgs();
            if (args.length) console.info(...args);
        }
        this.clear();
        return this;
    }

    /** Output void */
    error(...items: any[]): this {
        if (this.enabled) {
            this.addSpaced(...items);
            const args = this.getPrintArgs();
            if (args.length) console.error(...args);
        }
        this.clear();
        return this;
    }

    /** Output warning */
    warning(...items: any[]): this {
        if (this.enabled) {
            this.addSpaced(...items);
            const args = this.getPrintArgs();
            if (args.length) console.warn(...args);
        }
        this.clear();
        return this;
    }

    /** Close the group. */
    groupEnd(): this {
        if (this.enabled) {
            if (this.groupDepth > 0) {
                console.groupEnd();
                this.groupDepth--;
            }
        }
        return this;
    }

    groupEndAll(): this {
        while (this.enabled && this.groupDepth > 0) {
            this.groupEnd();
        }
        return this;
    }

    clear(): this {
        this.queue = [];
        this.printer.clear();
        return this;
    }

    //</editor-fold>
    //<editor-fold desc="Add">

    /** Queue item to be printed. */
    add(...items: any[]): this {
        items.forEach(value => this.queue.push({ type: LogQueueItemType.Message, value }));
        return this;
    }

    /** Queue items to be printed, with spaces between them. */
    addSpaced(...items: any[]): this {
        return this.add(...interlace(items, ' '));
    }

    /** Queue string containing the target's reference. */
    addLogRef(target: object, prepend = '', append = ''): this {
        const {type, id} = getLogRef(target);
        return this.add(prepend + type + '#' + id + append);
    }

    /** Queue a line break to be printed. */
    get lineBreak(): this {
        return this.add('\n');
    }

    /** Queue a space to be printed. */
    get space(): this {
        return this.add(' ');
    }

    /** Queue the call stack to be printed */
    get stack(): this {
        const list = getStack();
        list.shift(); // Remove self
        if (list.length) {
            const indent = '> ';
            return this.add(indent + list.join('\n'+indent));
        }
        return this;
    }

    //</editor-fold>
    //<editor-fold desc="Print">

    /** Print the queue. */
    protected getPrintArgs(): any[] {
        this.printer.start(this.groupDepth);
        this.queue.forEach((item) => {
            switch (item.type) {
                case LogQueueItemType.Message: return this.printer.addMessage(item.value);
                case LogQueueItemType.Color: return this.printer.addForegroundColor(item.value);
                case LogQueueItemType.Background: return this.printer.addBackgroundColor(item.value);
            }
        });
        return this.printer.finish();
    }

    //</editor-fold>
    //<editor-fold desc="Color">

    color(value: LogColor): this {
        if (this.canStyle) this.queue.push({ type: LogQueueItemType.Color, value });
        return this;
    }
    background(value: LogColor): this {
        if (this.canStyle) this.queue.push({ type: LogQueueItemType.Background, value });
        return this;
    }
    resetColors(): this {
        return this.color(null).background(null);
    }

    get black(): this { return this.color("Black"); }
    get red(): this { return this.color("Red"); }
    get green(): this { return this.color("Green"); }
    get yellow(): this { return this.color("Yellow"); }
    get blue(): this { return this.color("Blue"); }
    get magenta(): this { return this.color("Magenta"); }
    get cyan(): this { return this.color("Cyan"); }
    get white(): this { return this.color("White"); }
    get gray(): this { return this.color("Gray"); }
    get brightRed(): this { return this.color("BrightRed"); }
    get brightGreen(): this { return this.color("BrightGreen"); }
    get brightYellow(): this { return this.color("BrightYellow"); }
    get brightBlue(): this { return this.color("BrightBlue"); }
    get brightMagenta(): this { return this.color("BrightMagenta"); }
    get brightCyan(): this { return this.color("BrightCyan"); }
    get brightWhite(): this { return this.color("BrightWhite"); }

    get bgBlack(): this { return this.background("Black"); }
    get bgRed(): this { return this.background("Red"); }
    get bgGreen(): this { return this.background("Green"); }
    get bgYellow(): this { return this.background("Yellow"); }
    get bgBlue(): this { return this.background("Blue"); }
    get bgMagenta(): this { return this.background("Magenta"); }
    get bgCyan(): this { return this.background("Cyan"); }
    get bgWhite(): this { return this.background("White"); }
    get bgGray(): this { return this.background("Gray"); }
    get bgBrightRed(): this { return this.background("BrightRed"); }
    get bgBrightGreen(): this { return this.background("BrightGreen"); }
    get bgBrightYellow(): this { return this.background("BrightYellow"); }
    get bgBrightBlue(): this { return this.background("BrightBlue"); }
    get bgBrightMagenta(): this { return this.background("BrightMagenta"); }
    get bgBrightCyan(): this { return this.background("BrightCyan"); }
    get bgBrightWhite(): this { return this.background("BrightWhite"); }

    //</editor-fold>
}
export default new Logger();
