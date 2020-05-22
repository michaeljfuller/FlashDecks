import React, {ReactElement} from "react";
import {CommonWrapper, mount, shallow, ShallowWrapper} from "enzyme";
import {View} from "react-native";
import {NavigationNavigator} from "react-navigation";
import {NavigatorBase, NavigatorBaseProps, NavigatorBaseState, setNavigator} from './NavigatorBase';
import {Navigation, NavigationStateRoute} from "../../misc/navigation/navigation_types";
import {configureEnzyme} from "../../../test/Enzyme";

configureEnzyme();

jest.mock('react-navigation');

describe('NavigatorBase', () => {
    //<editor-fold desc="Setup">

    const ROUTE_NAME = 'test-ROUTE_NAME', ROUTE_KEY = 'test-ROUTE_KEY';

    const ROUTES: NavigationStateRoute[] = [];
    while (ROUTES.length < 5) {
        const i = ROUTES.length + 1;
        ROUTES.push({ routeName: 'test-ROUTE_NAME-' + i, key: 'test-ROUTE_KEY-' + i });
    }

    const HIDDEN_ROUTES: NavigationStateRoute[] = [];
    while (HIDDEN_ROUTES.length < 3) {
        const i = HIDDEN_ROUTES.length + 1;
        const route = { routeName: 'test-HIDDEN_ROUTE_NAME-' + i, key: 'test-HIDDEN_ROUTE_KEY-' + i };
        ROUTES.push(route);
        HIDDEN_ROUTES.push(route);
    }

    const MockNavigator: NavigationNavigator<any,any> = (
        () => <View testID="MockNavigator" key="MockNavigator" />
    ) as any;

    @setNavigator(MockNavigator)
    class TestNavigatorBase extends NavigatorBase {
        state = {
            hiddenRouteKeys: HIDDEN_ROUTES.map(r => r.key)
        };
        render() {
            const NavigatorContents = this.navigator;
            return <View>
                <NavigatorContents navigation={this.props.navigation} />
            </View>
        }
    }

    function createNavigation(routes = ROUTES): Navigation {
        return {
            state: {
                routes, index: 0, params: {}
            },
            navigate: (()=>{}) as any
        };
    }

    type NavigatorBaseWrapper = ShallowWrapper<NavigatorBaseProps, NavigatorBaseState, TestNavigatorBase>;
    type TabNavigatorMountedWrapper = CommonWrapper<NavigatorBaseProps, NavigatorBaseState, TestNavigatorBase>;

    function setup(routes = ROUTES): NavigatorBaseWrapper {
        const navigation = createNavigation(routes);
        return shallow(<TestNavigatorBase navigation={navigation} foo={"bar"} />);
    }

    function setupMounted(routes = ROUTES): TabNavigatorMountedWrapper {
        return mount(<TestNavigatorBase navigation={createNavigation(routes)} foo={"bar"} />);
    }

    //</editor-fold>

    describe('Properties', () => {
        it('#visibleRoutes has all but the hidden routes', () => {
            const routes: NavigationStateRoute[] = [
                { key: 'key-1', routeName: 'name-1'},
                { key: 'key-2', routeName: 'name-2'},
                { key: 'key-3', routeName: 'name-3'},
            ];
            const wrapper = setup(routes).setState({
                hiddenRouteKeys: ['key-1']
            });
            expect(wrapper.instance().visibleRoutes).toEqual([
                { key: 'key-2', routeName: 'name-2'},
                { key: 'key-3', routeName: 'name-3'}
            ]);
        });
    })

    describe('#navigateTo()', () => {
        it('clears existing params', () => {
            const wrapper = setupMounted();
            const originalNavigation = wrapper.props().navigation;
            const navigationParams = { foo: 'bar' };
            originalNavigation.state.params = navigationParams;
            wrapper.setProps({ navigation: originalNavigation });
            expect(wrapper.props().navigation.state.params).toBe(navigationParams);
            wrapper.instance().navigateTo(ROUTE_NAME);
            expect(wrapper.props().navigation.state.params).toEqual({});
        });
        it('calls navigate', () => {
            const wrapper = setupMounted();
            const spy = spyOn(wrapper.props().navigation, 'navigate');

            wrapper.instance().navigateTo(ROUTE_KEY);
            expect(spy).toHaveBeenCalledWith(ROUTE_KEY);
        });
    });

    describe('#render()', () => {
        it('shows the contents', () => {
            const wrapper = setupMounted();
            const navigator = wrapper.instance().navigator;
            expect(navigator).toBeTruthy();

            const content = wrapper.find(navigator);
            expect(content).toHaveLength(1);
            expect(content.props().navigation).toBe(wrapper.props().navigation);
        });
    });

});
