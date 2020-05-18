import React from "react";
import {configureEnzyme, shallow} from "../../test/Enzyme";
import {AppRoot} from './AppRoot';

configureEnzyme();

describe('AppRoot', () => {
    it('exists', () => {
        const wrapper = shallow(<AppRoot />);
        expect(wrapper).toHaveLength(1);
    });
});
