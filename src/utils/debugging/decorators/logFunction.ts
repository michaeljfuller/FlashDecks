import {GenericFunction} from "../../function";
import {wrapAndLogFunction, WrapAndLogFunctionOptions} from "../wrapAndLogFunction";

export interface LogFunctionOptions<
    Parent = any,
    Func extends GenericFunction = GenericFunction
> extends WrapAndLogFunctionOptions<Parent, Func> {

}

/**
 * @example
 *  Class MyClass {
 *      exclaim = logFunction((str: string) => str + '!')
 *  }
 *  const myInstance = new MyClass;
 *  myInstance.exclaim("my string") // > MyClass{1}.exclaim("my string")
 *                                  //   > Result: "my string!"
 */
export function logFunction<Func extends GenericFunction = GenericFunction, Scope extends object = any>(
    func: Func,
    label = func.name || 'Anonymous',
    scope?: Scope,
    options?: LogFunctionOptions<Scope, Func>
): Func {
    return wrapAndLogFunction(func, scope, label, options);
}
