export interface RepeatCallback<Type> {
    (index: number, array: Type[], size: number): Type;
}
export function repeat<Type>(
    size: number,
    callback: RepeatCallback<Type>
): Type[] {
    const result: Type[] = [];
    for (let i=0; i < size; i++) {
        result.push(callback(i, result, size));
    }
    return result;
}

/** Return a new array with an item at the given index, moving the previous occupant to the right. */
export function insertItem<Type>(array: readonly Type[], index: number, item: Type): Type[] {
    if (index < 0) index = array.length + index; // -1 = Last index in passed array
    return [
        ...array.slice(0, index),
        item,
        ...array.slice(index)
    ];
}

export function replaceItem<Type>(array: readonly Type[], index: number, item: Type): Type[] {
    if (index < 0) index = array.length + index; // -1 = Last index in passed array
    return [
        ...array.slice(0, index),
        item,
        ...array.slice(index+1),
    ];
}

export function removeItem<Type>(array: readonly Type[], index: number): Type[] {
    if (index < 0) index = array.length + index; // -1 = Last index in passed array
    return [
        ...array.slice(0, index),
        ...array.slice(index+1),
    ];
}
