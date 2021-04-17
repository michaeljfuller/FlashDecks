import {getType} from "../type";

interface LogRef {
    type: string;
    id: number;
}
export const LogRefKey = Symbol('Debugging log ref');
const lastRefMap: Record<string, number> = {};

/**
 * Attach a unique ID to an object to print when debugging.
 * ID is unique for an object of each type.
 */
export function getLogRef(instance: any): LogRef {
    if (instance[LogRefKey]) return instance[LogRefKey];
    const type = getType(instance);
    const id = lastRefMap[type] = (lastRefMap[type] || 0) + 1;
    return instance[LogRefKey] = { type, id };
}
