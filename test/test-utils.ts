import {ShallowWrapper} from "enzyme";

export function findByTestId(wrapper: ShallowWrapper, testId: string) {
    // return wrapper.findWhere((item) => {
    //     const props = item.props();
    //     console.log('findByTestId', item.html(), props, props && props.testID === testId);
    //     return props && props.testID === testId;
    // });
    return wrapper.find({ testID: testId });
}
