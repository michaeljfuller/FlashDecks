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
