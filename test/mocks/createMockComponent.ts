import React from "react";
import {capitalise, toKebabCase} from "../../src/utils/string";
import {mapToObject} from "../../src/utils/object";

/**
 * Create a mock component that has no implementation.
 * @param {string} name - Name of the component
 * @param {object} [options]
 * @param {string} [options.tag]       - DOM tag to give the component, otherwise kebab-case `name` is used.
 * @param {string} [options.tagPrefix] - Prefix to add to the tag.
 */
export function createMockComponent(name: string, options?: CreateMockComponentOptions) {
    options = options || {};
    let tag = capitalise(options.tag || toKebabCase(name));
    if (options.tagPrefix) tag = options.tagPrefix + '-' + tag;

    const component: React.FunctionComponent = function MockComponent(props: object) {
        props = mapToObject(
            props, (value, key) => ({
                value,
                key: key === "testID" ? "data-testid" : key, // Rename testID to data-testid
            })
        );
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
