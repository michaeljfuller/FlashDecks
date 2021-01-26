import {getType} from "./type";

export function errorToString(error: Error|string|any): string {
    const type = typeof error;
    if (type === "string") {
        return error;
    }
    if (error && type === "object") {
        const name: string = typeof error.name === "string" ? error.name : undefined;
        const message: string = typeof error.message === "string" ? error.message : undefined;
        if (name && message) return name + ": " + message;
        if (name || message) return name || message;
    }
    return `Unknown Error (${getType(error)})`;
}

// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-newtarget
export class CustomError extends Error {
    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}
