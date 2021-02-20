import {ShallowWrapper} from "enzyme";
import {mapToObject} from "../src/utils/object";
import {getType, PickKeysWithType} from "../src/utils/type";
import {GenericClass} from "../src/utils/class";
import {GenericFunction} from "../src/utils/function";

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

/** Function that creates a mock. */
type MockedFunctionFactory<
    Method extends GenericFunction
> = (...args: any) => jest.MockedFunction<Method>;

/**
 * Create a map of functions that create a mock for the specified ClassTarget + MethodKey.
 * @example createMockMap(MyClass, "myMethod", {
 *     success: () => jest.fn(() => true),
 *     failure: (error: string) => jest.fn(() => throw new Error(error)),
 * });
 */
export function createMockMethodMap<
    ClassTarget extends GenericClass,
    MethodKey extends PickKeysWithType<InstanceType<ClassTarget>, (...args: any) => any>,
    Method extends InstanceType<ClassTarget>[MethodKey],
    Returns extends ReturnType<Method>,
    Mock extends MockedFunctionFactory<Method>,
    Mocks extends Record<string, Mock>,
>(target: ClassTarget, key: MethodKey, mocks: Mocks): Mocks {
    // Wrap mock factories to add to result.
    for (const key in mocks) {
        if (Object.prototype.hasOwnProperty.call(mocks, key)) {
            const original: Mock = mocks[key];
            mocks[key] = ((...args: any[]) => {
                return original(...args).mockName(key);
            }) as any;
        }
    }
    return mocks;
}
