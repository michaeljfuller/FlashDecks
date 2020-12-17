import {Logger} from "./Logger"
import logger from "./Logger"

export {Logger, logger};
export {compare, readableCompare} from "./debugging/compare";

export {logClass, LogClassOptions} from "./debugging/decorators/logClass";
export {logComponent, LogComponentOptions} from "./debugging/decorators/logComponent";

export {logFunction, LogFunctionOptions} from "./debugging/decorators/logFunction";
export {logMethod, LogMethodOptions} from "./debugging/decorators/logMethod";

export {logGetter, LogGetterOptions} from "./debugging/decorators/logGetter";
export {logSetter, LogSetterOptions} from "./debugging/decorators/logSetter";
