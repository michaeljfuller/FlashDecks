import {LogColor} from "./Logger";

export abstract class PrintFactoryBase {
    constructor() {
        this.clear();
    }
    abstract clear(): void;

    abstract start(groupDepth: number): void;
    abstract addMessage(value: any): void;
    abstract addForegroundColor(value: LogColor): void;
    abstract addBackgroundColor(value: LogColor): void;
    abstract finish(): void;
}
