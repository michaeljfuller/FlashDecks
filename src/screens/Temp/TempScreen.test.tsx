import React from "react";
import {configureEnzyme, shallow} from "../../../test/Enzyme";
import {findByTestId} from "../../../test/test-utils";
import {createMockNavigation} from "../../../test/mocks/MockNavigation";
import {withDefaults} from "../../utils/object";
import {TempScreen as TempScreenComponent, TempScreenProps, TestIds} from './TempScreen';
import {TempScreenStoreProps} from './TempScreen_redux';

configureEnzyme();

function setup(props: Partial<TempScreenProps & TempScreenStoreProps> = {}) {
    const defaultProps: TempScreenProps & TempScreenStoreProps = {
        navigation: createMockNavigation([{ key: 'rk1', routeName: 'rn1' }]),
        loggedInUser: { id: 'user-id', displayName: 'user-name' }
    };
    const wrapper = shallow(<TempScreenComponent {...withDefaults(props, defaultProps)} />);
    return { wrapper };
}

describe('TempScreen', () => {

    it ('prints the env name', () => {
        const text = findByTestId(setup().wrapper, TestIds.Env).props().children.join('');
        expect(text).toContain('Environment');
        expect(text).toContain('development');
    });

});
