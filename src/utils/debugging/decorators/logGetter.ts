import {LogGetterOptions as Options, wrapAndLogGetter} from "../wrapAndLogGetter";
import {getType} from "../../type";

export type LogGetterOptions = Options;

/**
 * When the tagged method is run, log to the console and group everything run under it.
 * @example
 *  Class MyClass {
 *      @logGetter()
 *      myGetter() { return "foo"; }
 *  }
 *  const myInstance = new MyClass;
 *  myInstance.myGetter; // MyClass{1}.myGetter >> "foo"
 */
export function logGetter(options?: LogGetterOptions) {
    return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
        if (descriptor.get) {
            wrapAndLogGetter(propertyName, descriptor.get, options);
        } else {
            console.warn(`No getter "${propertyName}" on ${getType(target)}`);
        }
    }
}
