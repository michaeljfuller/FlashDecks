import {ShallowWrapper} from "enzyme";
import {mapToObject} from "../src/utils/object";
import {getType} from "../src/utils/type";

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
