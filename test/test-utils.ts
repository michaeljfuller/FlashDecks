import {ShallowWrapper} from "enzyme";
import {mapToObject} from "../src/utils/object";
import {getType, getTypeOrValue} from "../src/utils/type";

export function findByTestId(wrapper: ShallowWrapper, testId: string) {
    // return wrapper.findWhere((item) => {
    //     const props = item.props();
    //     console.log('findByTestId', item.html(), props, props && props.testID === testId);
    //     return props && props.testID === testId;
    // });
    return wrapper.find({ testID: testId });
}

/** Return the object with the values being replaced by their type. */
export function objectToTypeMap<
    Type extends Record<string, any>
>(object: Type): Record<keyof Type, ReturnType<typeof getType>> {
    return mapToObject(object, value => ({
        value: getType(value)
    }));
}

/**
 * Return the names of all the components that appear in the hierarchy, and how many times.
 * @example {
 *     Foo: 1,
 *     Bar: 5,
 *     Baz: 2
 * }
 */
export function countAllWrapperChildren(wrapper: ShallowWrapper): Record<string, number> {
    const result: Record<string, number> = {};
    wrapper.findWhere(child => {
        const key = child.name();
        result[key] = (result[key] || 0) + 1;
        return false;
    });
    return result;
}
/**
 * Return the names of immediate children, and how many times they appear.
 * @example {
 *     Foo: 1,
 *     Bar: 5,
 *     Baz: 2
 * }
 */
export function countWrapperChildren(wrapper: ShallowWrapper): Record<string, number> {
    const result: Record<string, number> = {};
    wrapper.forEach(child => {
        const key = child.name();
        result[key] = (result[key] || 0) + 1;
        return false;
    });
    return result;
}

/**
 * Return the hierarchy of the ShallowWrapper in a JSON string-able format.
 * @example {
 *     "<MyComponent>": [
 *         {
 *             "SubComponent": []
 *         }
 *     ]
 * }
 */
export function getWrapperHierarchy(
    wrapper: ShallowWrapper, maxValueLength = 16,
): object|string {
    const name = wrapper.name();
    const children = wrapper.children().map(
        child => getWrapperHierarchy(child, maxValueLength)
    ).filter(v => v);
    const props: string[] = Object.entries(wrapper.props()).filter(
        ([key, value]) => key !== 'children' && value !== undefined
    ).map(
        ([key, value]) => `${key}={${
            getTypeOrValue(value, maxValueLength)
        }}`
    );

    let label = '<' + name;
    if (props.length) label += ' ' + props.join(' ');
    label += '>';

    return children.length ? { [label]: children } : label;
}
export function getWrapperHierarchyJson(
    wrapper: ShallowWrapper, maxValueLength = 16,
): string {
    return JSON.stringify(
        getWrapperHierarchy(wrapper, maxValueLength), null, 4
    );
}
