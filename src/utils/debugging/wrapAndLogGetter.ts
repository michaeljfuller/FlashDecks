import {
    classColor,
    defaultBackgroundColor,
    defaultPunctuationColor,
    instanceColor,
    methodColor
} from "./debuggingOptions";
import {getLogRef} from "./logRef";
import {LogColor, Logger} from "../Logger";

type Getter<R = any, T = any> = (this: T) => R;

export interface LogGetterOptions {
    styleOutput?: boolean;          // If log should be colored.
    color?: LogColor;               // Log color for function name
    parentColor?: LogColor;         // Log color for the class/scope
    backgroundColor?: LogColor;     // Log color for the background
    punctuationColor?: LogColor;    // Log color for the punctuation
    argumentColor?: LogColor;       // Log color for the arguments
    group?: boolean;                // Log as a group.
}

export function wrapAndLogGetter(propertyName: string, func: Getter, options?: LogGetterOptions): Getter {
    const {
        styleOutput = true,
        backgroundColor = defaultBackgroundColor,
        punctuationColor = defaultPunctuationColor,
        group = true,
    } = options || {};

    return function (this: any) {
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
        logger.resetColors().add(' >>');

        try {
            if (group) {
                logger.group();
                const result = func.call(this)
                logger.color(instanceColor(id)).info('Result:', result);
                return result;
            } else {
                const result = func.call(this)
                logger.space.info(result);
                return result;
            }
        } catch (e) {
            logger.info().error(className+instanceRef+'.'+propertyName+'(get)', e);
            throw e;
        } finally {
            logger.groupEnd();
        }
    };
}
