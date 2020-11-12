export interface GenericClass<T extends {} = {}> extends Function {
    new (...args: any[]): T;
    prototype: T;
}

export function renameClass<T = any>(name: string, constructor: T): T {
    Object.defineProperty(constructor, 'name', {value: name, writable: false});
    return constructor;
}
