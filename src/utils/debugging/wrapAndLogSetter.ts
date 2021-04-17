import {
    classColor, defaultArgumentColor,
    defaultBackgroundColor,
    defaultPunctuationColor,
    instanceColor,
    methodColor
} from "./debuggingOptions";
import {getLogRef} from "./logRef";
import {LogColor, Logger} from "../Logger";
import {getType} from "../type";

type Setter<V = any, T = any> = (this: T, value: V) => void;

export interface LogSetterOptions {
    styleOutput?: boolean;          // If log should be colored.
    color?: LogColor;               // Log color for function name
    parentColor?: LogColor;         // Log color for the class/scope
    backgroundColor?: LogColor;     // Log color for the background
    punctuationColor?: LogColor;    // Log color for the punctuation
    argumentColor?: LogColor;       // Log color for the arguments
    logResult?: boolean;            // Log the value of the result
    group?: boolean;                // Log as a group.
}

export function wrapAndLogSetter(propertyName: string, func: Setter, options?: LogSetterOptions): Setter {
    const {
        styleOutput = true,
        backgroundColor = defaultBackgroundColor,
        punctuationColor = defaultPunctuationColor,
        logResult = true,
        group = true,
    } = options || {};

    return function (this: any, value: any) {
        const {type: className, id} = getLogRef(this);
        const {
            color = methodColor(propertyName),
            parentColor = classColor(className),
        } = options || {};

        const instanceRef = '{' + id + '}';

        const logger = new Logger(styleOutput);
        logger.background(backgroundColor);
        logger.color(parentColor).add(className);
        logger.color(instanceColor(id)).add(instanceRef);
        logger.color(punctuationColor).add('.');
        logger.color(color).add(propertyName);
        logger.resetColors().add(' << ');
        if (logResult) {
            group ? logger.group(value) : logger.info(value);
        } else {
            logger.color(defaultArgumentColor);
            group ? logger.group(`<${getType(value)}>`) : logger.info(`<${getType(value)}>`);
        }

        try {
            func.call(this, value);
        } catch (e) {
            logger.error(className+instanceRef+'.'+propertyName+'(set)', e);
            throw e;
        } finally {
            if (group) logger.groupEnd();
        }
    };
}
