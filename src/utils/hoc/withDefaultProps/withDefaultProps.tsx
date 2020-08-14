import React from "react";
import {withDefaults} from "../../object";

/**
 * Create a component that wraps another. The wrapper will forward on props, while providing defaults.
 * @example const MyThing = withDefaultProps(Something, { foo: 'bar' }, null, 'MyThing');
 */
export function withDefaultProps(
    WrappedComponent: any,
    defaultProps: any,
    overrideProps: any = {},
    displayName?: string
) {
    const Wrapper = (props: any) => <WrappedComponent {...withDefaults(props, defaultProps, overrideProps)} />;
    Wrapper.displayName = displayName || `withDefaultProps(${WrappedComponent.displayName})`;
    return Wrapper;
}
export default withDefaultProps;
