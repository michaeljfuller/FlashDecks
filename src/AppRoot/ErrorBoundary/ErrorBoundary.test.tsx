import React from 'react';
import {Text} from 'react-native';
import ErrorBoundary from "./ErrorBoundary";
import {mount} from "enzyme";
import {configureEnzyme} from "../../../test/Enzyme";

configureEnzyme();

interface TestContentsProps {
    error?: Error;
}
const TestContents = (props: TestContentsProps) => {
    if (props.error) throw props.error;
    return <Text>TestContents</Text>;
};

describe('ErrorBoundary', () => {
    beforeEach(() => {
        spyOn(console, 'error'); // Prevent logs cluttering test report
    });

    it('displays children if no error', () => {
        const wrapper = mount(<ErrorBoundary><TestContents /></ErrorBoundary>);
        expect(wrapper.find(TestContents)).toHaveLength(1);
    });

    it('displays error if encountered', () => {
        const error = new Error('Test ErrorBoundary Error');
        const wrapper = mount(<ErrorBoundary><TestContents error={error} /></ErrorBoundary>);
        expect(wrapper.find(TestContents)).toHaveLength(0);
        expect(wrapper.contains(error.message)).toBeTruthy();
    });

    it('has a default error message', () => {
        const error = new Error('');
        const wrapper = mount(<ErrorBoundary><TestContents error={error} /></ErrorBoundary>);
        expect(wrapper.find(TestContents)).toHaveLength(0);
        expect(wrapper.contains(ErrorBoundary.defaultMessage)).toBeTruthy();
    });

});
