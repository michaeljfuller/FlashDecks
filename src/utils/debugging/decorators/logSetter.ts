import {LogSetterOptions as Options, wrapAndLogSetter} from "../wrapAndLogSetter";
import {getType} from "../../type";

export type LogSetterOptions = Options;

/**
 * When the tagged method is run, log to the console and group everything run under it.
 * @example
 *  Class MyClass {
 *      @logSetter()
 *      mySetter(v: string) { this._value = v; }
 *      private _value = '';
 *  }
 *  const myInstance = new MyClass;
 *  myInstance.mySetter = "foo"; // MyClass{1}.mySetter << "foo"
 */
export function logSetter(options?: LogSetterOptions) {
    return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
        if (descriptor.set) {
            wrapAndLogSetter(propertyName, descriptor.set, options);
        } else {
            console.warn(`No setter "${propertyName}" on ${getType(target)}`);
        }
    }
}
