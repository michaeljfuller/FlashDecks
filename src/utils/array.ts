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

export function removeFirst<Type>(array: readonly Type[], value: any): Type[] {
    const index = array.indexOf(value);
    if (index < 0) return [...array];
    return removeItem(array, index);
}

/** Filter for items that match all the filter values. */
export function simpleFilter<
    Item,
    Filter extends Partial<Item>
>(
    items: Item[],
    filter?: Filter
): Item[] {
    if (filter) {
        const filterKeys = Object.keys(filter) as Array<keyof Filter>;
        if (filterKeys.length) {
            return items.filter((item: any) => {
                return filterKeys.reduce<boolean>( // Reduce down matching values for each key. Result is false if any are negative.
                    (result, key) => result && item[key] === filter[key],
                    true,
                );
            });
        }
    }
    return items;
}

/** Filter out values that are null|undefined. */
export function filterExists<T>(array?: T[]|null): NonNullable<T>[] {
    if (array) {
        return array.filter(value => value !== null && value !== undefined) as NonNullable<T>[];
    }
    return [];
}

/** Return a copy of the array, with the passed item between each element. */
export function interlace<T, I>(array: T[], item: I): Array<T|I> {
    return array.reduce(
        (result, current) => {
            result.length ? result.push(item, current) : result.push(current);
            return result;
        }, [] as Array<T|I>
    );
}
