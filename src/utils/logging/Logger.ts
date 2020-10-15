import {LogColorName} from './logColors';
import {PrintFactory} from "./PrintFactory";

//<editor-fold desc="Types">

export type LogColor = LogColorName|null;

export enum LogType {
    None,
    Group,
    GroupCollapsed,
    Log,
    Info,
    Error,
    Warning
}

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

export class Logger {
    protected currentType: LogType = LogType.None;
    protected collapsed = false;
    protected groupDepth = 0;
    protected queue: LogQueueItem[] = [];
    protected printer: PrintFactory = new PrintFactory();
    public enabled = true;
    public defaultColor: LogColor = null;
    public defaultBackground: LogColor = null;

    //<editor-fold desc="Start">

    /** Start a new line of the given type. */
    start(type: LogType): this {
        this.currentType = type;
        return this;
    }

    /** Start a new group line. */
    get group(): this {
        this.collapsed = false;
        return this.start(LogType.Group);
    }

    /** Start a new collapsed group line. */
    get groupCollapsed(): this {
        this.collapsed = true;
        return this.start(LogType.GroupCollapsed);
    }

    /** Start a new log line. */
    get log(): this {
        return this.start(LogType.Log);
    }

    /** Start a new info line. */
    get info(): this {
        return this.start(LogType.Info);
    }

    /** Start a new error line. */
    get error(): this {
        return this.start(LogType.Error);
    }

    /** Start a new warning line. */
    get warning(): this {
        return this.start(LogType.Warning);
    }

    //</editor-fold>
    //<editor-fold desc="Write">

    /** Queue item to be printed. */
    append(...items: any[]): this {
        items.forEach(value => this.queue.push({ type: LogQueueItemType.Message, value }));
        return this;
    }

    /** Queue a line break to be printed. */
    get lineBreak(): this {
        return this.append('\n');
    }

    /** Queue a space to be printed. */
    get space(): this {
        return this.append(' ');
    }

    /** Add item and print the queue. */
    write(...items: any[]): this {
        return this.append(...items).end();
    }

    //</editor-fold>
    //<editor-fold desc="End">

    /** Print the queue. */
    protected print(): void {
        this.printer.start(this.groupDepth);

        this.queue.forEach((item) => {
            switch (item.type) {
                case LogQueueItemType.Message: return this.printer.addMessage(item.value);
                case LogQueueItemType.Color: return this.printer.addForegroundColor(item.value);
                case LogQueueItemType.Background: return this.printer.addBackgroundColor(item.value);
            }
        });
        const args = this.printer.finish();

        switch (this.currentType) {
            case LogType.Group: return console.group(...args);
            case LogType.GroupCollapsed: return console.groupCollapsed(...args);
            case LogType.Log: return console.log(...args);
            case LogType.Info: return console.info(...args);
            case LogType.Error: return console.error(...args);
            case LogType.Warning: return console.warn(...args);
        }
    }

    /** Print the queue. */
    end(cancel = false): this {
        if (!cancel) {
            if (this.enabled) {
                this.print();
            }
            if (this.currentType === LogType.Group) {
                this.groupDepth++;
            }
        }
        this.currentType = LogType.None;
        this.queue = [];
        return this;
    }

    /** Close the group. */
    groupEnd(): this { // TODO close for web
        if (this.groupDepth > 0) {
            this.groupDepth--;
        }
        return this;
    }

    //</editor-fold>
    //<editor-fold desc="Color">

    color(value: LogColor): this {
        this.queue.push({ type: LogQueueItemType.Color, value });
        return this;
    }
    background(value: LogColor): this {
        this.queue.push({ type: LogQueueItemType.Background, value });
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


/*

logger.group() // Flag as "setting up group" and return self
    .color('Red') // Set color & return self
    .append('Something:') // Append text & return self
    .blue  // Set color & return self
    .write(data) // Append text, print data, remove "setting up group" flag, increment indent & return self
    .resetColor(); // Reset color & return self
 */
