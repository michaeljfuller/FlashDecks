import {isPlatformWeb} from '../platform';

// Log CSS styles
function logStyle(foreground: string, background='#555', lineHeight = '18px') {
    return `color: ${foreground}; background: ${background}; line-height: ${lineHeight}; `;
}
const punctuationStyle = logStyle('#DDD');
const classStyle = logStyle('#55FF55');
const methodStyle = logStyle('#55eeff');
const argumentStyle = logStyle('#ff9955');
const infoStyle = logStyle('#d6b3ff');
const groupStyles = [classStyle, punctuationStyle, methodStyle];

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
export function logMethod(options?: WrapAndLogFunctionOptions) {
    return function (
        target: any,
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
export function logFunction<Func extends Function, Scope extends object>(
    func: Func,
    label = func.name || 'Anonymous',
    scope?: Scope,
    options?: WrapAndLogFunctionOptions
): Func {
    return wrapAndLogFunction(func, scope, label, options) as any;
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
export function logGetter() {
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

                if (isPlatformWeb) {
                    console.log(`%c ${className + instanceRef}%c.%c${propertyName} `, ...groupStyles, {result});
                } else {
                    console.log(`${className + instanceRef}.${propertyName} `, {result});
                }
                return result;
            }
        }
    }
}

/** Common code between logMethod & logFunction. */
function wrapAndLogFunction(
    func: Function,
    scope: any,
    functionName: string,
    options?: WrapAndLogFunctionOptions,
) {
    const {
        logArgs = false,
        logArgsInline = true,
        logTarget = false,
        logResult = false,
        group = true,
        collapsed = false,
        styleOutput = isPlatformWeb,
    } = options || {};
    return giveFunctionName(
        functionName+'_$LogWrapper',
        function (this: any, ...args: any[]) {
            const target = scope || this;
            const openStyles = [];

            let prepend = '';
            if (styleOutput) {
                prepend = '%c ';
                openStyles.push(punctuationStyle);
            }

            let targetString = target ? getType(target) + '{' + getLogRef(target) + '}' : '';
            if (targetString) {
                if (styleOutput) {
                    targetString = `%c${targetString}%c`;
                    openStyles.push(classStyle, punctuationStyle);
                }
                targetString += '.';
            }

            const functionString = styleOutput ? `%c${functionName}` : functionName;
            if (styleOutput) openStyles.push(methodStyle);

            let argsString = logArgsInline ? inlineArgsForList(args) : `Arguments: ${args.length}`;
            if (styleOutput) {
                argsString = `%c(%c${argsString}%c)`;
                openStyles.push(punctuationStyle, argumentStyle, punctuationStyle);
            }

            const append = styleOutput ? ' ' : '';

            // Open log
            const openStrings = prepend + targetString + functionString + argsString + append;
            if (!group)         console.log(openStrings, ...openStyles);
            else if (collapsed) console.groupCollapsed(openStrings, ...openStyles);
            else                console.group(openStrings, ...openStyles);

            // Log objects
            if (logArgs) logInfo('Args', args, styleOutput);
            if (logTarget) logInfo('Target', this, styleOutput);

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
        } // End of function
    );
}

export interface WrapAndLogFunctionOptions {
    logArgs?: boolean;          // 'Args: [...]'
    logArgsInline?: boolean;    // 'MyClass.myMethod("my arg")'
    logTarget?: boolean;        // 'Target: MyClass {...}'
    logResult?: boolean;        // 'Result: undefined'
    group?: boolean;            // If a log group should be created
    collapsed?: boolean;        // If the log group should be collapsed
    styleOutput?: boolean;      // If log should be colored.
}

/** Attach a name to a function */
function giveFunctionName<Type extends Function>(name: string, func: Type): Type {
    Object.defineProperty(func, 'name', {value: name, writable: false});
    return func;
}

function logInfo(label: string, data: any, styleOutput: boolean) {
    if (styleOutput) {
        console.info('%c ' + label + ': ', infoStyle, data);
    } else {
        console.info(label + ': ', data);
    }
}

/** Inline argument list (e.g. '1, true, "one", null, <MyClass> */
function inlineArgsForList(args: any[], maxStringLength = 50, multilineLengthThreshold = 50) {
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
    });

    // Join together
    const joinedArgs = formattedArgs.join(', ');
    if (joinedArgs.length <= multilineLengthThreshold) return joinedArgs;

    // If too long for single line, make multiline
    return ' \n\t' + formattedArgs.join('\n, \n') + ' \n ';
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
