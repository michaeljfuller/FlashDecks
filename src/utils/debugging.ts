import {Logger} from "./Logger"
import logger from "./Logger"

export {Logger, logger};
export {compare, readableCompare} from "./debugging/compare";

export * from "./debugging/decorators/logClass";
export * from "./debugging/decorators/logComponent";

export * from "./debugging/decorators/logFunction";
export * from "./debugging/decorators/logMethod";

export * from "./debugging/decorators/logGetter";
export * from "./debugging/decorators/logSetter";
