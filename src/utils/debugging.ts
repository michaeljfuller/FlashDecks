import React from "react";
import {Logger, LogColor} from "./Logger"
import logger from "./Logger"
import {wrapAndLogFunction, WrapAndLogFunctionOptions} from "./debugging/wrapAndLogFunction";
import {
    defaultBackgroundColor,
    defaultPunctuationColor,
    classColor,
    instanceColor,
    methodColor
} from "./debugging/debuggingOptions";
import {getLogRef} from "./debugging/logRef";
import {GenericFunction} from "./function";
import {GenericClass, renameClass} from "./class";

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
                const {
                    color = methodColor(propertyName),
                    parentColor = classColor(className),
                } = options || {}

                const instanceRef = '{' + id + '}';
                const result = getter.apply(this);

                const logger = new Logger(styleOutput);
                logger.background(backgroundColor);
                logger.color(parentColor).add(className);
                logger.color(instanceColor(id)).add(instanceRef);
                logger.color(punctuationColor).add('.');
                logger.color(color).add(propertyName);
                logger.resetColors().add(' = ').info(result);

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

type Component = React.ComponentClass<any>|React.PureComponent<any>;

/** Log Component lifecycle events. */
export function logComponent<T extends Component>(options?: LogComponentOptions<T>) {
    const {
        ref,
        logDidMount = true,
        logDidUpdate = true,
        logWillUnmount = true,
        logRender = true,
    } = options || {};

    return function (component: GenericClass<T>) {
        const {
            color = classColor(component.name)
        } = options || {};
        const baseMethodOptions: WrapAndLogFunctionOptions = { ref, parentColor: color };

        class LoggedClass extends (component as any) {

            @logMethod<any>(Object.assign(
                baseMethodOptions,
                typeof logDidMount === 'boolean' ? { enabled: logDidMount } : logDidMount
            ))
            componentDidMount() {
                super.componentDidMount && super.componentDidMount();
            }

            @logMethod<any>(Object.assign(
                baseMethodOptions,
                typeof logDidUpdate === 'boolean' ? { enabled: logDidUpdate } : logDidUpdate
            ))
            componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
                super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState, snapshot);
            }

            @logMethod<any>(Object.assign(
                baseMethodOptions,
                typeof logWillUnmount === 'boolean' ? { enabled: logWillUnmount } : logWillUnmount
            ))
            componentWillUnmount() {
                super.componentWillUnmount && super.componentWillUnmount();
            }

            @logMethod<any>(Object.assign(
                baseMethodOptions,
                typeof logRender === 'boolean' ? { enabled: logRender } : logRender
            ))
            render() {
                return super.render();
            }
        }

        return renameClass(component.name, LoggedClass) as any;
    }
}
interface LogComponentOptions<C extends Component> {
    ref?: (scope: C) => string;
    logDidMount?: boolean|WrapAndLogFunctionOptions<C>;
    logDidUpdate?: boolean|WrapAndLogFunctionOptions<C>;
    logWillUnmount?: boolean|WrapAndLogFunctionOptions<C>;
    logRender?: boolean|WrapAndLogFunctionOptions<C>;
    color?: LogColor;
}
