import {isPlatformWeb} from "../platform";

export type GenericFunction = (...args: any) => any;

/** Attach a name to a function */
export function giveFunctionName<Type extends GenericFunction>(name: string, func: Type): Type {
    Object.defineProperty(func, 'name', {value: name, writable: false});
    return func;
}

/** Get the names of parameters */
export function getParamNames(func: Function): string[] {
    const searchResult = /\(.*\)/.exec(func.toString()); // "(a, b, c)"
    if (searchResult && searchResult[0]) {
        return searchResult[0]
            .substr(1, searchResult[0].length-2)
            .split(',')
            .map(s => s.trim());
    }
    return [];
}

/** Get array of function names. */
export function getStack(): string[] {
    try {
        throw new Error();
    } catch (e) {
        let stack = (e as Error).stack;
        if (stack) {
            if (isPlatformWeb) {
                stack = stack.replace((e as Error).name+'\n', ''); // Remove opening line
                stack = stack.replace(/^\s*at\s+/gm, ''); // Remove "  at " from start of line
                stack = stack.replace(/ \(.*/gm, ''); // Remove full location after ' ('
            } else {
                stack = stack.replace(/@.*/gm, ''); // Remove full location after '@'
            }

            const result = stack.split('\n');
            result.shift(); // Remove 'getStack'
            return result;
        }
    }
    return [];
}
