import React, {Attributes, ComponentClass, FunctionComponent, PropsWithChildren} from "react";
import {combineReducers, createStore, PreloadedState} from "redux";
import {Provider} from "react-redux";
import {render} from "@testing-library/react";
import {addPropertiesToFunction} from "../../src/utils/function";
import {ComponentProps, ComponentUnion} from "../../src/utils/component";
import {reducerMap, StoreState} from "../../src/store/store_manifest";
import {AppStore} from "../../src/store/store";

export const createRenderComponent = addPropertiesToFunction(
    _createRenderComponent,
    {
        withRedux: _createRenderReduxComponent,
    }
);

type RenderOptions = Parameters<typeof render>[1];

/** Create a function that renders a component using testing-library, while defining default properties. */
function _createRenderComponent<
    P extends {}
>(
    component: FunctionComponent<P> | ComponentClass<P>,
    defaultProps: P,
    defaultOptions?: RenderOptions,
) {
    return (
        props?: Partial<P>,
        options?: RenderOptions
    ) => {
        options = Object.assign({}, defaultOptions, options);
        const element = React.createElement(component, Object.assign({}, defaultProps, props));
        return render(element, options);
    }
}

/** Create a function that renders a component using testing-library, while defining default properties & store. */
function _createRenderReduxComponent<
    Component extends ComponentUnion,
    Props = ComponentProps<Component>,
>(
    component: Component,
    defaultProps?: Props,
    defaultStoreState?: Partial<PreloadedState<StoreState>>,
    defaultOptions?: RenderOptions,
) {
    const rootReducer = combineReducers(reducerMap);
    return (
        props?: Partial<Props>,
        storeState?: Partial<PreloadedState<StoreState>>,
        options?: RenderOptions,
    ) => {
        const store: AppStore = createStore(rootReducer, storeState || defaultStoreState);
        props = Object.assign({}, defaultProps, props);
        options = Object.assign({}, defaultOptions, {
            wrapper: function StoreWrapper(props: PropsWithChildren<any>) {
                return <Provider store={store}>{props.children}</Provider>;
            },
        }, options);
        const element = React.createElement(component, props);
        return {store, ...render(element, options)};
    };
}
