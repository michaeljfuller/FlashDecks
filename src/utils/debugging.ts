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
const argStyles = [punctuationStyle, argumentStyle, punctuationStyle];

export interface LogMethodOptions {
    logArgs?: boolean;          // 'Args: [...]'
    logArgsInline?: boolean;    // 'MyClass.myMethod("my arg")'
    logTarget?: boolean;        // 'Target: MyClass {...}'
    logResult?: boolean;        // 'Result: undefined'
    group?: boolean;            // If a log group should be created
    styleOutput?: boolean;      // If log should be colored.
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
 *                                  // > Result: "my arg!"
 */
export function logMethod(options?: LogMethodOptions) {
    return function (
        target: any,
        functionName: string,
        descriptor: PropertyDescriptor
    ) {
        const {
            logArgs = false,
            logArgsInline = true,
            logTarget = false,
            logResult = false,
            group = true,
            styleOutput = isPlatformWeb,
        } = options || {};
        const className = getType(target);

        const method = descriptor.value;
        const logMethod = group ? console.group.bind(console) : console.log.bind(console);

        descriptor.value = function (this: any, ...args: any[]) {
            try {
                const instanceRef = '{' + getLogRef(this) + '}';

                // Open group
                if (logArgsInline) {
                    if (styleOutput) {
                        logMethod(`%c ${className + instanceRef}%c.%c${functionName}%c(%c${inlineArgsForList(args)}%c) `, ...groupStyles, ...argStyles);
                    } else {
                        logMethod(`${className + instanceRef}.${functionName}(${inlineArgsForList(args)})`);
                    }
                } else {
                    if (styleOutput) {
                        logMethod(`%c ${className + instanceRef}%c.%c${functionName}%c(%cArguments: ${args.length}%c)`, ...groupStyles, ...argStyles);
                    } else {
                        logMethod(`${className + instanceRef}.${functionName}(Arguments: ${args.length})`);
                    }
                }

                // Log objects
                if (logArgs) logInfo('Args', args, styleOutput);
                if (logTarget) logInfo('Target', target, styleOutput);

                // Run, log & return result
                const result = method.apply(this, args); // Run original
                if (logResult) logInfo('Result', result, styleOutput);
                if (group) console.groupEnd(); // Close group
                return result;

            } catch(e) {
                console.error(e); // Log error
                if (group) console.groupEnd(); // Close group
                throw e; // Re-throw
            }
        };
    };
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

type StandardType = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
export function getType(target: any): StandardType | "null" | string {
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
