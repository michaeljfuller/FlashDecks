import React from "react";
import {withDefaults} from "../../object";

/**
 * Create a component that wraps another. The wrapper will forward on props, while providing defaults.
 */
export function withDefaultProps(WrappedComponent: any, defaultProps: any, overrideProps: any = {}) {
    const Wrapper = (props: any) => <WrappedComponent {...withDefaults(props, defaultProps, overrideProps)} />;
    Wrapper.displayName = `withDefaultProps(${WrappedComponent.displayName})`;
    return Wrapper;
}
export default withDefaultProps;
