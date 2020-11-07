import {Logger, LogColor} from "./Logger"
import logger from "./Logger"
import {wrapAndLogFunction, WrapAndLogFunctionOptions} from "./debugging/wrapAndLogFunction";
import {defaultMethodColor, defaultClassColor, defaultBackgroundColor, defaultPunctuationColor} from "./debugging/debuggingOptions";
import {getLogRef} from "./debugging/logRef";
import {GenericFunction} from "./function";

export {compare, readableCompare} from "./debugging/compare";
export {Logger, logger};

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
export function logMethod<Class = any, Func extends GenericFunction = GenericFunction>(options?: WrapAndLogFunctionOptions<Class, Func>) {
    return function (
        target: Class,
        functionName: string,
        descriptor: PropertyDescriptor
    ) {
        descriptor.value = wrapAndLogFunction(descriptor.value, null, functionName, options);
    };
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
    options?: WrapAndLogFunctionOptions<Scope, Func>
): Func {
    return wrapAndLogFunction(func, scope, label, options);
}

/**
 * When the tagged method is run, log to the console and group everything run under it.
 * @example
 *  Class MyClass {
 *      @logGetter()
 *      myGetter() { return "my result"; }
 *  }
 *  const myInstance = new MyClass;
 *  myInstance.myGetter; // MyClass{1}.myGetter > {result: "my arg"}
 */
export function logGetter(options?: LogGetterOptions) {
    const {
        styleOutput = true,
        color = defaultMethodColor,
        parentColor = defaultClassColor,
        backgroundColor = defaultBackgroundColor,
        punctuationColor = defaultPunctuationColor,
    } = options || {};
    return function (
        target: any,
        propertyName: string,
        descriptor: PropertyDescriptor
    ) {
        const getter = descriptor.get;
        if (getter) {
            descriptor.get = function () {
                const {type: className, id} = getLogRef(this);
                const instanceRef = '{' + id + '}';
                const result = getter.apply(this);

                const logger = new Logger(styleOutput);
                logger.background(backgroundColor);
                logger.color(parentColor).add(className + instanceRef);
                logger.color(punctuationColor).add('.');
                logger.color(color).add(propertyName);
                logger.info({result});

                return result;
            }
        }
    }
}

interface LogGetterOptions {
    styleOutput?: boolean;          // If log should be colored.
    color?: LogColor;               // Log color for function name
    parentColor?: LogColor;         // Log color for the class/scope
    backgroundColor?: LogColor;     // Log color for the background
    punctuationColor?: LogColor;    // Log color for the punctuation
    argumentColor?: LogColor;       // Log color for the arguments
}
