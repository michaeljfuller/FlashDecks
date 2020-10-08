import {isPlatformWeb} from '../platform';
import {mapToObject} from "./object";

// Log CSS styles
const defaultBackgroundColor = '#555'
const defaultPunctuationColor = '#DDD'
const defaultClassColor = '#55FF55'
const defaultMethodColor = '#55eeff';
const defaultArgumentColor = '#ff9955';
const defaultInfoColor = '#d6b3ff';
function logStyle(foreground: string, background = defaultBackgroundColor, lineHeight = '18px') {
    return `color: ${foreground}; background: ${background}; line-height: ${lineHeight}; `;
}

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
        styleOutput = isPlatformWeb,
        color = defaultMethodColor,
        parentColor = defaultClassColor,
        backgroundColor = defaultBackgroundColor,
        punctuationColor = defaultPunctuationColor,
    } = options || {};
    const classStyle = logStyle(parentColor, backgroundColor);
    const methodStyle = logStyle(color, backgroundColor);
    const punctuationStyle = logStyle(punctuationColor, backgroundColor);

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

                if (styleOutput) {
                    console.log(`%c ${className + instanceRef}%c.%c${propertyName} `, classStyle, punctuationStyle, methodStyle, {result});
                } else {
                    console.log(`${className + instanceRef}.${propertyName} `, {result});
                }
                return result;
            }
        }
    }
}

interface LogGetterOptions {
    styleOutput?: boolean;      // If log should be colored.
    color?: string;             // Log color for function name
    parentColor?: string;       // Log color for the class/scope
    backgroundColor?: string;   // Log color for the background
    punctuationColor?: string;  // Log color for the punctuation
    argumentColor?: string;     // Log color for the arguments
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
        logArgsInline = true,
        logTarget = false,
        logResult = false,
        extras,
        group = true,
        collapsed = false,
        styleOutput = isPlatformWeb,
        color = defaultMethodColor,
        parentColor = defaultClassColor,
        backgroundColor = defaultBackgroundColor,
        punctuationColor = defaultPunctuationColor,
        argumentColor = defaultArgumentColor,
    } = options || {};

    const methodStyle = logStyle(color, backgroundColor);
    const classStyle = logStyle(parentColor, backgroundColor);
    const punctuationStyle = logStyle(punctuationColor, backgroundColor);
    const argumentStyle = logStyle(argumentColor, backgroundColor);

    const paramNames = getParamNames(func);

    return giveFunctionName(
        functionName+'_$LogWrapper',
        function (this: any, ...args: any[]) {
            const target = scope || this;
            const openStyles = [];

            // Group string: Start
            let prepend = '';
            if (styleOutput) {
                prepend = '%c ';
                openStyles.push(punctuationStyle);
            }

            // Group string: Class/Scope
            let targetString = target ? getType(target) + '{' + getLogRef(target) + '}' : '';
            if (targetString) {
                if (styleOutput) {
                    targetString = `%c${targetString}%c`;
                    openStyles.push(classStyle, punctuationStyle);
                }
                targetString += '.';
            }

            // Group string: Function name
            const functionString = styleOutput ? `%c${functionName}` : functionName;
            if (styleOutput) openStyles.push(methodStyle);

            // Group string: Arguments
            let argsString = logArgsInline ? inlineArgsForList(args, paramNames) : `${paramNames.slice(0, args.length)}`;
            if (styleOutput) {
                argsString = `%c(%c${argsString}%c)`;
                openStyles.push(punctuationStyle, argumentStyle, punctuationStyle);
            } else {
                argsString = '(' + argsString + ')';
            }

            // Group string: End
            const append = styleOutput ? ' ' : '';

            // Log: Group string
            const openStrings = prepend + targetString + functionString + argsString + append;
            if (!group)         console.log(openStrings, ...openStyles);
            else if (collapsed) console.groupCollapsed(openStrings, ...openStyles);
            else                console.group(openStrings, ...openStyles);

            // Log: Extras
            if (logArgs) {
                logInfo(
                    'Args',
                    mapToObject(
                        args,
                        (value, key, index) => ({
                            value,
                            key: paramNames[index],
                            skip: !paramNames[index],
                        })
                    ),
                    styleOutput
                );
            }
            if (logTarget) {
                logInfo('Target', this, styleOutput);
            }
            if (extras) {
                Object.keys(extras).forEach(extraKey => {
                    const extraCallback = extras[extraKey];
                    if (extraCallback) {
                        try {
                            logInfo(extraKey, extraCallback(target, args), styleOutput);
                        } catch (e) {
                            logInfo(extraKey, e, styleOutput);
                        }
                    }
                })
            }

            try {
                // Run, log & return result
                const result = func.apply(this, args); // Run original
                if (logResult) logInfo('Result', result, styleOutput);
                if (group) console.groupEnd(); // Close group
                return result;
            } catch (e) {
                console.error(e); // Log error
                if (group) console.groupEnd(); // Close group
                throw e; // Re-throw
            }
        } as Func // End of function
    );
}

export interface WrapAndLogFunctionOptions<Parent = any, Func extends GenericFunction = GenericFunction> {
    logArgs?: boolean;              // 'Args: [...]'
    logArgsInline?: boolean;        // 'MyClass.myMethod("my arg")'
    logTarget?: boolean;            // 'Target: MyClass {...}'
    logResult?: boolean;            // 'Result: undefined'
    extras?: LogExtraMap<Parent, Func>;   // Print out extra info, based on the key and output of the callback
    group?: boolean;                // If a log group should be created
    collapsed?: boolean;            // If the log group should be collapsed
    styleOutput?: boolean;          // If log should be colored.
    color?: string;                 // Log color for function name
    parentColor?: string;           // Log color for the class/scope
    backgroundColor?: string;       // Log color for the background
    punctuationColor?: string;      // Log color for the punctuation
    argumentColor?: string;         // Log color for the arguments
}
type LogExtraMap<Type = any, Func extends GenericFunction = GenericFunction> = Record<string, LogExtraCallback<Type, Func>>;
type LogExtraCallback<Type = any, Func extends GenericFunction = GenericFunction> = (instanceOrScope: Type, args: Parameters<Func>) => any;
type GenericFunction = (...args: any) => any;

/** Attach a name to a function */
function giveFunctionName<Type extends GenericFunction>(name: string, func: Type): Type {
    Object.defineProperty(func, 'name', {value: name, writable: false});
    return func;
}

function logInfo(label: string, data: any, styleOutput: boolean) {
    if (styleOutput) {
        console.info('%c ' + label + ': ', logStyle(defaultInfoColor), data);
    } else {
        console.info(label + ': ', data);
    }
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
        (arg, index) => paramNames[index] ? `${paramNames[index]}: ${arg}` : null
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
