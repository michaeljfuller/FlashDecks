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
 *  myInstance.myMethod("my arg")   // > MyClass.myMethod("my arg")
 *                                  //   > MyClass.mySubMethod("my arg", "!")
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
        } = options || {};
        const className = getType(target);

        const method = descriptor.value;
        const logMethod = group ? console.group.bind(console) : console.log.bind(console);

        descriptor.value = function (...args: any[]) {
            try {
                // Open group
                if (logArgsInline) {
                    logMethod(
                        `%c ${className}%c.%c${functionName}%c(%c${inlineArgsForList(args)}%c) `,
                        ...groupStyles,
                        ...argStyles
                    );
                } else {
                    logMethod(
                        `%c ${className}%c.%c${functionName} `,
                        ...groupStyles
                    );
                }

                // Log objects
                if (logArgs) console.info('%c Args: ', infoStyle, args);
                if (logTarget) console.info('%c Target: ', infoStyle, target);

                // Run, log & return result
                const result = method.apply(this, args); // Run original
                if (logResult) console.info('%c Result: ', infoStyle, result);
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
