import {LogColor, Logger} from "../Logger";
import {mapToObject} from "../object";
import {getType} from "../type";
import {
    defaultArgumentColor,
    defaultBackgroundColor,
    defaultInfoColor,
    defaultPunctuationColor,
    classColor,
    instanceColor,
    methodColor
} from "./debuggingOptions";
import {GenericFunction, getParamNames, giveFunctionName} from "../function";
import {getLogRef} from "./logRef";

//<editor-fold desc="Types">

export interface WrapAndLogFunctionOptions<Parent = any, Func extends GenericFunction = GenericFunction> {
    enabled?: boolean;
    ref?: RefCallback<Parent>;      // Callback to add identifiable reference to output (e.g. name/ID)
    logArgs?: boolean;              // 'Args: [...]'
    logTarget?: boolean;            // 'Target: MyClass {...}'
    logResult?: boolean;            // 'Result: undefined'
    before?: LogBeforeMap<Parent, Func>; // Print out extra info, based on the key and output of the callback
    after?: LogAfterMap<Parent, Func>;   // Print out extra info, based on the key and output of the callback
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

type RefCallback<T> = (scope: T) => string;
type LogBeforeMap<Type = any, Func extends GenericFunction = GenericFunction> = Record<string, LogBeforeCallback<Type, Func>>;
type LogAfterMap<Type = any, Func extends GenericFunction = GenericFunction> = Record<string, LogAfterCallback<Type, Func>>;
type LogBeforeCallback<Type = any, Func extends GenericFunction = GenericFunction> = (scope: Type, args: Parameters<Func>) => any;
type LogAfterCallback<Type = any, Func extends GenericFunction = GenericFunction> = (scope: Type, args: Parameters<Func>, result: ReturnType<Func>) => any;

//</editor-fold>

/** Common code between logMethod & logFunction. */
export function wrapAndLogFunction<Func extends GenericFunction = GenericFunction>(
    func: Func,
    scope: any,
    functionName: string,
    options?: WrapAndLogFunctionOptions,
): Func {
    const {
        enabled = true,
        ref,
        logArgs = false,
        logTarget = false,
        logResult = false,
        before,
        after,
        group = true,
        collapsed = false,
        styleOutput = true,
        color = methodColor(functionName),
        backgroundColor = defaultBackgroundColor,
        punctuationColor = defaultPunctuationColor,
        argumentColor = defaultArgumentColor,
        infoColor = defaultInfoColor,
    } = options || {};

    if (!enabled) return func;
    const paramNames = getParamNames(func);

    return giveFunctionName(
        functionName+'_$LogWrapper',
        function (this: any, ...args: any[]) {
            const target = scope || this;
            const {type, id} = getLogRef(target);
            const {
                parentColor = classColor(type),
            } = options || {};

            const logger = new Logger(styleOutput);
            logger.background(backgroundColor);

            //<editor-fold desc="Log first line">

            // Group string: Class/Scope + Function name
            const runLogTargetAndFunction = () => {
                if (target) {
                    logger.color(parentColor).add(type);
                    logger.color(instanceColor(id)).add('{' + id + '}');
                    if (ref) logger.color(instanceColor(id)).add('{' + ref(target) + '}');
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

            //</editor-fold>
            //<editor-fold desc="Log Extras & Target">

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

            //</editor-fold>
            //<editor-fold desc="Log Extras & Target">

            if (logTarget) {
                logger.color(infoColor).info('Target:', this);
            }

            //</editor-fold>
            //<editor-fold desc="LogBeforeCallbacks">

            if (before) {
                logger.color(infoColor).group('Before');
                Object.keys(before).forEach(key => {
                    const beforeCallback = before[key];
                    if (beforeCallback) {
                        try {
                            logger.color(infoColor).info(key+':', beforeCallback(target, args));
                        } catch (e) {
                            logger.color(infoColor).error(key+':', e);
                        }
                    }
                });
                logger.groupEnd();
            }

            //</editor-fold>

            try {
                //<editor-fold desc="Run, log & return result">

                const result = func.apply(this, args); // Run original
                if (logResult) {
                    runLogTargetAndFunction();
                    logger.color(infoColor).info(' Result:', result);
                }

                //</editor-fold>
                //<editor-fold desc="LogAfterCallbacks">

                if (after) {
                    logger.color(infoColor).group('After');
                    Object.keys(after).forEach(key => {
                        const afterCallback = after[key];
                        if (afterCallback) {
                            try {
                                logger.color(infoColor).info(key+':', afterCallback(target, args, result));
                            } catch (e) {
                                logger.color(infoColor).error(key+':', e);
                            }
                        }
                    });
                    logger.groupEnd();
                }

                //</editor-fold>

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
