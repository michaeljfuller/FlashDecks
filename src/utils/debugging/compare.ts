import {isObject, mapToObject} from "../object";
import {removeFirst} from "../array";
import {capitalise} from "../string";

export interface ObjectComparison {
    same: boolean;
    message: string;
    differences?: ObjectDifferences;
}
export interface DifferenceExplanation {
    message: string;
    values: Record<string, any>;
}
export type ObjectDifferenceValue = ObjectDifferences|DifferenceExplanation|string;
export interface ObjectDifferences {
    [key: string]: ObjectDifferenceValue;
}

/**
 * Compare two objects and return an explanation of their differences.
 */
export function compare<Type extends Record<any, any>>(first: Type, second: Type, firstName = 'first', secondName = 'second'): ObjectComparison {
    // Simple equality comparison
    if (!first || !second) {
        if (first === null && second === null) return { same: true, message: 'Both are null.' };
        if (first === undefined && second === undefined) return { same: true, message: 'Both are undefined.' };
        if (first === null && second === undefined) return { same: false, message: `${capitalise(firstName)} is null, ${secondName} is undefined.` };
        if (first === undefined && second === null) return { same: false, message: `${capitalise(firstName)} is undefined, ${secondName} is null.` };
        if (first === null) return { same: false, message: `${capitalise(firstName)} is null.` };
        if (first === undefined) return { same: false, message: `${capitalise(firstName)} is undefined.` };
        if (second === null) return { same: false, message: `${capitalise(secondName)} is null.` };
        if (second === undefined) return { same: false, message: `${capitalise(secondName)} is undefined.` };
    }
    if (first === second) return { same: true, message: 'Same object.' };

    // Deep comparison
    let same = true;
    let missingKeys = Object.keys(second); // Log keys on second, removing them while progressing through first, leaving extras.
    const diff: ObjectDifferences = mapToObject<object, ObjectDifferenceValue, string>(
        first,
        (firstValue: any, key: string) => {
            const secondValue = second[key]; // Get value of property on second.
            missingKeys = removeFirst(missingKeys, key); // Remove common property.

            if (firstValue === secondValue) return { skip: true }; // Skip equal

            // Compare objects
            const firstIsObject = isObject(first, true, true);
            const secondIsObject = isObject(secondValue, true, true);
            if (!firstIsObject || !secondIsObject) {
                same = false;
                return {
                    value: {
                        message: 'Different values.',
                        values: { [firstName]: firstValue, [secondName]: secondValue }
                    }
                };
            }
            const comparison = compare(firstValue, secondValue); // Compare values.
            if (!comparison.same) same = false; // Flag final result as different.

            return {
                skip: comparison.same,
                value: comparison.differences || comparison.message,
            };
        }
    );
    missingKeys.forEach(key => diff[key] = { message: `${capitalise(firstName)} is undefined.` });

    // Result
    const result: ObjectComparison = {
        same,
        message: same ? 'Identical objects.' : 'Different objects.',
    };
    if (!same) result.differences = diff;
    return result;
}

/**
 * Compare two objects and return an explanation of their differences, in a more human-friendly format.
 */
export function readableCompare<Type extends Record<any, any>>(first: Type, second: Type, firstName = 'first', secondName = 'second') {
    return flattenComparison(
        compare(first, second, firstName, secondName)
    );
}
function flattenComparison(comparison: ObjectComparison) {
    if (!comparison.differences) return comparison.message;

    return mapToObject(comparison.differences, (diff: ObjectDifferenceValue) => {
        if (typeof diff === "string") return { value: diff };
        return { value: diff.values || diff.message };
    });
}
