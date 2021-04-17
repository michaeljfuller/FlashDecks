import React from "react";
import {withDefaults} from "../../object";
import {ComponentUnion, ComponentProps} from "../../component";

/**
 * Create a component that wraps another. The wrapper will forward on props, while providing defaults.
 * @example const MyThing = withDefaultProps(Something, { foo: 'bar' }, null, 'MyThing');
 */
export function withDefaultProps<
    Component extends ComponentUnion,
    Properties = ComponentProps<Component>
>(
    component: Component,
    defaultProps?: Properties|null,
    overrideProps?: Partial<Properties>|null,
    displayName?: string
): Component {
    const WrappedComponent = component as ComponentUnion<Properties>;
    const Wrapper = (props: any) => <WrappedComponent {...withDefaults<Properties>(props, defaultProps, overrideProps)} />;
    Wrapper.displayName = displayName || `withDefaultProps(${WrappedComponent.displayName})`;
    return Wrapper as Component;
}
export default withDefaultProps;
