import {isPlatformWeb} from '../platform';
import {mapToObject} from "./object";
import {Logger, LogColor} from "./Logger"

export {compare} from "./debugging/compare"

// Log CSS styles
const defaultBackgroundColor: LogColor = isPlatformWeb ? null: null;
const defaultPunctuationColor: LogColor = isPlatformWeb ? null : null;
const defaultClassColor: LogColor = isPlatformWeb ? "Green" : "BrightGreen";
const defaultMethodColor: LogColor = isPlatformWeb ? "Blue" : "Cyan";
const defaultArgumentColor: LogColor = isPlatformWeb ? "Yellow" : "Yellow";
const defaultInfoColor: LogColor = isPlatformWeb ? "BrightRed" : "BrightRed";

const LogRefKey = Symbol('Debugging log ref');
const lastRefMap: Record<string, number> = {};
function getLogRef(instance: any): number {
    if (instance[LogRefKey]) return instance[LogRefKey];
    const key = getType(instance);
    return instance[LogRefKey] = lastRefMap[key] = (lastRefMap[key] || 0) + 1;
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
        const className = getType(target);
        const getter = descriptor.get;
        if (getter) {
            descriptor.get = function () {
                const instanceRef = '{' + getLogRef(this) + '}';
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

/** Common code between logMethod & logFunction. */
function wrapAndLogFunction<Func extends GenericFunction = GenericFunction>(
    func: Func,
    scope: any,
    functionName: string,
    options?: WrapAndLogFunctionOptions,
): Func {
    const {
        logArgs = false,
        logTarget = false,
        logResult = false,
        extras,
        group = true,
        collapsed = false,
        styleOutput = true,
        color = defaultMethodColor,
        parentColor = defaultClassColor,
        backgroundColor = defaultBackgroundColor,
        punctuationColor = defaultPunctuationColor,
        argumentColor = defaultArgumentColor,
        infoColor = defaultInfoColor,
    } = options || {};

    const paramNames = getParamNames(func);

    return giveFunctionName(
        functionName+'_$LogWrapper',
        function (this: any, ...args: any[]) {
            const target = scope || this;

            const logger = new Logger(styleOutput);
            logger.background(backgroundColor);

            // Group string: Class/Scope + Function name
            const runLogTargetAndFunction = () => {
                if (target) {
                    logger.color(parentColor).add(getType(target) + '{' + getLogRef(target) + '}');
                    logger.color(punctuationColor).add('.');
                }
                logger.color(color).add(functionName);
            };
            runLogTargetAndFunction();

            // Group string: Arguments
            logger.color(punctuationColor).add('(');
            logger.color(argumentColor).add(inlineArgsForList(args, paramNames));
            logger.color(punctuationColor).add(')');

            // Log: Group string
            if (!group)         logger.info();
            else if (collapsed) logger.groupCollapsed();
            else                logger.group();

            // Log: Extras
            if (logArgs) {
                logger.color(infoColor).add('Args: ').info(
                    mapToObject(
                        args,
                        (value, key, index) => ({
                            value,
                            key: paramNames[index],
                            skip: !paramNames[index],
                        })
                    )
                );
            }
            if (logTarget) {
                logger.color(infoColor).info('Target: ', this);
            }
            if (extras) {
                Object.keys(extras).forEach(extraKey => {
                    const extraCallback = extras[extraKey];
                    if (extraCallback) {
                        try {
                            logger.color(infoColor).info(extraKey+': ', extraCallback(target, args));
                        } catch (e) {
                            logger.color(infoColor).error(extraKey+': ', e);
                        }
                    }
                })
            }

            try {
                // Run, log & return result
                const result = func.apply(this, args); // Run original
                if (logResult) {
                    runLogTargetAndFunction();
                    logger.color(infoColor).info(' Result: ', result);
                }
                return result;
            } catch (e) {
                logger.error(e);
                throw e; // Re-throw
            } finally {
                logger.groupEndAll(); // Close group
            }
        } as Func // End of function
    );
}

export interface WrapAndLogFunctionOptions<Parent = any, Func extends GenericFunction = GenericFunction> {
    logArgs?: boolean;              // 'Args: [...]'
    logTarget?: boolean;            // 'Target: MyClass {...}'
    logResult?: boolean;            // 'Result: undefined'
    extras?: LogExtraMap<Parent, Func>;   // Print out extra info, based on the key and output of the callback
    group?: boolean;                // If a log group should be created
    collapsed?: boolean;            // If the log group should be collapsed
    styleOutput?: boolean;          // If log should be colored.
    color?: LogColor;               // Log color for function name
    parentColor?: LogColor;         // Log color for the class/scope
    backgroundColor?: LogColor;     // Log color for the background
    punctuationColor?: LogColor;    // Log color for the punctuation
    argumentColor?: LogColor;       // Log color for the arguments
    infoColor?: LogColor;           // Log color for extra details
}
type LogExtraMap<Type = any, Func extends GenericFunction = GenericFunction> = Record<string, LogExtraCallback<Type, Func>>;
type LogExtraCallback<Type = any, Func extends GenericFunction = GenericFunction> = (instanceOrScope: Type, args: Parameters<Func>) => any;
type GenericFunction = (...args: any) => any;

/** Attach a name to a function */
function giveFunctionName<Type extends GenericFunction>(name: string, func: Type): Type {
    Object.defineProperty(func, 'name', {value: name, writable: false});
    return func;
}

/** Get the names of parameters */
function getParamNames(func: Function): string[] {
    const searchResult = /\(.*\)/.exec(func.toString()); // "(a, b, c)"
    if (searchResult && searchResult[0]) {
        return searchResult[0]
            .substr(1, searchResult[0].length-2)
            .split(',')
            .map(s => s.trim());
    }
    return [];
}

/** Inline argument list (e.g. '1, true, "one", null, <MyClass> */
function inlineArgsForList(args: any[], paramNames: string[] = [], maxStringLength = 50, multilineLengthThreshold = 100) {
    if (args.length === 0) return '';

    const formattedArgs = args.map(arg => {
        switch (arg) {
            case undefined: return "undefined";
            case null: return "null";
        }
        switch (typeof arg) {
            case "string": return arg.length <= maxStringLength ? `"${arg}"` : `"${arg.substr(0, maxStringLength-1) + '…'}"`;
            case "number": return arg;
            case "boolean": return arg;
        }
        return '<' + getType(arg) + '>';
    }).map(
        (arg, index) => paramNames[index] ? `${paramNames[index]}: ${arg}` : arg
    ).filter(value => value);

    // Join together
    const joinedArgs = formattedArgs.join(', ');
    if (joinedArgs.length <= multilineLengthThreshold) return joinedArgs;

    // If too long for single line, make multiline
    return ' \n\t' + formattedArgs.join(',\n\t') + ' \n ';
}

/** Return the class name, function name, the JS data type, or "null". */
export function getType(target: any): DataType | "null" | string {
    if (target === null) return "null";
    const type = typeof target;
    switch (type) {
        case "object":
            if (target?.constructor?.name) return target?.constructor?.name;
            break;
        case "function":
            if (target.name) return target.name;
            break;
    }
    return type;
}
type DataType = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
