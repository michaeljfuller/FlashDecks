/** Create a unique ID against a name. */
export function instanceId(name: string): string {
    if (!idMap[name]) {
        idMap[name] = 1;
    }
    return name + '#' + idMap[name]++;
}
const idMap: Record<string, number> = {};
