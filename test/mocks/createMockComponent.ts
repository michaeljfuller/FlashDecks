/* eslint react/prop-types: 0 */

import React from "react";
import {capitalise, toKebabCase} from "../../src/utils/string";
import {mapToObject} from "../../src/utils/object";

// Map component properties to event names
const eventMap = {
    "onPress": "click",
} as Record<string, keyof HTMLElementEventMap>;
type EventListenerKey = keyof typeof eventMap;

/**
 * Create a mock component that has no implementation.
 * @param {string} name - Name of the component
 * @param {object} [options]
 * @param {string} [options.tag]       - DOM tag to give the component, otherwise kebab-case `name` is used.
 * @param {string} [options.tagPrefix] - Prefix to add to the tag.
 */
export function createMockComponent(name: string, options?: CreateMockComponentOptions) {
    options = options || {};

    // Create DOM tag
    let tag = capitalise(options.tag || toKebabCase(name));
    if (options.tagPrefix) tag = options.tagPrefix + '-' + tag;

    // Create component
    const component: React.FunctionComponent = function MockComponent(props: any) {
        // Add DOM ref for events
        const ref = React.useRef<HTMLElement>(null);
        props = Object.assign({} , props, {ref});

        // Modify properties
        props = mapToObject(
            props, (value, key) => ({
                value,
                key: key === "testID" ? "data-testid" : key, // Rename testID to data-testid
            })
        );

        // Add events
        const listeners = extractListeners(props);
        React.useEffect(function update() {
            const listenerKeys = Object.keys(listeners) as EventListenerKey[];
            listenerKeys.forEach((key) => {
                ref.current?.addEventListener(eventMap[key], listeners[key]);
            });
            return function clearUpdate() {
                listenerKeys.forEach((key) => {
                    ref.current?.removeEventListener(eventMap[key], listeners[key]);
                });
            }
        }, Object.values(listeners));

        // Render <My-Tag myProp={props.myProp} />
        return React.createElement(tag, props);
    };

    component.displayName = name;
    return component;
}
export default createMockComponent;

export interface CreateMockComponentOptions {
    tag?: string;
    tagPrefix?: string;
}

/** Extract event listeners from component properties object, based on `eventMap`. */
function extractListeners<Props extends Record<EventListenerKey, Function>>(props: Props) {
    const result = {} as Props;
    if (!props.disabled) {
        const listenerNames = Object.keys(eventMap);
        for (const key in props) {
            if (props[key] && listenerNames.includes(key)) result[key] = props[key];
        }
    }
    return result;
}
