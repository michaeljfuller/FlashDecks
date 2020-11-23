export interface GenericClass<T extends {} = {}> extends Function {
    new (...args: any[]): T;
    prototype: T;
}

//<editor-fold desc="renameClass">

/** Function to rename the passed class */
export function renameClass<T extends Function>(name: string, constructor: T): T;

/** Decorator to rename the passed class */
export function renameClass(name: string): ClassDecorator;

/**
 * Renames a class. Can be used as a function or decorator.
 * @example
 *  renameClass('FooBar', FooClass);
 * @example
 *  @renameClass('FooBar')
 *  class FooClass {
 */
export function renameClass<T extends Function>(name: string, constructor?: T): ClassDecorator|T {
    if (constructor) {
        Object.defineProperty(constructor, 'name', {value: name, writable: false});
        return constructor;
    } else {
        return function (constructor: Function) {
            renameClass(name, constructor);
        };
    }
}

//</editor-fold>
