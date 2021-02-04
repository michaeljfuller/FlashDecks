import React from "react";
import {GestureResponderEvent, TouchableWithoutFeedback, View} from "react-native";
import {ComponentProps, ComponentUnion} from "../component";

/** Stops touch events propagating up from the component. */
export function stopTouchPropagation<
    Component extends ComponentUnion,
    Properties = ComponentProps<Component>
>(
    component: Component,
    options?: StopTouchPropagationProps,
    displayName?: string
): Component {
    const WrappedComponent = component as ComponentUnion<Properties>;
    const Wrapper = (props: any) => <StopTouchPropagation {...(options||{})}>
        <WrappedComponent {...(props||{})} />
    </StopTouchPropagation>;
    Wrapper.displayName = displayName || `stopTouchPropagation(${WrappedComponent.displayName})`;
    return Wrapper as Component;
}
export default stopTouchPropagation;

/** A component that stops touch events from propagating upwards. */
export function StopTouchPropagation(props: React.PropsWithChildren<StopTouchPropagationProps>) {
    const onBlockedEvent = React.useCallback((event: GestureResponderEvent) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);
    return <TouchableWithoutFeedback
        onPress={props.allowPress ? undefined : onBlockedEvent}
        onPressIn={props.allowPressIn ? undefined : onBlockedEvent}
        onPressOut={props.allowPressOut ? undefined : onBlockedEvent}
        onLongPress={props.allowLongPress ? undefined : onBlockedEvent}
    >
        <View>{props.children}</View>
    </TouchableWithoutFeedback>
}
export interface StopTouchPropagationProps {
    allowPress?: boolean;
    allowPressIn?: boolean;
    allowPressOut?: boolean;
    allowLongPress?: boolean;
}
