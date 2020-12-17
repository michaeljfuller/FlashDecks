import {GenericFunction} from "../../function";
import {wrapAndLogFunction, WrapAndLogFunctionOptions} from "../wrapAndLogFunction";
import {getType} from "../../type";

export interface LogMethodOptions<
    Parent = any,
    Func extends GenericFunction = GenericFunction
> extends WrapAndLogFunctionOptions<Parent, Func> {

}

/**
 * When the tagged method is run, log to the console and group everything run under it.
 * @example
 *  Class MyClass {
 *      @logMethod({logResult:true})
 *      myMethod(foo: string) {
 *          return this.joinStrings(foo, '!');
 *      }
 *      @logMethod({ group: false })
 *      joinStrings(foo, bar) {
 *          return foo + bar;
 *      }
 *  }
 *  const myInstance = new MyClass;
 *  myInstance.myMethod("my arg")   // > MyClass{1}.myMethod("my arg")
 *                                  //   > MyClass{1}.mySubMethod("my arg", "!")
 *                                  //   > Result: "my arg!"
 */
export function logMethod<Class = any, Func extends GenericFunction = GenericFunction>(options?: LogMethodOptions<Class, Func>) {
    return function (
        target: Class,
        functionName: string,
        descriptor: PropertyDescriptor
    ) {
        if (descriptor.value) {
            descriptor.value = wrapAndLogFunction(descriptor.value, null, functionName, options);
        } else {
            console.warn(`No method "${functionName}" on ${getType(target)}`);
        }
    };
}
