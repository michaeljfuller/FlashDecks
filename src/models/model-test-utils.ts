export {repeat} from '../utils/array';

export function assertNewInstance<Model extends Record<string, any>>(
    original: Model,
    updated: Model,
    label = 'creates a new instance'
) {
    it (label, () => {
        expect(updated).toBeInstanceOf(Object.getPrototypeOf(original).constructor);
        expect(updated).not.toBe(original);
    });
}

export function assertProperties<Model extends Record<string, any>>(
    model: Model,
    properties: Partial<Model>,
    prependLabel = 'updates value of'
) {
    Object.keys(properties).forEach(key => {
        it(prependLabel + ' #' + key, () => {
            expect(model[key]).toEqual(properties[key]);
        });
    });
}
