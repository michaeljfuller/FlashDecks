export function repeat<T>(size: number, callback: (index: number, array: T[]) => T): T[] {
    const result: T[] = [];
    for (let i=0; i < size; i++) result.push(callback(i, result));
    return result;
}
